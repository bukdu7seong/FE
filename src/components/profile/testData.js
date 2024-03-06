import { testImageBase64 } from './testB64Image.js';

export const testHistoryData = {
  count: 10,
  next: 'http://example.com/api/games/users/me/games/history?page=2',
  previous: null,
  results: [
    {
      id: 1,
      player1: 'user1',
      player2: 'user2',
      winner: 'user1',
      loser: 'user2',
      player2_img: testImageBase64,
      game_mode: 'classic',
      played_at: '2023-04-01 12:00:00',
    },
    {
      id: 2,
      player1: 'user1',
      player2: 'user3',
      winner: 'user1',
      loser: 'user3',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
  ],
};

export const testFriendData = {
  page: 1,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  friends: [
    {
      id: 2,
      username: 'user2',
      user_img: testImageBase64,
      email: 'user2@example.com',
    },
    {
      id: 3,
      username: 'user3',
      user_img: testImageBase64,
      email: 'user3@example.com',
    },
    {
      id: 4,
      username: 'user4',
      user_img: testImageBase64,
      email: 'user4@example.com',
    },
    {
      id: 5,
      username: 'user5',
      user_img: testImageBase64,
      email: 'user5@example.com',
    },
    {
      id: 6,
      username: 'user6',
      user_img: testImageBase64,
      email: 'user6@example.com',
    },
  ],
};

export const testRequestData = {
  page: 1,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  requests: [
    {
      id: 2,
      username: 'user2',
      user_img: testImageBase64,
      email: 'user2@example.com',
    },
    {
      id: 3,
      username: 'user3',
      user_img: testImageBase64,
      email: 'user3@example.com',
    },
    {
      id: 4,
      username: 'user4',
      user_img: testImageBase64,
      email: 'user4@example.com',
    },
    {
      id: 5,
      username: 'user5',
      user_img: testImageBase64,
      email: 'user5@example.com',
    },
    {
      id: 6,
      username: 'user6',
      user_img: testImageBase64,
      email: 'user6@example.com',
    },
  ],
};
