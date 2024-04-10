import Ball from './Ball.js';
import Player from './Player.js';
import Obstacle from './Obstacle.js';
import { gameState, userState } from '../../../lib/state/state.js';
import { GAME_API_URL } from '../../utils/api.js';
import {
  updateScoreModalResult,
} from './game.js';
import { getAccessToken } from '../../utils/token.js';
import applyLanguageClassicScoreModal from '../language/applyLanguageClassicScoreModal.js';

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
    this.scoreToWin = 7;
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
    const ballSpeed = this.mode === GameMode.SPEED ? 30 : 15;
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

      this.boardCoord = this.board.getBoundingClientRect();
      const boardCenterTop = this.boardCoord.height / 2 - this.ball.radius;
      const boardCenterLeft = this.boardCoord.width / 2 - this.ball.radius;

      this.ball.updateStyle(boardCenterTop, boardCenterLeft);
      const paddleHeight = 100;
      const paddleTopPosition = this.boardCoord.height / 2 - paddleHeight / 2;
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
  }

  startGame() {
    this.movePaddles();
    this.gameStart();
  }

  gameStart() {
    this.state = GameState.PLAY;
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
      const accessToken = await getAccessToken();
      const is_winner = this.player1.score >= this.scoreToWin;
      let win_score = this.player1.score;
      let lose_score = this.player2.score;
      if (!is_winner) {
        const temp = win_score;
        win_score = lose_score;
        lose_score = temp;
      }

      const response = await fetch(`${GAME_API_URL}/api/games/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          is_winner : is_winner,
          win_score : win_score,
          lose_score : lose_score,
          game_mode : this.mode
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      return data.gameId;
    } catch (error) {
      return null;
    }
  }

  determineGameResult() {
    const player1Info = {
      name: userState.getState().userName,
      image: userState.getState().userImage,
    };
    const player2Info = {
      name: this.player2.playerName,
      image: '/assets/images/profile/default_profile.png',
    };

    let winner = player1Info;
    let loser = player2Info;

    if (this.winner !== this.player1.playerName) {
      [winner, loser] = [loser, winner];
    }

    return { winner, loser };
  }
  async updatePlayersScore() {
    if (this.ball.leftOut(this.boardCoord)) {
      this.player2.updateScore();
    } else if (this.ball.rightOut(this.boardCoord)) {
      this.player1.updateScore();
    }
    this.ball.init();
    this.player1.resetPaddlePosition(this.boardCoord.height);
    this.player2.resetPaddlePosition(this.boardCoord.height);
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
        this.state = GameState.END;

        if (gameState.getState().gameType === 'classic') {
          let gameId;
          try {
            gameId = await this.fetchGameResults();
          } catch (error) {
            console.error('Error in fetchGameResults:', error);
          }

          updateScoreModalResult(this.determineGameResult());
          const scoreModalElement = document.getElementById('scoreModal');
          if (scoreModalElement) {
            const scoreModal = new bootstrap.Modal(scoreModalElement);
            applyLanguageClassicScoreModal();
            scoreModal.show();
          }

          document
            .getElementById('send-verification-code-button')
            .addEventListener('click', () => {
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
        this.gameStart();
      }
    }, 0);
  }

  removeAllObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.remove());
    this.obstacles = [];
  }

  handlePopState() {
    this.cleanUp();
  }

  cleanUp() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.state = GameState.END;

    cancelAnimationFrame(this.paddleFrame);
    cancelAnimationFrame(this.ball.ballFrame);
    this.ball.init();

    document.removeEventListener('keydown', this.keyEnterHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);

    window.removeEventListener('resize', this.resize);
    window.removeEventListener('resize', this.pause);
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

async function submitVerificationCode(gameId) {
  const email = document.getElementById('emailInput').value;
  const code = document.getElementById('codeInput').value;
  const emailModal =
    bootstrap.Modal.getInstance(document.getElementById('email2faModal')) ||
    new bootstrap.Modal(document.getElementById('email2faModal'));
  const emailErrorDiv = document.getElementById('emailError');
  const codeErrorDiv = document.getElementById('codeError');

  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = i18next.t('invalidEmailFormat');
    return;
  } else {
    emailErrorDiv.style.display = 'none';
  }

  const accessToken = await getAccessToken();
  const url = `${GAME_API_URL}/api/games/verify-2fa/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email: email, code: code, game_id: gameId }),
  });
  try {
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Verification successful:', data);
    emailModal.hide();
  } catch (error) {
    codeErrorDiv.style.display = 'block';
    codeErrorDiv.textContent = i18next.t('verificationFailed');
  }
}
