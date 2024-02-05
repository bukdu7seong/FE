import PingPongGame from './PingPongGame.js';

// const gameMode = 'speed';
const gameMode = 'normal';

const pongGame = new PingPongGame(gameMode);
pongGame.gameStart();