import Ball from './Ball.js';
import Player from './Player.js';

export default class PingPong {
  constructor(mode) {
    this.gameState = 'ready';
    this.board = document.querySelector('.board');
    this.message = document.querySelector('.message');
    this.boardCoord = this.board.getBoundingClientRect();
    this.mode = mode;
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
    // for (let i = 0; i < 1; ++i) {
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
    // }
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
    if (this.ball.coord.left <= this.boardCoord.left) {
      ++this.player2.score;
    } else {
      ++this.player1.score;
    }
    this.player1.updateScore();
    this.player2.updateScore();
    this.initGameState();
    // 승리 조건 검사 및 처리 로직
    if (this.player1.score >= this.scoreToWin) {
      this.endGame('Player1');
    } else if (this.player2.score >= this.scoreToWin) {
      this.endGame('Player2');
    }
  }
}

