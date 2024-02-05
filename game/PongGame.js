class PongGame {
  constructor() {
    this.gameState = 'ready';
    this.board = document.querySelector('.board');
    this.message = document.querySelector('.message');
    this.boardCoord = this.board.getBoundingClientRect();
    this.mode = 'speed';
    this.numObstacle = 15;
    this.obstacles = [];
    this.initPlayers();
    this.initBall();
    this.initEventListeners();
    this.initGameState();
    this.scoreToWin = 5;
  }

  initPlayers() {
    const paddle1 = document.querySelector('.paddle_1');
    const score1 = document.querySelector('.player_1_score');
    const paddle2 = document.querySelector('.paddle_2');
    const score2 = document.querySelector('.player_2_score');
    this.player1 = new Player(paddle1, score1, 'Player1');
    this.player2 = new Player(paddle2, score2, 'Player2');
  }

  initBall() {
    const initialBall = document.querySelector('.ball');
    const initialBallCoord = initialBall.getBoundingClientRect();
    const ballSpeed = this.mode === 'normal' ? 10 : 20;
    this.ball = new Ball(initialBall, initialBallCoord, ballSpeed);
  }

  initEventListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'w':
          this.player1.isMovingUp = true;
          break;
        case 's':
          this.player1.isMovingDown = true;
          break;
        case 'ArrowUp':
          this.player2.isMovingUp = true;
          break;
        case 'ArrowDown':
          this.player2.isMovingDown = true;
          break;
        case 'Enter':
          if (this.gameState === 'ready') this.gameStart();
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'w':
          this.player1.isMovingUp = false;
          break;
        case 's':
          this.player1.isMovingDown = false;
          break;
        case 'ArrowUp':
          this.player2.isMovingUp = false;
          break;
        case 'ArrowDown':
          this.player2.isMovingDown = false;
          break;
      }
    });
  }

  initGameState() {
    this.gameState = 'ready';
    this.message.innerHTML = 'Press Enter to Play Pong';
    this.message.style.left = '38vw';
  }

  gameStart() {
    this.gameState = 'play';
    this.message.innerHTML = 'Game Started';
    this.message.style.left = '42vw';
    this.obstacles.forEach(obstacle => obstacle.remove());
    this.obstacles = [];
    for (let i = 0; i < this.numObstacle; i++) {
      this.createObstacle();
    }
    this.movePaddles();
    this.moveBall();
  }

  createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    this.board.appendChild(obstacle);
    obstacle.style.top = Math.random() * (this.board.clientHeight - 20) + 'px';
    obstacle.style.left = Math.random() * (this.board.clientWidth - 20) + 'px';
    this.obstacles.push(obstacle);
  }

  movePaddles() {
    if (this.player1.isMovingUp) this.player1.moveUp(this.boardCoord);
    if (this.player1.isMovingDown) this.player1.moveDown(this.boardCoord);
    if (this.player2.isMovingUp) this.player2.moveUp(this.boardCoord);
    if (this.player2.isMovingDown) this.player2.moveDown(this.boardCoord);
    if (this.gameState === 'play') requestAnimationFrame(this.movePaddles.bind(this));
  }

  moveBall() {
    let dy = 0;
    let dx = this.getRandomDirection() * this.ball.speed;
    this.ball.move(dy, dx, this);
  }

  getRandomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  endGame(winner) {
    this.gameState = 'over';
    this.message.innerHTML = `${winner} Wins! Press Enter to Play Again`;
    this.message.style.left = '30vw';
    // 승자의 점수를 업데이트하고, 게임을 재시작할 준비를 합니다.
    if (winner === 'Player1') {
      this.player1.score++;
    } else if (winner === 'Player2') {
      this.player2.score++;
    }
    // 게임 상태를 초기화하고, 점수를 업데이트합니다.
    this.initGameState();
    this.player1.updateScore();
    this.player2.updateScore();
  }

  roundOver() {
    return (
      this.ball.coord.left <= this.boardCoord.left || this.ball.coord.right >= this.boardCoord.right
    );
  }

  checkWinCondition() {
    // 승리 조건 검사 및 처리 로직
    if (this.player1.score >= this.scoreToWin) {
      this.endGame('Player1');
    } else if (this.player2.score >= this.scoreToWin) {
      this.endGame('Player2');
    }
  }

}

// Player와 Ball 클래스는 이전에 제공된 구현을 사용하되, 필요한 메소드를 PongGame 클래스에 맞게 조정합니다.
// 예를 들어, Player의스에 맞게 조정합니다.
// // 예를 들어, Player의 moveUp과 moveDown 메소드는 PongGame 클래스에서 전달된 boardCoord를 사용하여 업데이트됩니다.

