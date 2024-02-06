import CollisionDetector from './CollisionDetector.js';

export default class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;  // 공의 DOM 요소
    this.coord = initialCoord;  // 초기 좌표
    this.initialCoord = initialCoord;
    this.speed = speed;  // 공의 속도
  }

  // 현재 공의 위치 정보를 반환하는 메서드
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  init() {
    this.coord = this.initialCoord;
  }

  getBounceDirectionVector(targetCoord) {
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

  getNextPosition(dy, dx, pingPong) {
    let ndy = dy;
    let ndx = dx;
    let obstacle = CollisionDetector.ballObstacleCollision(this, pingPong.obstacles);
    if (obstacle) {
      const sign = dx > 0 ? -1 : 1;
      const dir = this.getBounceDirectionVector(obstacle);
      if (
        obstacle.left <= this.coord.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        ndy = dir.y * this.speed;
        ndx = sign * dir.x * this.speed;
      }
      // 오른쪽에서 충돌한 경우
      else if (
        this.coord.left <= obstacle.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        ndy = dir.y * this.speed;
        ndx = sign * dir.x * this.speed;
      }
    }
    if (CollisionDetector.ballBoardCollision(this, pingPong.boardCoord)) {
      ndy *= -1;
    }
    if (CollisionDetector.ballPlayer1Collision(this, pingPong.player1)) {
      const dir = this.getBounceDirectionVector(pingPong.player1.paddle.getBoundingClientRect());
      ndy = dir.y * this.speed;
      ndx = dir.x * this.speed;
    }
    if (CollisionDetector.ballPlayer2Collision(this, pingPong.player2)) {
      const dir = this.getBounceDirectionVector(pingPong.player2.paddle.getBoundingClientRect());
      ndy = dir.y * this.speed;
      ndx = -dir.x * this.speed;
    }
    return { y: ndy, x: ndx };
  }

  move(dy, dx, pingPong) {
    if (this.outOfBoard(pingPong.boardCoord)) {
      pingPong.updatePlayersScore();
      return; // 승리 조건을 만족하면 이동을 중단합니다.
    }
    const newPos = this.getNextPosition(dy, dx, pingPong);
    this.element.style.top = this.coord.top + newPos.y + 'px';
    this.element.style.left = this.coord.left + newPos.x + 'px';
    this.coord = this.getBoundingClientRect();
    requestAnimationFrame(() => {
      this.move(newPos.y, newPos.x, pingPong);
    });
  }
}