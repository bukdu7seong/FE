import Ball from './Ball.js';
import Player from './Player.js';
import Obstacle from './Obstacle.js';

const KEY_CODES = {
  MOVE_UP_PLAYER1: 'KeyW',
  MOVE_DOWN_PLAYER1: 'KeyS',
  MOVE_UP_PLAYER2: 'ArrowUp',
  MOVE_DOWN_PLAYER2: 'ArrowDown',
};

export const GameState = {
  READY: 'ready',
  PLAY: 'play',
  END: 'end',
  OVER: 'over',
};

export default class PingPong {
  constructor(mode, player1Name, player2Name) {
    this.state = GameState.READY;
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
      switch (e.code) {
        case KEY_CODES.MOVE_UP_PLAYER1:
          this.player1.isMovingUp = true;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER1:
          this.player1.isMovingDown = true;
          break;
        case KEY_CODES.MOVE_UP_PLAYER2:
          this.player2.isMovingUp = true;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER2:
          this.player2.isMovingDown = true;
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case KEY_CODES.MOVE_UP_PLAYER1:
          this.player1.isMovingUp = false;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER1:
          this.player1.isMovingDown = false;
          break;
        case KEY_CODES.MOVE_UP_PLAYER2:
          this.player2.isMovingUp = false;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER2:
          this.player2.isMovingDown = false;
          break;
      }
    });
  }

  initGameState() {
    this.state = GameState.READY;
    this.message.innerHTML = 'Press Enter to Play Pong';
    this.message.style.left = '38vw';
  }

  gameStart() {
    this.state = GameState.PLAY;
    this.message.innerHTML = 'Game Started';
    this.message.style.left = '42vw';
    this.obstacles = [];
    this.player1.updateScoreHtml();
    this.player2.updateScoreHtml();
    if (this.mode === 'object') {
      for (let i = 0; i < this.numObstacle; i++) {
        const obstacle = new Obstacle(this.board, this.boardCoord);
        this.obstacles.push(obstacle);
      }
    }
    this.movePaddles();
    this.moveBall();
  }


  movePaddles() {
    if (this.player1.isMovingUp) this.player1.moveUp(this.boardCoord);
    if (this.player1.isMovingDown) this.player1.moveDown(this.boardCoord);
    if (this.player2.isMovingUp) this.player2.moveUp(this.boardCoord);
    if (this.player2.isMovingDown) this.player2.moveDown(this.boardCoord);
    if (this.state === GameState.PLAY) requestAnimationFrame(this.movePaddles.bind(this));
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
          if (this.mode === 'object') {
            this.removeAllObstacles();
          }
          this.player1.resetPosition();
          this.player2.resetPosition();
          this.ball.updateStyle(this.ball.initialCoord.top, this.ball.initialCoord.left);
          this.message.innerHTML = `${this.winner} Wins!`;
          this.state = GameState.END;
          this.onGameEnd();
        } else {
          // 목표 점수에 도달하지 않았다면 게임 재시작
          this.moveBall();
        }
      }, 0
    );
  }

  removeAllObstacles() {
    this.obstacles.forEach(obstacle => obstacle.remove());
    this.obstacles = []; // 장애물 배열도 비웁니다.
  }
}
