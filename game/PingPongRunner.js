import PingPong from './PingPong.js';
import Tournament from './Tournament.js';

// normal, speed, object
// const gameMode = 'speed';
// const gameMode = 'speed';
const gameMode = 'object';

// const pongGame = new PingPong(gameMode, 'salee2', 'gychoi');
// pongGame.gameStart();

const playerNames = ['salee2', 'gychoi', 'jwee', 'junyo'];
const tournament = new Tournament(gameMode, playerNames);
tournament.play();
