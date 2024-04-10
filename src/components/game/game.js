import { gameState } from '../../../lib/state/state.js';
import applyLanguageClassicSetting from '../language/applyLanguageClassicSetting.js';
import { getAccessToken } from '../../utils/token.js';
import { GAME_API_URL } from '../../utils/api.js';

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

  const currentTime = formatCurrentTime();

  const elementsToUpdate = {
    'classic-winner-name': gameResult.winner.name,
    'classic-loser-name': gameResult.loser.name,
    'classic-winner-image': gameResult.winner.image,
    'classic-loser-image': gameResult.loser.image,
    'win-time': currentTime, // 승자 시간 업데이트
    'lose-time': currentTime // 패자 시간 업데이트
  };

  for (const [id, value] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      if (id.includes('image')) {
        element.src = value;
      } else {
        element.textContent = value;
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

async function sendEmailCode() {
  const emailInput = document.getElementById('emailInput');
  const emailErrorDiv = document.getElementById('emailError');
  const countdownTimerDiv = document.querySelector('.countdown-timer');
  const email = emailInput.value;

  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = i18next.t('invalidEmailFormat');
    return;
  }

  emailErrorDiv.style.display = 'none';

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${GAME_API_URL}/api/games/request-2fa/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email: email }),
    });

    if (response.ok) {
      startCountdown(5 * 60, countdownTimerDiv);
    }
  } catch (error) {
    emailErrorDiv.textContent = error.message;
    emailErrorDiv.style.display = 'block';
  }
}

let countdownInterval;
// 카운트다운 함수
function startCountdown(duration, display) {
  // 이전 타이머가 있다면 중지
  if (countdownInterval) {
    clearInterval(countdownInterval);
    display.style.display = 'none';
  }
  // 새 타이머 시작
  let timer = duration;
  display.style.display = 'block'; // 타이머 보이기
  updateCountdownDisplay(timer, display);

  countdownInterval = setInterval(function () {
    timer -= 1;
    updateCountdownDisplay(timer, display);

    if (timer <= 0) {
      clearInterval(countdownInterval);
      display.style.display = 'none'; // 타이머 숨김
    }
  }, 1000);
}

function updateCountdownDisplay(timer, display) {
  const minutes = parseInt(timer / 60, 10);
  const seconds = parseInt(timer % 60, 10);

  display.textContent =
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds);
}