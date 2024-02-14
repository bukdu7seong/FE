export default class Player {
  constructor(paddleElement, scoreElement, playerName) {
    this.paddle = paddleElement;
    this.scoreElement = scoreElement;
    this.score = 0;
    this.playerName = playerName;
    this.initialTop = paddleElement.style.top;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  resetPosition() {
    this.paddle.style.top = this.initialTop;
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
    ++this.score;
    this.updateScoreHtml();
  }

  updateScoreHtml() {
    this.scoreElement.innerHTML = this.score;
  }
}