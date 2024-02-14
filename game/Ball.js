import CollisionDetector from './CollisionDetector.js';

export default class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;  // 공의 DOM 요소
    this.coord = initialCoord;  // 초기 좌표
    this.initialCoord = initialCoord;
    this.speed = speed;  // 공의 속도
  }

  // 현재 공의 위치 정보를 반환하는 메서드
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
    return (this.leftOut(boardCoord) || this.rightOut(boardCoord));
  }

  getNextCoordinate(dy, dx, pingPong) {
    if (CollisionDetector.ballBoardCollision(this, pingPong.boardCoord)) {
      return { y: dy * -1, x: dx };
    }
    let ndy = dy;
    let ndx = dx;
    let dir = null;
    let obstacle = CollisionDetector.ballObstaclesCollision(this, pingPong.obstacles);
    if (obstacle) {
      if (CollisionDetector.ballObstacleLeftCollision(this, obstacle) || CollisionDetector.ballObstacleRightCollision(this, obstacle)) {
        dir = this.getReflectVector(obstacle);
      }
    } else if (CollisionDetector.ballPlayer1Collision(this, pingPong.player1)) {
      dir = this.getReflectVector(pingPong.player1.paddle.getBoundingClientRect());
    } else if (CollisionDetector.ballPlayer2Collision(this, pingPong.player2)) {
      dir = this.getReflectVector(pingPong.player2.paddle.getBoundingClientRect());
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
    if (this.outOfBoard(pingPong.boardCoord)) {
      pingPong.updatePlayersScore();
      return; // 승리 조건을 만족하면 이동을 중단합니다.
    }
    const nextCoord = this.getNextCoordinate(dy, dx, pingPong);
    this.updateStyle(this.coord.top + nextCoord.y, this.coord.left + nextCoord.x);
    this.coord = this.getCoord();
    requestAnimationFrame(() => {
      this.move(nextCoord.y, nextCoord.x, pingPong);
    });
  }
}