import Ball from './Ball.js';
import Player from './Player.js';
import Obstacle from './Obstacle.js';
import { gameState, userState } from '../../../lib/state/state.js';
import { createScoreModal, sendEmailCode, updateScoreModalContent } from '../../pages/game.js';

const KEY_CODES = {
  MOVE_UP_PLAYER1: 'KeyW',
  MOVE_DOWN_PLAYER1: 'KeyS',
  MOVE_UP_PLAYER2: 'ArrowUp',
  MOVE_DOWN_PLAYER2: 'ArrowDown',
};

const GameMode = {
  NORMAL: 'normal',
  SPEED: 'speed',
  OBJECT: 'object',
};

export const GameState = {
  READY: 'ready' || '',
  PLAY: 'play',
  END: 'end',
  OVER: 'over',
  PAUSED: 'paused',
};

export default class PingPong {
  constructor(mode, player1Name, player2Name) {
    this.state = GameState.READY;
    this.board = document.querySelector('.board');
    this.message = document.querySelector('.message');
    this.boardCoord = this.board.getBoundingClientRect();
    this.mode = mode;
    this.numObstacle = 15;
    this.obstacles = [];
    this.paddleFrame = null;
    this.keyEnterHandler = null;
    this.keyDownHandler = null;
    this.keyUpHandler = null;
    this.resize = null;
    this.pause = null;
    this.resume = null;
    this.initPlayers(player1Name, player2Name);
    this.initBall();
    this.initEventListeners();
    this.initGameState();
    this.scoreToWin = 2;
    this.onGameEnd = null;
    window.addEventListener('popstate', this.handlePopState.bind(this));
    this.timeoutId = null;
  }

  initPlayers(player1Name, player2Name) {
    const paddle1 = document.querySelector('.paddle_1');
    const score1 = document.querySelector('.player_1_score');
    const paddle2 = document.querySelector('.paddle_2');
    const score2 = document.querySelector('.player_2_score');
    this.player1 = new Player(paddle1, score1, player1Name);
    this.player2 = new Player(paddle2, score2, player2Name);
  }

  initBall() {
    const initialBall = document.querySelector('.ball');
    const initialBallCoord = initialBall.getBoundingClientRect();
    const ballSpeed = this.mode === GameMode.NORMAL ? 10 : 20;
    this.ball = new Ball(initialBall, initialBallCoord, ballSpeed);
  }

