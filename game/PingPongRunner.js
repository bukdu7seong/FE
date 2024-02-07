import PingPong from './PingPong.js';
import Tournament from './Tournament.js';

// const gameMode = 'speed';
const gameMode = 'speed';

const pongGame = new PingPong(gameMode, 'salee2', 'gychoi');

// pongGame.gameStart();

const players = ['salee2', 'gychoi', 'jwee', 'junyo'];
const tournament = new Tournament(gameMode, players);
tournament.play();
