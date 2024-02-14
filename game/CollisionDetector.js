export default class CollisionDetector {
  static ballBoardCollision(ball, boardCoord) {
    return (ball.coord.top <= boardCoord.top || ball.coord.bottom >= boardCoord.bottom);
  }

  static ballPlayer1Collision(ball, player) {
    return (ball.coord.left <= player.paddle.getBoundingClientRect().right && ball.coord.bottom >= player.paddle.getBoundingClientRect().top && ball.coord.top <= player.paddle.getBoundingClientRect().bottom);
  }

  static ballPlayer2Collision(ball, player) {
    return (ball.coord.right >= player.paddle.getBoundingClientRect().left && ball.coord.bottom >= player.paddle.getBoundingClientRect().top && ball.coord.top <= player.paddle.getBoundingClientRect().bottom);
  }

  static ballObstaclesCollision(ball, obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i].element.getBoundingClientRect();
      if (obstacle.left <= ball.coord.right && ball.coord.left <= obstacle.right && obstacle.top <= ball.coord.bottom && ball.coord.top <= obstacle.bottom) return obstacle;
    }
    return null;
  }

  static ballObstacleLeftCollision(ball, obstacle) {
    return (obstacle.left <= ball.coord.right && obstacle.top <= ball.coord.bottom && ball.coord.top <= obstacle.bottom);
  }

  static ballObstacleRightCollision(ball, obstacle) {
    return (ball.coord.left <= obstacle.right && obstacle.top <= ball.coord.bottom && ball.coord.top <= obstacle.bottom);
  }
}
