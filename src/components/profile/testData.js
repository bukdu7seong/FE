import { testImageBase64 } from './testB64Image.js';

export const testHistoryData = {
  page: 1,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  results: [
    {
      id: 2,
      player1: 'user1',
      player2: 'user2',
      winner: 'user1',
      loser: 'user2',
      player2_img: testImageBase64,
      game_mode: 'classic',
      played_at: '2023-04-01 12:00:00',
    },
    {
      id: 3,
      player1: 'user1',
      player2: 'user3',
      winner: 'user1',
      loser: 'user3',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 4,
      player1: 'user1',
      player2: 'user4',
      winner: 'user4',
      loser: 'user1',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 5,
      player1: 'user1',
      player2: 'user5',
      winner: 'user5',
      loser: 'user1',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 6,
      player1: 'user1',
      player2: 'user6',
      winner: 'user1',
      loser: 'user6',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
  ],
};

export const testHistoryData2 = {
  page: 2,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  results: [
    {
      id: 6,
      player1: 'user1',
      player2: 'user6',
      winner: 'user6',
      loser: 'user1',
      player2_img: testImageBase64,
      game_mode: 'classic',
      played_at: '2023-04-01 12:00:00',
    },
    {
      id: 3,
      player1: 'user1',
      player2: 'user3',
      winner: 'user1',
      loser: 'user3',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 2,
      player1: 'user1',
      player2: 'user2',
      winner: 'user2',
      loser: 'user1',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 5,
      player1: 'user1',
      player2: 'user5',
      winner: 'user5',
      loser: 'user1',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 4,
      player1: 'user1',
      player2: 'user4',
      winner: 'user1',
      loser: 'user4',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
  ],
};

export const testHistoryData3 = {
  page: 3,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  results: [
    {
      id: 3,
      player1: 'user1',
      player2: 'user3',
      winner: 'user1',
      loser: 'user3',
      player2_img: testImageBase64,
      game_mode: 'arcade',
      played_at: '2023-04-02 13:00:00',
    },
    {
      id: 5,
      player1: 'user1',
      player2: 'user5',
      winner: 'user5',
      loser: 'user1',
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

export const testFriendData2 = {
  page: 2,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  friends: [
    {
      id: 5,
      username: 'user5',
      user_img: testImageBase64,
      email: 'user5@example.com',
    },
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
      id: 6,
      username: 'user6',
      user_img: testImageBase64,
      email: 'user6@example.com',
    },
  ],
};

export const testFriendData3 = {
  page: 3,
  pageSize: 5,
  total: 12,
  totalPages: 3,
  friends: [
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
