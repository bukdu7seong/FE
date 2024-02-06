export default class Player {
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

  scored() {
    ++this.score;
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.innerHTML = this.score;
  }
}