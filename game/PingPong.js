import Ball from './Ball.js';
import Player from './Player.js';

export default class PingPong {
  constructor(mode, player1Name, player2Name) {
    this.gameState = 'ready';
    this.board = document.querySelector('.board');
    this.message = document.querySelector('.message');
    this.boardCoord = this.board.getBoundingClientRect();
    this.mode = mode;
    this.numObstacle = 15;
    this.obstacles = [];
    this.initPlayers(player1Name, player2Name);
    this.initBall();
    this.initEventListeners();
    this.initGameState();
    this.scoreToWin = 2;
  }

  initPlayers(player1Name, player2Name) {
    const paddle1 = document.querySelector('.paddle_1');
    const score1 = document.querySelector('.player_1_score');
    const paddle2 = document.querySelector('.paddle_2');
    const score2 = document.querySelector('.player_2_score');
    this.player1 = new Player(paddle1, score1, player1Name);
    this.player2 = new Player(paddle2, score2, player2Name);
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
    this.gameState = 'play';
    this.message.innerHTML = 'Game Started';
    this.message.style.left = '42vw';
    this.obstacles = [];
    this.player1.updateScoreHtml();
    this.player2.updateScoreHtml();
    if (this.mode === 'object') {
      for (let i = 0; i < this.numObstacle; i++) {
        this.createObstacle();
      }
    }
    this.movePaddles();
    this.moveBall();
    this.obstacles.forEach(obstacle => {
      moveObstacle(obstacle, areaBounds);
    });

  }

  createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    this.board.appendChild(obstacle);

    const marginWidth = this.board.clientWidth * 0.1;
    const marginHeight = this.board.clientHeight * 0.1;

    // 장애물이 생성될 수 있는 영역 계산 (보드 크기의 80%)
    const availableWidth = this.board.clientWidth * 0.8;
    const availableHeight = this.board.clientHeight * 0.8;

    // 장애물의 위치를 무작위로 결정 (중앙 80% 영역 내)
    obstacle.style.top = (Math.random() * availableHeight + marginHeight) + 'px';
    obstacle.style.left = (Math.random() * availableWidth + marginWidth) + 'px'
    this.obstacles.push(obstacle);
  }

  movePaddles() {
    if (this.player1.isMovingUp) this.player1.moveUp(this.boardCoord);
    if (this.player1.isMovingDown) this.player1.moveDown(this.boardCoord);
    if (this.player2.isMovingUp) this.player2.moveUp(this.boardCoord);
    if (this.player2.isMovingDown) this.player2.moveDown(this.boardCoord);
    if (this.gameState === 'play') requestAnimationFrame(this.movePaddles.bind(this));
  }

  getRandomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  moveBall() {
    let dy = 0;
    let dx = this.getRandomDirection() * this.ball.speed;
    this.ball.move(dy, dx, this);
  }

  updatePlayersScore() {
    if (this.ball.leftOut(this.boardCoord)) {
      this.player2.updateScore();
    } else if (this.ball.rightOut(this.boardCoord)) {
      this.player1.updateScore();
    }
    this.ball.init();
    setTimeout(() => {
        if (this.player1.score >= this.scoreToWin || this.player2.score >= this.scoreToWin) {
          this.winner = this.player1.score >= this.scoreToWin ? this.player1.playerName : this.player2.playerName;
          this.endGame(this.winner);
          if (this.mode === 'object') {
            this.obstacles.forEach(obstacle => obstacle.remove());
          }
          this.ball.updateStyle(this.ball.initialCoord.top, this.ball.initialCoord.left);
          this.gameState = 'end';
          this.onGameEnd();
        } else {
          // 목표 점수에 도달하지 않았다면 게임 재시작
          this.moveBall();
        }
      }, 0
    );
  }

  endGame(winner) {
    this.gameState = 'over';
    this.message.innerHTML = `${winner} Wins!`;
    this.message.style.left = '30vw';
  }
}


function moveObstacle(obstacle, areaBounds) {
  // 장애물의 속도와 방향 설정
  const speed = 2; // 움직임 속도
  let dx = Math.random() < 0.5 ? speed : -speed;
  let dy = Math.random() < 0.5 ? speed : -speed;

  function animate() {
    let rect = obstacle.getBoundingClientRect();

    // 영역의 경계에 도달하면 방향 변경
    if (rect.left <= areaBounds.left || rect.right >= areaBounds.right) {
      dx = -dx;
    }
    if (rect.top <= areaBounds.top || rect.bottom >= areaBounds.bottom) {
      dy = -dy;
    }

    // 장애물 위치 업데이트
    obstacle.style.left = obstacle.offsetLeft + dx + 'px';
    obstacle.style.top = obstacle.offsetTop + dy + 'px';

    requestAnimationFrame(animate); // 다음 애니메이션 프레임 요청
  }

  animate(); // 애니메이션 시작
}

// 각 장애물에 대해 움직임 함수 호출
const obstacles = document.querySelectorAll('.obstacle');
const areaBounds = document.querySelector('.board').getBoundingClientRect();

