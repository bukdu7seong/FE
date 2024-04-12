import DOMAIN from '../env.js';

const ENDPOINT = DOMAIN || 'localhost';

export const ACCOUNT_API_URL = `https://${ENDPOINT}`;
export const GAME_API_URL = `https://${ENDPOINT}`;
export const SOCKET_URL = `wss://${ENDPOINT}`;
