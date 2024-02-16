import PingPong, { GameState } from './PingPong.js';

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
        this.semiFinalA.startGame();
      }
      if (this.semiFinalA.state === GameState.END) {
        this.finalist.push(this.semiFinalA.winner);
        this.stage = GameStage.SEMI_B;
        this.semiFinalA.initGameState();
        alert('semiA end');
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
        this.semiFinalB.startGame();
      }
      if (this.semiFinalB.state === GameState.END) {
        this.finalist.push(this.semiFinalB.winner);
        this.stage = GameStage.FINAL;
        this.semiFinalB.initGameState();
        alert('semiB end');
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
        this.final.startGame();
      }
      if (this.final.state === 'end') {
        alert('final end');
      }
    }
  }
}
