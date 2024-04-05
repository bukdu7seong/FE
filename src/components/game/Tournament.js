import PingPong, { GameState } from './PingPong.js';
import { gameState } from '../../../lib/state/state.js';
import { updateTournamentRoundModalContent, updateTournamentWinnerModal } from '../../pages/tournament.js';

const GameStage = {
  SEMI_A: 1,
  SEMI_B: 2,
  FINAL: 3,
};

export default class Tournament {
  constructor(mode, playerNames) {
    this.mode = mode;
    this.playerNames = playerNames;
    this.finalist = [];
    this.stage = GameStage.SEMI_A;
    this.semiFinalA = null;
    this.semiFinalB = null;
    this.final = null;
  }

  startTournament() {
    this.tournamentStart();
  }

  tournamentStart() {
    if (this.stage === GameStage.SEMI_A) {
      if (!this.semiFinalA) {
        this.semiFinalA = new PingPong(
          this.mode,
          this.playerNames[0],
          this.playerNames[1]
        );
        this.semiFinalA.onGameEnd = () => this.tournamentStart();

        gameState.setState({ currentGame: this.semiFinalA  }, false);
        gameState.setState({ gameType: 'semi_a' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);
        // 라운드1에 대한 정보로 모달 표시
        showTournamentRoundModal(this.semiFinalA,1, this.playerNames[0], this.playerNames[1]);
      }
      if (this.semiFinalA.state === GameState.END) {
        this.finalist.push(this.semiFinalA.winner);
        this.stage = GameStage.SEMI_B;
        this.semiFinalA.initGameState();
      }
    }
    if (this.stage === GameStage.SEMI_B) {
      if (!this.semiFinalB) {
        this.semiFinalB = new PingPong(
          this.mode,
          this.playerNames[2],
          this.playerNames[3]
        );
        this.semiFinalB.onGameEnd = () => this.tournamentStart();

        gameState.setState({ currentGame: this.semiFinalB  }, false);
        gameState.setState({ gameType: 'semi_b' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);
        // 라운드2에 대한 정보로 모달 표시
        showTournamentRoundModal(this.semiFinalB, 2, this.playerNames[2], this.playerNames[3]);
      }
      if (this.semiFinalB.state === GameState.END) {
        this.finalist.push(this.semiFinalB.winner);
        this.stage = GameStage.FINAL;
        this.semiFinalB.initGameState();
      }
    }
    if (this.stage === GameStage.FINAL) {
      if (!this.final) {
        this.final = new PingPong(
          this.mode,
          this.finalist[0],
          this.finalist[1]
        );
        this.final.onGameEnd = () => this.tournamentStart();
        // 라운드3에 대한 정보로 모달 표시

        gameState.setState({ currentGame: this.final  }, false);
        gameState.setState({ gameType: 'final' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);
        showTournamentRoundModal(this.final,3, this.finalist[0], this.finalist[1]);
      }
      if (this.final.state === 'end') {
        const tournamentWinnerModalElement = document.getElementById('tournamentWinnerModal');
        console.log(this.final.winner);
        document.getElementById('winner-name').value = this.final.winner;
        if (tournamentWinnerModalElement) {
          const scoreModal = new bootstrap.Modal(tournamentWinnerModalElement);
          updateTournamentWinnerModal();
          scoreModal.show();
        }
      }
    }
  }
}

function showTournamentRoundModal(pingpong, round, player1, player2) {
  // 라운드 정보 업데이트
  document.getElementById('tournamentRoundModalLabel').textContent = 'TOURNAMENT ROUND ' + round;

  // 플레이어 이름 업데이트
  document.getElementById('round-player1-name').value = player1;
  document.getElementById('round-player2-name').value = player2;

  // 모달 생성
  const tournamentRoundModal = new bootstrap.Modal(document.getElementById('tournamentRoundModal'), {
    backdrop: 'static', // 모달 바깥을 클릭해도 닫히지 않게 함
    keyboard: false // Escape 키를 눌러도 닫히지 않게 함
  });

  // 시작 버튼에 이벤트 리스너 추가
  const startRoundButton = document.getElementById('startRoundButton');
  // 기존에 등록된 이벤트 리스너가 있다면 제거
  startRoundButton.removeEventListener('click', startRoundButton.handler);
  // 새 이벤트 리스너 정의
  startRoundButton.handler = function() {
    pingpong.startGame(); // 게임 시작
    tournamentRoundModal.hide(); // 모달 숨김
  };
  // 새 이벤트 리스너 등록
  startRoundButton.addEventListener('click', startRoundButton.handler);

  // 모달 표시
  updateTournamentRoundModalContent(round);
  tournamentRoundModal.show();
}

