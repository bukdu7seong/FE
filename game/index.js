let gameState = 'ready';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
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
  if (e.key == 'Enter' && gameState == 'ready') {
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
      moveBall(dy, dx);
    });
  }
});

function ballBoardCollsion() {
  return (
    ball_coord.top <= board_coord.top || ball_coord.bottom >= board_coord.bottom
  );
}

function ballPaddle1Collsion() {
  return (
    ball_coord.left <= paddle_1_coord.right &&
    ball_coord.bottom >= paddle_1_coord.top &&
    ball_coord.top <= paddle_1_coord.bottom
  );
}

function ballPaddel2Collsion() {
  return (
    ball_coord.right >= paddle_2_coord.left &&
    ball_coord.bottom >= paddle_2_coord.top &&
    ball_coord.top <= paddle_2_coord.bottom
  );
}

function roundOver() {
  return (
    ball_coord.left <= board_coord.left || ball_coord.right >= board_coord.right
  );
}

function paddle1Win() {
  return board_coord.right <= ball_coord.right;
}

function paddle2Win() {
  return board_coord.left <= ball_coord.left;
}

// function getBounceDirectionVector(paddle_coord) {
//   const ball_mid = ball_coord.top + ball_coord.height / 2;
//   const paddle_mid = paddle_coord.top + paddle_common.height / 2;
//   const y = (ball_mid - paddle_mid) / paddle_common.height / 2;
//   const x = Math.sqrt(1 - y * y);
//   return { y: y, x: x };
// }

function getBounceDirectionVector(target_coord) {
  const ball_mid = ball_coord.top + ball_coord.height / 2;
  const target_mid = target_coord.top + target_coord.height / 2;
  const y = (ball_mid - target_mid) / target_coord.height / 2;
  const x = Math.sqrt(1 - y * y);
  return { y: y, x: x };
}

function ballObstacleCollision() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i].getBoundingClientRect();
    if (
      obstacle.left <= ball_coord.right &&
      ball_coord.left <= obstacle.right &&
      obstacle.top <= ball_coord.bottom &&
      ball_coord.top <= obstacle.bottom
    )
      return obstacle;
  }
  return null;
}

function moveBall(dy, dx) {
  let obstacle = ballObstacleCollision();
  if (obstacle) {
    const sign = dx > 0 ? -1 : 1;
    const dir = getBounceDirectionVector(obstacle);
    if (
      obstacle.left <= ball_coord.right &&
      obstacle.top <= ball_coord.bottom &&
      ball_coord.top <= obstacle.bottom
    ) {
      dy = dir.y * speed;
      dx = sign * dir.x * speed;
    }
    // 오른쪽에서 충돌한 경우
    else if (
      ball_coord.left <= obstacle.right &&
      obstacle.top <= ball_coord.bottom &&
      ball_coord.top <= obstacle.bottom
    ) {
      dy = dir.y * speed;
      dx = sign * dir.x * speed;
    }
  }
  if (ballBoardCollsion()) {
    dy *= -1;
  } else if (ballPaddle1Collsion()) {
    const dir = getBounceDirectionVector(paddle_1_coord);
    dy = dir.y * speed;
    dx = dir.x * speed;
  } else if (ballPaddel2Collsion()) {
    const dir = getBounceDirectionVector(paddle_2_coord);
    dy = dir.y * speed;
    dx = -dir.x * speed;
  } else if (roundOver()) {
    if (paddle1Win()) {
      score_1.innerHTML = +score_1.innerHTML + 1;
    } else {
      score_2.innerHTML = +score_2.innerHTML + 1;
    }
    gameState = 'ready';

    ball_coord = initial_ball_coord;
    ball.style = initial_ball.style;
    message.innerHTML = 'Press Enter to Play Pong';
    message.style.left = 38 + 'vw';
    return;
  }
  ball.style.top = ball_coord.top + dy + 'px';
  ball.style.left = ball_coord.left + dx + 'px';
  ball_coord = ball.getBoundingClientRect();
  requestAnimationFrame(() => {
    moveBall(dy, dx);
  });
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
