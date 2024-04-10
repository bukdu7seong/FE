import CollisionDetector from './CollisionDetector.js';

export default class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;
    this.coord = initialCoord;
    this.initialCoord = initialCoord;
    this.speed = speed;
    this.ballFrame = null;
    this.radius = 15;
    this.isVisible = true;
  }

  hide() {
    this.element.style.display = 'none';
    this.isVisible = false;
    cancelAnimationFrame(this.ballFrame);
  }

  show() {
    this.element.style.display = 'block';
    this.isVisible = true;
  }

  getCoord() {
    return this.element.getBoundingClientRect();
  }

  init() {
    this.coord = this.initialCoord;
  }


  getReflectVector(targetCoord) {
    const ballMid = this.coord.top + this.coord.height / 2;
    const targetMid = targetCoord.top + targetCoord.height / 2;
    const y = (ballMid - targetMid) / targetCoord.height / 2;
    const x = Math.sqrt(1 - y * y);
    return { y: y, x: x };
  }

  leftOut(boardCoord) {
    return this.coord.left <= boardCoord.left;
  }

  rightOut(boardCoord) {
    return this.coord.right >= boardCoord.right;
  }

  outOfBoard(boardCoord) {
    return this.leftOut(boardCoord) || this.rightOut(boardCoord);
  }

  getNextCoordinate(dy, dx, pingPong) {
    if (CollisionDetector.ballBoardCollision(this, pingPong.boardCoord)) {
      return { y: dy * -1, x: dx };
    }
    let ndy = dy;
    let ndx = dx;
    let dir = null;
    const obstacle = CollisionDetector.ballObstaclesCollision(
      this,
      pingPong.obstacles
    );
    if (obstacle) {
      if (
        CollisionDetector.ballObstacleLeftCollision(this, obstacle) ||
        CollisionDetector.ballObstacleRightCollision(this, obstacle)
      ) {
        dir = this.getReflectVector(obstacle);
      }
    } else if (CollisionDetector.ballPlayer1Collision(this, pingPong.player1)) {
      dir = this.getReflectVector(
        pingPong.player1.paddle.getBoundingClientRect()
      );
    } else if (CollisionDetector.ballPlayer2Collision(this, pingPong.player2)) {
      dir = this.getReflectVector(
        pingPong.player2.paddle.getBoundingClientRect()
      );
    }
    if (dir != null) {
      const sign = dx > 0 ? -1 : 1;
      ndy = dir.y * this.speed;
      ndx = dir.x * this.speed * sign;
    }
    return { y: ndy, x: ndx };
  }

  updateStyle(coordTop, coordLeft) {
    this.element.style.top = coordTop + 'px';
    this.element.style.left = coordLeft + 'px';
  }

  move(dy, dx, pingPong) {
    if (!this.isVisible) {
      return;
    }

    if (this.outOfBoard(pingPong.boardCoord)) {
      pingPong.updatePlayersScore();
      return;
    }
    const currentTop = parseFloat(
      this.element.style.top
        ? this.element.style.top
        : pingPong.boardCoord.height / 2 - this.radius
    );
    const currentLeft = parseFloat(
      this.element.style.left
        ? this.element.style.left
        : pingPong.boardCoord.width / 2 - this.radius
    );
    const nextCoord = this.getNextCoordinate(dy, dx, pingPong);
    this.updateStyle(currentTop + nextCoord.y, currentLeft + nextCoord.x);
    this.coord = this.getCoord();
    this.ballFrame = requestAnimationFrame(() => {
      this.move(nextCoord.y, nextCoord.x, pingPong);
    });
  }
}