class Player {
  constructor(paddleElement, scoreElement, playerName) {
    this.paddle = paddleElement;
    this.scoreElement = scoreElement;
    this.score = 0;
    this.playerName = playerName;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  moveUp(boardCoord) {
    this.paddle.style.top = Math.max(boardCoord.top, this.paddleCoord.top - window.innerHeight * 0.01) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  moveDown(boardCoord) {
    this.paddle.style.top = Math.min(boardCoord.bottom - this.paddle.getBoundingClientRect().height, this.paddleCoord.top + window.innerHeight * 0.01) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  updateScore() {
    this.scoreElement.innerHTML = this.score;
  }
}


let obstacles = [];

class CollisionDetector {
  static ballBoardCollision(ball, boardCoord) {
    return (
      ball.coord.top <= boardCoord.top || ball.coord.bottom >= boardCoord.bottom
    );
  }

  static ballPlayer1Collision(ball, player) {
    return (
      ball.coord.left <= player.paddle.getBoundingClientRect().right &&
      ball.coord.bottom >= player.paddle.getBoundingClientRect().top &&
      ball.coord.top <= player.paddle.getBoundingClientRect().bottom
    );
  }

  static ballPlayer2Collision(ball, player) {
    return (
      ball.coord.right >= player.paddle.getBoundingClientRect().left &&
      ball.coord.bottom >= player.paddle.getBoundingClientRect().top &&
      ball.coord.top <= player.paddle.getBoundingClientRect().bottom
    );
  }

  static ballObstacleCollision(ball, obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i].getBoundingClientRect();
      if (
        obstacle.left <= ball.coord.right &&
        ball.coord.left <= obstacle.right &&
        obstacle.top <= ball.coord.bottom &&
        ball.coord.top <= obstacle.bottom
      )
        return obstacle;
    }
    return null;
  }
}

class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;  // 공의 DOM 요소
    this.coord = initialCoord;  // 초기 좌표
    this.speed = speed;  // 공의 속도
  }

  // 현재 공의 위치 정보를 반환하는 메서드
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  init() {
    this.coord = initialBallCoord;
    this.element.style = initialBall.style;
  }

  getBounceDirectionVector(target_coord) {
    const ball_mid = ball.coord.top + ball.coord.height / 2;
    const target_mid = target_coord.top + target_coord.height / 2;
    const y = (ball_mid - target_mid) / target_coord.height / 2;
    const x = Math.sqrt(1 - y * y);
    return { y: y, x: x };
  }

  // 공을 이동시키는 메서드
  move(dy, dx, game) {

    // this.coord.top += dy;
    // this.coord.left += dx;

    let obstacle = CollisionDetector.ballObstacleCollision(this, game.obstacles);
    if (obstacle) {
      const sign = dx > 0 ? -1 : 1;
      const dir = this.getBounceDirectionVector(obstacle.getBoundingClientRect());
      if (
        obstacle.left <= this.coord.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        dy = dir.y * this.speed;
        dx = sign * dir.x * this.speed;
      }
      // 오른쪽에서 충돌한 경우
      else if (
        this.coord.left <= obstacle.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        dy = dir.y * this.speed;
        dx = sign * dir.x * this.speed;
      }
    }
    if (CollisionDetector.ballBoardCollision(this, game.boardCoord)) {
      dy *= -1;
    }
    if (CollisionDetector.ballPlayer1Collision(this, game.player1)) {
      const dir = this.getBounceDirectionVector(player1.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = dir.x * this.speed;
    }
    if (CollisionDetector.ballPlayer2Collision(this, game.player2)) {
      const dir = this.getBounceDirectionVector(player2.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = -dir.x * this.speed;
    }

    // 게임 승리 조건 검사
    if (game.roundOver()) {
      game.checkWinCondition();
      return; // 승리 조건을 만족하면 이동을 중단합니다.
    }

    // DOM 요소의 위치를 업데이트합니다.
    // this.element.style.top = `${this.coord.top}px` +;
    // this.element.style.left = `${this.coord.left}px`;

    // 다음 프레임을 위한 이동 요청
    // requestAnimationFrame(() => this.move(dy, dx, game));

    // DOM 요소의 위치를 업데이트합니다.
    this.element.style.top = this.coord.top + dy + 'px';
    this.element.style.left = this.coord.left + dx + 'px';
    this.coord = this.getBoundingClientRect();
    //
    // // 애니메이션 프레임 요청
    requestAnimationFrame(() => {
      this.move(dy, dx, game);
    });
  }
}

// // 게임 인스턴스를 생성하고 시작합니다.
const pongGame = new PongGame();
pongGame.gameStart();