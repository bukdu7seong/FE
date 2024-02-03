let gameState = 'ready';
let board = document.querySelector('.board');
let message = document.querySelector('.message');
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();
let mode = 'speed';
const numObstacle = 15;

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1;
  // return -1;
}

class Player{
  constructor(paddleElement, scoreElement, playerName) {
    this.paddle = paddleElement;
    this.paddleCoord = this.paddle.getBoundingClientRect();
    this.scoreElement = scoreElement;
    this.score = 0;
    this.playerName = playerName;
    this.isMovingUp = false;
    this.isMovingDown = false;
  }

  moveUp() {
    this.paddle.style.top = Math.max(board_coord.top, this.paddleCoord.top - window.innerHeight * 0.01) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  moveDown() {
    this.paddle.style.top = Math.min(board_coord.bottom - paddle_common.height, this.paddleCoord.top + window.innerHeight * 0.01) + 'px';
    this.paddleCoord = this.paddle.getBoundingClientRect();
  }

  updateScore() {
    this.scoreElement.innerHTML = this.score;
  }
}

let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');

let player1 = new Player(paddle_1, score_1, 'Player1');
let player2 = new Player(paddle_2, score_2, 'Player2');

document.addEventListener('keydown', (e) => {
  if (e.key === 'w') {
    player1.isMovingUp = true;
  } else if (e.key === 's') {
    player1.isMovingDown = true;
  } else if (e.key === 'ArrowUp') {
    player2.isMovingUp = true;
  } else if (e.key === 'ArrowDown') {
    player2.isMovingDown = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w') {
    player1.isMovingUp = false;
  } else if (e.key === 's') {
    player1.isMovingDown = false;
  } else if (e.key === 'ArrowUp') {
    player2.isMovingUp = false;
  } else if (e.key === 'ArrowDown') {
    player2.isMovingDown = false;
  }
});

function movePaddles() {
  if (player1.isMovingUp) {
    player1.moveUp();
  }
  if (player1.isMovingDown) {
    player1.moveDown();
  }
  if (player2.isMovingUp) {
    player2.moveUp();
  }
  if (player2.isMovingDown) {
    player2.moveDown();
  }
  requestAnimationFrame(movePaddles);
}
// 초기화: requestAnimationFrame 호출
requestAnimationFrame(movePaddles);

document.addEventListener('keydown', (e) => {
  console.log('hello');
  if (e.key === 'Enter' && gameState === 'ready') {
    for (let obstacle of obstacles) {
      obstacle.remove();
    }
    obstacles = [];

    // 추가: 여러 개의 장애물 다시 생성
    for (let i = 0; i < numObstacle; i++) {
      createObstacle();
    }

    gameState = 'play';
    message.innerHTML = 'Game Started';
    message.style.left = 42 + 'vw';
    requestAnimationFrame(() => {
      let dy = 0;
      let dx = getRandomDirection() * ball.speed;
      ball.move(dy, dx);
    });
  }
});

function ballBoardCollsion() {
  return (
    ball.coord.top <= board_coord.top || ball.coord.bottom >= board_coord.bottom
  );
}

function ballPaddle1Collsion() {
  return (
    ball.coord.left <= player1.paddle.getBoundingClientRect().right &&
    ball.coord.bottom >= player1.paddle.getBoundingClientRect().top &&
    ball.coord.top <= player1.paddle.getBoundingClientRect().bottom
  );
}

function ballPaddel2Collsion() {
  return (
    ball.coord.right >= player2.paddle.getBoundingClientRect().left &&
    ball.coord.bottom >= player2.paddle.getBoundingClientRect().top &&
    ball.coord.top <= player2.paddle.getBoundingClientRect().bottom
  );
}

function roundOver() {
  return (
    ball.coord.left <= board_coord.left || ball.coord.right >= board_coord.right
  );
}

function paddle1Win() {
  return board_coord.right <= ball.coord.right;
}
function paddle2Win() {
  return board_coord.left <= ball.coord.left;
}

function getBounceDirectionVector(target_coord) {
  const ball_mid = ball.coord.top + ball.coord.height / 2;
  const target_mid = target_coord.top + target_coord.height / 2;
  const y = (ball_mid - target_mid) / target_coord.height / 2;
  const x = Math.sqrt(1 - y * y);
  return { y: y, x: x };
}
function ballObstacleCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i].getBoundingClientRect();
    if (
      obstacle.left <= ball.coord.right &&
      ball.coord.left <= obstacle.right &&
      obstacle.top <= ball.coord.bottom &&
      ball.coord.top <= obstacle.bottom
    )
      return obstacle;
  }
  return null;
}

let obstacles = [];
// 추가: 장애물을 생성하는 함수
function createObstacle() {
  let obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  board.appendChild(obstacle);
  // 장애물 초기 위치 무작위 설정
  obstacle.style.top = Math.random() * (board.clientHeight - 20) + 'px';
  obstacle.style.left = Math.random() * (board.clientWidth - 20) + 'px';
  obstacles.push(obstacle);
}
class Ball {
  constructor(element, initialCoord, speed) {
    this.element = element;  // 공의 DOM 요소
    this.coord = initialCoord;  // 초기 좌표
    this.speed = speed;  // 공의 속도
  }
  // 현재 공의 위치 정보를 반환하는 메서드
  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }
  // 공을 이동시키는 메서드
  move(dy, dx) {
    // 기존의 공 이동 로직을 여기에 복사합니다.
    // ...
    let obstacle = ballObstacleCollision();
    if (obstacle) {
      const sign = dx > 0 ? -1 : 1;
      const dir = getBounceDirectionVector(obstacle);
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

    if (ballBoardCollsion()) {
      dy *= -1;
    } else if (ballPaddle1Collsion()) {
      const dir = getBounceDirectionVector(player1.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = dir.x * this.speed;
    } else if (ballPaddel2Collsion()) {
      const dir = getBounceDirectionVector(player2.paddle.getBoundingClientRect());
      dy = dir.y * this.speed;
      dx = -dir.x * this.speed;
    } else if (roundOver()) {
      if (paddle1Win()) {
        ++score_1.innerHTML;
      } else {
        ++score_2.innerHTML;
      }
      gameState = 'ready';

      this.coord = initialBallCoord;
      this.element.style = initialBall.style;
      message.innerHTML = 'Press Enter to Play Pong';
      message.style.left = 38 + 'vw';
      return;
    }

    // DOM 요소의 위치를 업데이트합니다.
    this.element.style.top = this.coord.top + dy + 'px';
    this.element.style.left = this.coord.left + dx + 'px';
    this.coord = this.getBoundingClientRect();

    // 애니메이션 프레임 요청
    requestAnimationFrame(() => {
      this.move(dy, dx);
    });
  }
}

// 사용법
const initialBall = document.querySelector('.ball');
const initialBallCoord = initialBall.getBoundingClientRect();
const ballSpeed = mode === 'normal' ? 10 : 20;
// Ball 클래스의 인스턴스를 생성합니다.
let ball = new Ball(initialBall, initialBallCoord, ballSpeed);
