import PingPong from './PingPong.js';

export default class Tournament {
  constructor(mode, players) {

    this.mode = mode;
    this.players = players;
    this.finalist = [];
    this.stage = 'semi1';
  }

  play() {
    if (this.stage === 'semi1') {
      if (!this.semiFinal1) {
        this.semiFinal1 = new PingPong(this.mode, this.players[0], this.players[1]);
        this.semiFinal1.onGameEnd = () => this.play();
        this.semiFinal1.gameStart();
      }
      if (this.semiFinal1.gameState === 'end') {
        this.finalist.push(this.semiFinal1.winner);
        this.semiFinal1.ball.init();
        delete this.semiFinal1;
        this.stage = 'semi2';
        alert('sem1 end');
      }
    }
    if (this.stage === 'semi2') {
      if (!this.semiFinal2) {
        this.semiFinal2 = new PingPong(this.mode, this.players[2], this.players[3]);
        this.semiFinal2.player1.updateScore();
        this.semiFinal2.player2.updateScore();
        this.semiFinal2.onGameEnd = () => this.play();
        this.semiFinal2.gameStart();
      }
      if (this.semiFinal2.gameState === 'end') {
        this.finalist.push(this.semiFinal2.winner);
        delete this.semiFinal2;
        this.stage = 'final';
        alert('sem2 end');
      }
      if (this.stage === 'final') {
        if (!this.final) {
          this.final = new PingPong(this.mode, this.finalist[0], this.finalist[1]);
          this.final.onGameEnd = () => this.play();
          alert('final start');
        }
        if (this.final.gameState === 'ready') {
          this.final.player1.updateScore();
          this.final.player2.updateScore();
          this.final.gameStart();
        }
        if (this.final.gameState === 'end') {
          alert('finish!');
        }
      }
    }
  }
}