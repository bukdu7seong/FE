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
  // 공을 이동시키는 메서드
  move(dy, dx, pingPong) {
    let obstacle = CollisionDetector.ballObstacleCollision(this, pingPong.obstacles);
    if (obstacle) {
      const sign = dx > 0 ? -1 : 1;
      const dir = this.getBounceDirectionVector(obstacle);
      if (
        obstacle.left <= this.coord.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        dy = dir.y * this.speed;
        dx = sign * dir.x * this.speed;
      }
      // 오른쪽에서 충돌한 경우
      else if (
        this.coord.left <= obstacle.right &&
        obstacle.top <= this.coord.bottom &&
        this.coord.top <= obstacle.bottom
      ) {
        dy = dir.y * this.speed;
        dx = sign * dir.x * this.speed;
      }
    }
    if (CollisionDetector.ballBoardCollision(this, pingPong.boardCoord)) {
      dy *= -1;
    }
    if (CollisionDetector.ballPlayer1Collision(this, pingPong.player1)) {
      const dir = this.getBounceDirectionVector(pingPong.player1.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = dir.x * this.speed;
    }
    if (CollisionDetector.ballPlayer2Collision(this, pingPong.player2)) {
      const dir = this.getBounceDirectionVector(pingPong.player2.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = -dir.x * this.speed;
    }

    if (this.outOfBoard(pingPong.boardCoord)) {
      pingPong.updatePlayersScore();
      return; // 승리 조건을 만족하면 이동을 중단합니다.
    }

    this.element.style.top = this.coord.top + dy + 'px';
    this.element.style.left = this.coord.left + dx + 'px';
    this.coord = this.getBoundingClientRect();

    requestAnimationFrame(() => {
      this.move(dy, dx, pingPong);});
  }
}