  initEventListeners() {
    this.keyEnterHandler = (e) => {
      if (e.code === 'Escape') {
        this.pause();
      }
    };

    this.keyDownHandler = (e) => {
      switch (e.code) {
        case KEY_CODES.MOVE_UP_PLAYER1:
          this.player1.isMovingUp = true;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER1:
          this.player1.isMovingDown = true;
          break;
        case KEY_CODES.MOVE_UP_PLAYER2:
          this.player2.isMovingUp = true;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER2:
          this.player2.isMovingDown = true;
          break;
      }
    };

    this.keyUpHandler = (e) => {
      switch (e.code) {
        case KEY_CODES.MOVE_UP_PLAYER1:
          this.player1.isMovingUp = false;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER1:
          this.player1.isMovingDown = false;
          break;
        case KEY_CODES.MOVE_UP_PLAYER2:
          this.player2.isMovingUp = false;
          break;
        case KEY_CODES.MOVE_DOWN_PLAYER2:
          this.player2.isMovingDown = false;
          break;
      }
    };

    this.resize = () => {
      this.player1.paddle = document.querySelector('.paddle_1');
      this.player2.paddle = document.querySelector('.paddle_2');
      this.ball.init();
      // this.ball.initialCoord = this.ball.getCoord();

      this.boardCoord = this.board.getBoundingClientRect();
      const boardCenterTop = this.boardCoord.height / 2 - this.ball.radius;
      const boardCenterLeft = this.boardCoord.width / 2 - this.ball.radius;

      // 보드 내에서 볼의 위치를 업데이트
      this.ball.updateStyle(boardCenterTop, boardCenterLeft);
      // 패들의 높이를 계산 (예시: 패들의 높이가 100px라고 가정)
      const paddleHeight = 100; // 실제 패들의 높이에 맞게 조정 필요
      // 보드 중앙에 패들을 위치시키기 위한 top 값 계산
      const paddleTopPosition = this.boardCoord.height / 2 - paddleHeight / 2;
      // 패들 위치 업데이트
      this.player1.paddle.style.top = `${paddleTopPosition}px`;
      this.player2.paddle.style.top = `${paddleTopPosition}px`;
    };

    this.pause = () => {
      this.state = GameState.PAUSED;
      cancelAnimationFrame(this.paddleFrame);
      cancelAnimationFrame(this.ball.ballFrame);
      this.obstacles.forEach((obstacle) => {
        if (obstacle.animationFrameId) {
          cancelAnimationFrame(obstacle.animationFrameId);
        }
      });
      this.obstacles.forEach((obstacle) => obstacle.hide());
    };

    this.resume = (e) => {
      if (e.code === 'Enter' && this.state === GameState.PAUSED) {
        this.state = GameState.PLAY;
        this.movePaddles();
        this.moveBall();
        if (this.mode === GameMode.OBJECT) {
          this.obstacles.forEach((obstacle) => {
            obstacle.areaBounds = this.boardCoord;
            obstacle.initPosition();
            obstacle.show();
          });
          if (this.obstacles.length === 0) {
            for (let i = 0; i < this.numObstacle; i++) {
              const obstacle = new Obstacle(this.board, this.boardCoord);
              this.obstacles.push(obstacle);
            }
          } else {
            this.obstacles.forEach((obstacle) => {
              obstacle.move();
            });
          }
        }
      }
    };

    document.addEventListener('keydown', this.keyEnterHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('resize', this.resize);
    window.addEventListener('resize', this.pause);
    document.addEventListener('keydown', this.resume);
  }

  initGameState() {
    this.state = GameState.READY;
    this.message.innerHTML = 'Press Enter to Play Pong';
  }

  startGame() {
    this.movePaddles();
    this.gameStart();
  }

  gameStart() {
    this.state = GameState.PLAY;
    this.message.innerHTML = 'Game Started';
    this.player1.updateScoreHtml();
    this.player2.updateScoreHtml();
    if (this.mode === GameMode.OBJECT && this.obstacles.length === 0) {
      for (let i = 0; i < this.numObstacle; i++) {
        const obstacle = new Obstacle(this.board, this.boardCoord);
        this.obstacles.push(obstacle);
      }
    }
    this.moveBall();
  }

  movePaddles() {
    if (this.player1.isMovingUp) this.player1.moveUp(this.boardCoord);
    if (this.player1.isMovingDown) this.player1.moveDown(this.boardCoord);
    if (this.player2.isMovingUp) this.player2.moveUp(this.boardCoord);
    if (this.player2.isMovingDown) this.player2.moveDown(this.boardCoord);
    if (this.state === GameState.READY || GameState.PLAY)
      this.paddleFrame = requestAnimationFrame(this.movePaddles.bind(this));
  }

  getRandomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  moveBall() {
    let dy = 0;
    let dx = this.getRandomDirection() * this.ball.speed;
    this.ball.move(dy, dx, this);
  }

  async fetchGameResults() {
    try {
      const accessToken = getCookie("accessToken"); // 'access_token'은 쿠키에서 사용하는 토// 큰의 이름입니다.
      let winner = userState.getState().userEmail;
      let loser = null;
      // winner = 'jwee@stude321seoul.kr';
      if (this.winner === this.player2.playerName) {
        const temp = winner;
        winner = loser;
        loser = temp;
      }
      const response = await fetch('http://localhost:8000/api/games/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          winner: winner,
          loser: loser,
          game_mode: this.mode,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      return data.gameId; // JSON 결과에서 gameId 반환
    } catch (error) {
      // console.error('Fetching error:', error);
      return null; // 오류 발생 시 null 반환
    }
  }

  async updatePlayersScore() {
    if (this.ball.leftOut(this.boardCoord)) {
      this.player2.updateScore();
    } else if (this.ball.rightOut(this.boardCoord)) {
      this.player1.updateScore();
    }
    // this.ball.hide();
    this.ball.init();
    this.ball.updateStyle(
      this.boardCoord.height / 2 - this.ball.coord.height / 2,
      this.boardCoord.width / 2 - this.ball.coord.width / 2
    );
    setTimeout(async () => {
      if (
        this.player1.score >= this.scoreToWin ||
        this.player2.score >= this.scoreToWin
      ) {
        this.winner =
          this.player1.score >= this.scoreToWin
            ? this.player1.playerName
            : this.player2.playerName;
        if (this.mode === GameMode.OBJECT) {
          this.removeAllObstacles();
        }
        // this.player1.resetPosition();
        // this.player2.resetPosition();
        // this.ball.updateStyle(
        //   this.ball.initialCoord.top,
        //   this.ball.initialCoord.left
        // );
        this.message.innerHTML = `${this.winner} Wins!`;
        this.state = GameState.END;
        console.log('game end');

        if (gameState.getState().gameType === 'classic') {
          let gameId;
          try {
            gameId = await this.fetchGameResults(); // await 키워드 사용
          } catch (error) {
            console.error('Error in fetchGameResults:', error);
          }

          const player1Info = {
            name: userState.getState().userName,
            image: userState.getState().userImage
          };
          const player2Info = {
            name: this.player2.playerName,
            image: '/assets/images/profile/default_profile.png'
          };

          let winner = player1Info; // 가정: player1이 승리한 경우
          let loser = player2Info;
          if (this.winner !== this.player1.playerName) {
            [winner, loser] = [loser, winner]; // 스왑
          }

          const scoreModalElement = createScoreModal({ winner, loser });
          document.body.appendChild(scoreModalElement); // 모달을 DOM에 추가
          const scoreModal = new bootstrap.Modal(scoreModalElement);
          scoreModal.show();

          document.getElementById('emailVerificationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // 폼의 기본 제출 동작을 취소
            sendVerificationEmail(gameId, patchGameResult);
          });

          document.getElementById('submit-verification-code-button').addEventListener('click', () => {
            submitVerificationCode(gameId);
          });
        }

        if (this.onGameEnd) {
          this.player1.initScore();
          this.player2.initScore();
          this.onGameEnd();
        }
        this.cleanUp();
      } else {
        // 목표 점수에 도달하지 않았다면 게임 재시작
        this.gameStart();
      }
    }, 0);
  }

  removeAllObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.remove());
    this.obstacles = []; // 장애물 배열도 비웁니다.
  }

  handlePopState() {
    this.cleanUp(); // 페이지 이동 시 클린업 작업 수행
  }

  cleanUp() {
    console.log('cleanUp()');
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null; // 타이머 ID 초기화
    }

    this.state = GameState.END;
    // Cancel any animation frames
    cancelAnimationFrame(this.paddleFrame);
    cancelAnimationFrame(this.ball.ballFrame);
    this.ball.init();

    // Remove key event listeners
    document.removeEventListener('keydown', this.keyEnterHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);

    // Remove resize event listener
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('resize', this.pause);

    // If any other custom event listeners were added, remove them here as well
  }

}

