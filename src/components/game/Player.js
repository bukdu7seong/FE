import { GameMode } from './PingPong.js';

const INITIAL_PADDLE_TOP = 10;

export default class Player {
  constructor(mode, paddleElement, scoreElement, playerName) {
    this.paddle = paddleElement;
    this.paddleSpeed = mode === GameMode.SPEED ? 20 : 10;
    this.scoreElement = scoreElement;
    this.score = 0;
    this.playerName = playerName;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.paddleCoord = this.paddle.getBoundingClientRect();
    const boardHeight = paddleElement.parentElement.clientHeight;
    const paddleHeight = paddleElement.clientHeight;
    this.initialTop = (boardHeight / 2) - (paddleHeight / 2);
    this.paddle.style.top = `${this.initialTop}px`;
  }

  resetPaddlePosition(boardHeight) {
    const paddleHeight = this.paddle.offsetHeight;
    const centerPosition = (boardHeight / 2) - (paddleHeight / 2);
    this.paddle.style.top = `${centerPosition}px`;
  }

  moveUp() {
    const currentTop = parseFloat(
      this.paddle.style.top ? this.paddle.style.top : INITIAL_PADDLE_TOP
    );
    const newTop = currentTop - this.paddleSpeed;
    this.paddle.style.top = Math.max(INITIAL_PADDLE_TOP, newTop) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  moveDown(boardCoord) {
    const currentTop = parseFloat(
      this.paddle.style.top ? this.paddle.style.top : INITIAL_PADDLE_TOP
    );
    const newTop = currentTop + this.paddleSpeed;
    this.paddle.style.top =
      Math.min(
        boardCoord.height - this.paddleCoord.height - INITIAL_PADDLE_TOP,
        newTop
      ) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  updateScore() {
    ++this.score;
    this.updateScoreHtml();
  }

  updateScoreHtml() {
    this.scoreElement.innerHTML = this.score;
  }

  initScore() {
    this.score = 0;
    this.updateScoreHtml();
  }
}
