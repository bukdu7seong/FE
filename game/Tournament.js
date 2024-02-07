import PingPong from './PingPong.js';

export default class Tournament {
  constructor(mode, players) {
    this.semiFinal1 = new PingPong(mode, players[0], players[1]);
    this.semiFinal1.onGameEnd = () => this.play();
    this.semiFinal2 = new PingPong(mode, players[2], players[3])
    this.semiFinal2.onGameEnd = () => this.play();
    this.finalist = [];
    this.stage = 'semi1';
  }

  play() {
    if (this.stage === 'semi1') {
      if (this.semiFinal1.gameState === 'ready') {
        this.semiFinal1.gameStart();
      }
      if (this.semiFinal1.gameState === 'end') {
        this.finalist.push(this.semiFinal1.winner);
        delete this.semiFinal1;
        this.stage = 'semi2';
        console.log(this.finalist[0]);
        alert('sem1 end');
      }
    }
    if (this.stage === 'semi2') {
      if (this.semiFinal2.gameState === 'ready') {
        this.semiFinal2.player1.updateScore();
        this.semiFinal2.player2.updateScore();
        this.semiFinal2.gameStart();
      }
      if (this.semiFinal2.gameState === 'end') {
        this.finalist.push(this.semiFinal2.winner);
        delete this.semiFinal2;
        this.stage = 'final';
        console.log(this.finalist[1]);
        alert('sem1 end');
      }
    }
    if (this.stage === 'final' && !this.final) {
      this.final = new PingPong('normal', this.finalist[0], this.finalist[1]);
      console.log(this.final);
      this.final.onGameEnd = () => this.play();
      if (this.final.gameState === 'ready') {
        console.log(this.final);
        alert('final start');
        this.final.gameStart();
      }
    }
  }
};