export function setGameCondition() {
  const currentGame = gameState.getState().currentGame;

  if (!currentGame) {
    return;
  }

  currentGame.cleanUp();
  gameState.setState({ currentGame: null });
  gameState.setState({ currentGameStatus: 'idle' });
}

export function getCookie(name) {
  let cookies = document.cookie; // 모든 쿠키를 가져옵니다.
  let cookieArr = cookies.split(';'); // 쿠키들을 ';'를 기준으로 나눕니다.

  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split('='); // 각 쿠키를 '=' 기준으로 키와 값을 나눕니다.
    if(name === cookiePair[0].trim()) {
      // 찾고자 하는 키의 쿠키가 있다면 값을 디코딩하여 반환합니다.
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null; // 해당하는 쿠키가 없다면 null을 반환합니다.
}
async function patchGameResult(email, gameId) {
  const accessToken = getCookie("accessToken"); // 쿠키에서 사용자 토큰 가져오기
  const url = `http://localhost:8000/api/games/result/${gameId}/`; // 게임 ID를 URL에 포함

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // 헤더에 토큰 포함
      },
      body: JSON.stringify({ player2: email }) // 이메일 데이터 포함
    });

    if (!response.ok) {
      // throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Game result updated successfully:', data);
    // 추가적인 성공 처리 로직 (예: 사용자에게 알림 표시)
  } catch (error) {
    // console.perror('Error updating game result:', error);
    // 오류 처리 로직 (예: 오류 메시지 표시)
  }
}

async function submitVerificationCode(gameId) {
  const email = document.getElementById('emailInput').value;
  const code = document.getElementById('codeInput').value;
  const emailModal = bootstrap.Modal.getInstance(document.getElementById('email2faModal')) || new bootstrap.Modal(document.getElementById('email2faModal'));
  const emailErrorDiv = document.getElementById('emailError');
  const codeErrorDiv = document.getElementById('codeError');

  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = 'Invalid email format';
    return;
  } else {
    emailErrorDiv.style.display = 'none';
  }

  const accessToken = getCookie("accessToken"); // 쿠키에서 사용자 토큰 가져오기
  const url = 'http://localhost:8000/api/account/verify-2fa/'; // 게임 ID를 URL에 포함

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ email: email, code: code, game_id: gameId })
  });
  try {

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Verification successful:', data);
    // 성공 처리, 예를 들어 모달 닫기나 사용자에게 성공 메시지 표시
    emailModal.hide();
  } catch (error) {
    // console.error('Error verifying code:', error);
    codeErrorDiv.style.display = 'block';
    codeErrorDiv.textContent = 'Verification failed. Please try again.';
    // 실패 처리, 예를 들어 오류 메시지 표시
  }
}
