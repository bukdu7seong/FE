const INITIAL_PADDLE_TOP = 10;
const PADDLE_SPEED = 4.2 * 2;

export default class Player {
  constructor(paddleElement, scoreElement, playerName) {
    this.paddle = paddleElement;
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

  moveUp(boardCoord) {
    const currentTop = parseFloat(
      this.paddle.style.top ? this.paddle.style.top : INITIAL_PADDLE_TOP
    );
    const newTop = currentTop - PADDLE_SPEED;
    this.paddle.style.top = Math.max(INITIAL_PADDLE_TOP, newTop) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  moveDown(boardCoord) {
    const currentTop = parseFloat(
      this.paddle.style.top ? this.paddle.style.top : INITIAL_PADDLE_TOP
    );
    const newTop = currentTop + PADDLE_SPEED;
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
