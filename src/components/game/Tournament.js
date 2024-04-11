import PingPong, { GameState } from './PingPong.js';
import { gameState } from '../../../lib/state/state.js';
import applyLanguageTournamentRoundModal from '../language/applyLanguageTournamentRoundModal.js';
import applyLanguageTournamentWinnerModal from '../language/applyLanguageTournamentWinnerModal.js';

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

        gameState.setState({ currentGame: this.semiFinalA }, false);
        gameState.setState({ gameType: 'semi_a' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);

        showTournamentRoundModal(
          this.semiFinalA,
          1,
          this.playerNames[0],
          this.playerNames[1]
        );
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

        gameState.setState({ currentGame: this.semiFinalB }, false);
        gameState.setState({ gameType: 'semi_b' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);

        showTournamentRoundModal(
          this.semiFinalB,
          2,
          this.playerNames[2],
          this.playerNames[3]
        );
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

        gameState.setState({ currentGame: this.final }, false);
        gameState.setState({ gameType: 'final' }, false);
        gameState.setState({ currentGameStatus: 'start' }, false);
        showTournamentRoundModal(
          this.final,
          3,
          this.finalist[0],
          this.finalist[1]
        );
      }
      if (this.final.state === 'end') {
        const tournamentWinnerModalElement = document.getElementById(
          'tournamentWinnerModal'
        );
        document.getElementById('winner-name').value = this.final.winner;
        if (tournamentWinnerModalElement) {
          const scoreModal = new bootstrap.Modal(tournamentWinnerModalElement);
          applyLanguageTournamentWinnerModal();
          scoreModal.show();
        }
      }
    }
  }
}

function showTournamentRoundModal(pingpong, round, player1, player2) {
  document.getElementById('tournamentRoundModalLabel').textContent =
    'TOURNAMENT ROUND ' + round;

  document.getElementById('round-player1-name').value = player1;
  document.getElementById('round-player2-name').value = player2;

  const tournamentRoundModal = new bootstrap.Modal(
    document.getElementById('tournamentRoundModal'),
    {
      backdrop: 'static',
      keyboard: false,
    }
  );

  const startRoundButton = document.getElementById('startRoundButton');

  startRoundButton.removeEventListener('click', startRoundButton.handler);
  startRoundButton.handler = function () {
    pingpong.startGame();
    tournamentRoundModal.hide();
  };
  startRoundButton.addEventListener('click', startRoundButton.handler);

  applyLanguageTournamentRoundModal(round);
  tournamentRoundModal.show();
}
