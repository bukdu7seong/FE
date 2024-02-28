import Ball from './Ball.js';
import Player from './Player.js';
import Obstacle from './Obstacle.js';

const KEY_CODES = {
  MOVE_UP_PLAYER1: 'KeyW',
  MOVE_DOWN_PLAYER1: 'KeyS',
  MOVE_UP_PLAYER2: 'ArrowUp',
  MOVE_DOWN_PLAYER2: 'ArrowDown'
};

const GameMode = {
  NORMAL: 'normal',
  SPEED: 'speed',
  OBJECT: 'object'
};

export const GameState = {
  READY: 'ready' || '',
  PLAY: 'play',
  END: 'end',
  OVER: 'over',
  PAUSED: 'paused'
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
      if (e.code === 'Enter' && this.state === GameState.READY) {
        this.gameStart();
      }
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
      this.ball.initialCoord = this.ball.getCoord();

      this.boardCoord = this.board.getBoundingClientRect();
      const boardCenterTop = this.boardCoord.height / 2 - this.ball.radius;
      const boardCenterLeft = this.boardCoord.width / 2 - this.ball.radius;

      // 보드 내에서 볼의 위치를 업데이트
      this.ball.updateStyle(boardCenterTop, boardCenterLeft);
      // 패들의 높이를 계산 (예시: 패들의 높이가 100px라고 가정)
      const paddleHeight = 100;  // 실제 패들의 높이에 맞게 조정 필요
      // 보드 중앙에 패들을 위치시키기 위한 top 값 계산
      const paddleTopPosition = (this.boardCoord.height / 2) - (paddleHeight / 2);
      // 패들 위치 업데이트
      this.player1.paddle.style.top = `${paddleTopPosition}px`;
      this.player2.paddle.style.top = `${paddleTopPosition}px`;
    };

    this.pause = () => {
      this.state = GameState.PAUSED;
      cancelAnimationFrame(this.paddleFrame);
      cancelAnimationFrame(this.ball.ballFrame);
      this.obstacles.forEach(obstacle => {
        if (obstacle.animationFrameId) {
          cancelAnimationFrame(obstacle.animationFrameId);
        }
      });
      this.obstacles.forEach(obstacle => obstacle.hide());
    };

    this.resume = (e) => {
      if (e.code === 'Enter' && this.state === GameState.PAUSED) {
        this.state = GameState.PLAY;
        this.movePaddles();
        this.moveBall();
        if (this.mode === GameMode.OBJECT) {
          this.obstacles.forEach(obstacle => {
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
            this.obstacles.forEach(obstacle => {
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
  }

  gameStart() {
    this.state = GameState.PLAY;
    this.message.innerHTML = 'Game Started';
    this.obstacles = [];
    this.player1.updateScoreHtml();
    this.player2.updateScoreHtml();
    if (this.mode === GameMode.OBJECT) {
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
      const response = await fetch('http://localhost:8000/api/games/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5MTA4NjI5LCJpYXQiOjE3MDkxMDY4MjksImp0aSI6ImE0ZjYyNDYwN2Y2OTQyMGZhZWNiNWFlODMyYjRlOGY5IiwidXNlcl9pZCI6MX0.6IDmPXI5eUTvsp6DzxJhe-_0rF8d3_BjTX2l4DaDsnY',
        },
        body: JSON.stringify({
          'winner': 'jwee@student.42seoul.kr',
          'game_mode': this.mode
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      return data.gameId; // JSON 결과에서 gameId 반환
    } catch (error) {
      console.error('Fetching error:', error);
      return null; // 오류 발생 시 null 반환
    }
  }

  async updatePlayersScore() {
    // if (this.state !== GameState.PLAY) {
    //   return
    // }
    if (this.ball.leftOut(this.boardCoord)) {
      this.player2.updateScore();
    } else if (this.ball.rightOut(this.boardCoord)) {
      this.player1.updateScore();
    }
    // this.state = GameState.READY;

    // 왜 init만으로 안될까?
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

        const scoreModalElement = document.getElementById('scoreModal');
        const scoreModal = new bootstrap.Modal(scoreModalElement);
        scoreModal.show();

        let gameId;
        try {
          gameId = await this.fetchGameResults(); // await 키워드 사용
        } catch (error) {
          console.error('Error in fetchGameResults:', error);
        }

        console.log('here: ', gameId);


        if (this.onGameEnd) {
          this.player1.initScore();
          this.player2.initScore();
          this.onGameEnd();
        }
        this.cleanUp();
      } else {
        // 목표 점수에 도달하지 않았다면 게임 재시작
        this.moveBall();
      }
    }, 0);
  }

  removeAllObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.remove());
    this.obstacles = []; // 장애물 배열도 비웁니다.
  }

  cleanUp() {
    cancelAnimationFrame(this.paddleFrame);
    cancelAnimationFrame(this.ball.ballFrame);

    document.removeEventListener('keydown', this.keyEnterHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }
}
