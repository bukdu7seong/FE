import { gameState } from '../../../lib/state/state.js';
import { sendEmailCode } from '../../pages/game.js';
import applyLanguageClassicSetting from '../language/applyLanguageClassicSetting.js';

export function setupGameSettingModal(page) {
  let gameSettingModal = new bootstrap.Modal(
    page.querySelector('#gameSettingModal'),
    {
      keyboard: false,
    }
  );
  let startGameButton = page.querySelector('#startGameButton');
  let gameBox = page.querySelector('#game');

  // 게임 시작 버튼 이벤트
  startGameButton.addEventListener('click', function () {
    gameState.setState({ currentGameStatus: 'playing' });
    gameSettingModal.hide();
  });

  // Escape 키 이벤트
  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      gameState.getState().currentGameStatus === 'idle'
    ) {
      gameSettingModal.hide();
    }
  });

  // 게임 박스 클릭 이벤트
  gameBox.addEventListener('click', function () {
    if (gameState.getState().currentGameStatus === 'idle') {
      applyLanguageClassicSetting()
      gameSettingModal.show();
    }
  });

  const sendEmailButton = page.querySelector('#send-email-code-button');
  if (sendEmailButton) {
    sendEmailButton.addEventListener('click', sendEmailCode); //
  }
}


export function updateScoreModalResult(gameResult) {
  const elementsToUpdate = {
    'classic-winner-name': gameResult.winner.name,
    'classic-loser-name': gameResult.loser.name,
    'classic-winner-image': gameResult.winner.image,
    'classic-loser-image': gameResult.loser.image
  };

  for (const [id, value] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      if (id.includes('image')) {
        element.src = value; // 이미지 요소의 경우 src 속성 업데이트
      } else {
        element.textContent = value; // 텍스트 콘텐츠 업데이트
      }
    }
  }
}
export function initializeGameResultData() {
  return {
    winner: {
      name: 'Player 1',
      image: 'path_to_winner_image'
    },
    loser: {
      name: 'Player 2',
      image: 'path_to_loser_image'
    }
  };
}
export function formatCurrentTime() {
  const now = new Date();
  const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${month}/${day}, ${hours}:${minutes}`;
}
