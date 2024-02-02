let gameState = 'ready';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let board_coord = board.getBoundingClientRect();
let paddle_common = document.querySelector('.paddle').getBoundingClientRect();

// let mode = 'normal';
let mode = 'speed';
let speed = mode == 'normal' ? 10 : 20;
const numObstacle = 15;

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1;
  // return -1;
}

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
      let dx = getRandomDirection() * speed;
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
    ball.coord.left <= paddle_1_coord.right &&
    ball.coord.bottom >= paddle_1_coord.top &&
    ball.coord.top <= paddle_1_coord.bottom
  );
}

function ballPaddel2Collsion() {
  return (
    ball.coord.right >= paddle_2_coord.left &&
    ball.coord.bottom >= paddle_2_coord.top &&
    ball.coord.top <= paddle_2_coord.bottom
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


let isPlayer1MovingUp = false;
let isPlayer1MovingDown = false;
let isPlayer2MovingUp = false;
let isPlayer2MovingDown = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'w') {
    isPlayer1MovingUp = true;
  } else if (e.key === 's') {
    isPlayer1MovingDown = true;
  } else if (e.key === 'ArrowUp') {
    isPlayer2MovingUp = true;
  } else if (e.key === 'ArrowDown') {
    isPlayer2MovingDown = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w') {
    isPlayer1MovingUp = false;
  } else if (e.key === 's') {
    isPlayer1MovingDown = false;
  } else if (e.key === 'ArrowUp') {
    isPlayer2MovingUp = false;
  } else if (e.key === 'ArrowDown') {
    isPlayer2MovingDown = false;
  }
});

function movePaddles() {
  if (isPlayer1MovingUp) {
    paddle_1.style.top =
      Math.max(
        board_coord.top,
        paddle_1_coord.top - window.innerHeight * 0.01
      ) + 'px';
  }
  if (isPlayer1MovingDown) {
    paddle_1.style.top =
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_1_coord.top + window.innerHeight * 0.01
      ) + 'px';
  }
  if (isPlayer2MovingUp) {
    paddle_2.style.top =
      Math.max(
        board_coord.top,
        paddle_2_coord.top - window.innerHeight * 0.01
      ) + 'px';
  }
  if (isPlayer2MovingDown) {
    paddle_2.style.top =
      Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_2_coord.top + window.innerHeight * 0.01
      ) + 'px';
  }
  paddle_1_coord = paddle_1.getBoundingClientRect();
  paddle_2_coord = paddle_2.getBoundingClientRect();
  requestAnimationFrame(movePaddles);
}

// 초기화: requestAnimationFrame 호출
requestAnimationFrame(movePaddles);

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
      const dir = getBounceDirectionVector(paddle_1_coord);
      dy = dir.y * this.speed;
      dx = dir.x * this.speed;
    } else if (ballPaddel2Collsion()) {
      const dir = getBounceDirectionVector(paddle_2_coord);
      dy = dir.y * this.speed;
      dx = -dir.x * this.speed;
    } else if (roundOver()) {
      if (paddle1Win()) {
        score_1.innerHTML = score_1.innerHTML + 1;
      } else {
        score_2.innerHTML = score_2.innerHTML + 1;
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
