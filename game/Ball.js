import CollisionDetector from './CollisionDetector.js';

export default class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;  // 공의 DOM 요소
    this.coord = initialCoord;  // 초기 좌표
    this.speed = speed;  // 공의 속도
  }

  // 현재 공의 위치 정보를 반환하는 메서드
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  init() {
    this.coord = initialBallCoord;
    this.element.style = initialBall.style;
  }

  getBounceDirectionVector(target_coord) {
    const ball_mid = this.coord.top + this.coord.height / 2;
    const target_mid = target_coord.top + target_coord.height / 2;
    const y = (ball_mid - target_mid) / target_coord.height / 2;
    const x = Math.sqrt(1 - y * y);
    return { y: y, x: x };
  }

  // 공을 이동시키는 메서드
  move(dy, dx, game) {
    let obstacle = CollisionDetector.ballObstacleCollision(this, game.obstacles);
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
    if (CollisionDetector.ballBoardCollision(this, game.boardCoord)) {
      dy *= -1;
    }
    if (CollisionDetector.ballPlayer1Collision(this, game.player1)) {
      const dir = this.getBounceDirectionVector(game.player1.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = dir.x * this.speed;
    }
    if (CollisionDetector.ballPlayer2Collision(this, game.player2)) {
      const dir = this.getBounceDirectionVector(game.player2.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = -dir.x * this.speed;
    }

    if (game.roundOver()) {
      game.checkWinCondition();
      return; // 승리 조건을 만족하면 이동을 중단합니다.
    }

    this.element.style.top = this.coord.top + dy + 'px';
    this.element.style.left = this.coord.left + dx + 'px';
    this.coord = this.getBoundingClientRect();

    requestAnimationFrame(() => {
      this.move(dy, dx, game);});
  }
}