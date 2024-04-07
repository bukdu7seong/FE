import { gameState } from '../../lib/state/state.js';
import { getCookie } from '../utils/cookie.js';
import { sidebar } from '../components/common/sidebar.js';
import { routes } from '../../lib/router/router.js';
import { ACCOUNT_API_URL } from '../utils/api.js';
import {
  formatCurrentTime,
  initializeGameResultData,
  setupGameSettingModal,
} from '../components/game/game.js';

export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const navbar = sidebar(routes);

  const content = `
        <div class="main-box">
          <div class="user-box"></div>
          <div class="game-box" id='game'>
            <p class="header-pong" id='pong'>PONG</p>
            <p class="header-classic" id='classic'>CLASSIC</p>
            <div class="player-container">
              <div class="player-option" id="player1">PLAYER 1</div>
              <div class="divider"></div>
              <div class="player-option" id="player2">PLAYER 2</div>
            </div>
          </div>
        </div>
      `;

  const winner = {
    name: 'Player 1',
    image: 'path_to_winner_image',
  };
  const loser = {
    name: 'Player 2',
    image: 'path_to_loser_image',
  };
  page.innerHTML = content;
  page.appendChild(navbar);
  page.appendChild(createScoreModal(initializeGameResultData()));
  page.appendChild(createGameSettingModal());
  page.appendChild(createScoreModal({ winner, loser }));
  page.appendChild(createEmail2faModal());
  setupGameSettingModal(page);
  return page;
}

function createGameSettingModal() {
  // 게임 설정 모달의 HTML 구성을 반환
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
     <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#gameSettingModal"></button>
<div class="modal fade" id="gameSettingModal" tabindex="-1" aria-labelledby="gameSettingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h2 class="modal-title" id="gameSettingModalLabel">Game Setting</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-white">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-4">
                            <label for="player-name" class="form-label" id='player2-label'>Player 2</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-dark text-white" id="player-name"
                                   placeholder="Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="form-label d-block" id='mode'>Mode</label>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="normal" checked>
                                <label class="form-check-label" for="normal" id='normal-label'>
                                    Normal Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="speed">
                                <label class="form-check-label" for="speed" id='speed-label'>
                                    Speed Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="object">
                                <label class="form-check-label" for="object" id='object-label'>
                                    Object Mode
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0">
      <button type="button" id="startGameButton" class="btn btn-md btn-success w-100">START</button>
            </div>
        </div>
    </div>
</div>
  `;
  return modalContainer;
}

export function pageBoard() {
  const page = document.createElement('div');
  page.setAttribute('class', 'board');
  // page.appendChild(createScoreModal());
  page.appendChild(createEmail2faModal());

  const content = `
      <div class="ball">
        <div class="ball_effect"></div>
      </div>
      <div class="paddle paddle_1"></div>
      <div class="paddle paddle_2"></div>
      <div class="player_1_score">0</div>
      <div class="player_2_score">0</div>
      <div class="message">Press Enter to Play Pong</div>
    `;
  page.innerHTML = content;

  function loadScript() {
    let script = document.createElement('script');
    script.src = 'src/components/common/sendVerificationEmail.js'; // 스크립트 파일 경로
    document.body.appendChild(script); // <head>에 스크립트 추가
  }

  loadScript(); // 스크립트 로드 함수 호출
  return page;
}

async function verifyCodeWithServer(code) {
  try {
    const response = await fetch('YOUR_SERVER_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    if (!response.ok) {
      throw new Error('Server response was not ok.');
    }

    const data = await response.json();
    // 검증 결과에 따라 추가 작업 수행
    // 예: 사용자에게 성공 또는 실패 메시지 표시
  } catch (error) {
    console.error('Error verifying code:', error);
    // 오류 처리
  }
}

export function createScoreModal() {
  const currentTime = formatCurrentTime(); // 현재 시간 포맷팅

  const scoreModal = document.createElement('div');
  scoreModal.className = 'modal fade';
  scoreModal.id = 'scoreModal';
  scoreModal.tabIndex = -1;
  scoreModal.setAttribute('aria-labelledby', 'scoreModalLabel');
  scoreModal.setAttribute('aria-hidden', 'true');
  scoreModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
            <div class="modal-header border-0">
                <h1 class="modal-title fs-1 w-100 text-center" id="scoreModalLabel">SCORE</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="scoreModalCloseButton" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <!-- Winner section -->
                <div class="winner-loser mb-3 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-success rounded-pill px-3 me-2" id='win-label'>WIN</span>
                    <img src="winner-image-placeholder" class="rounded-circle me-2" id="classic-winner-image" alt="Winner" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1" id="classic-winner-name">Winner Name</span>
                    <span class="time-score rounded-pill bg-secondary px-3" id="win-time">${currentTime}</span>
                </div>
                <!-- Loser section -->
                <div class="winner-loser mb-4 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-secondary rounded-pill px-3 me-2" id='lose-label'>LOSE</span>
                    <img src="loser-image-placeholder" class="rounded-circle me-2" id="classic-loser-image" alt="Loser" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1" id="classic-loser-name">Loser Name</span>
                    <span class="time-score rounded-pill bg-secondary px-3" id="lose-time">${currentTime}</span>
                </div>
            </div>

            <div class="modal-footer border-0">
                <button type="button" class="btn btn-lg btn-success w-100 mb-2 rounded-pill" data-bs-target="#email2faModal" data-bs-toggle="modal" id='save-score'>SAVE SCORE</button>
            </div>
      </div>
    </div>`;
  return scoreModal;
}

export async function sendEmailCode() {
  const emailInput = document.getElementById('emailInput');
  const emailErrorDiv = document.getElementById('emailError');
  const email = emailInput.value;

  // 이메일 유효성 검사
  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = i18next.t('invalidEmailFormat');
    return;
  }

  emailErrorDiv.style.display = 'none';

  try {
    const accessToken = getCookie('accessToken'); // 'access_token'은 쿠키에서 사용하는 토// 큰의 이름입니다.
    const response = await fetch(
      `${ACCOUNT_API_URL}/api/account/request-2fa/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email: email }),
      }
    );

    if (!response.ok) {
      // throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    // 서버 응답에 따른 추가 처리, 예를 들어 성공 메시지 표시 등
    console.log('Email code sent successfully:', data);
  } catch (error) {
    // console.error('Error sending email code:', error);
    // 오류 처리, 예를 들어 사용자에게 오류 메시지 표시 등
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

function createEmail2faModal() {
  const email2faModal = document.createElement('div');

  email2faModal.className = 'modal fade';
  email2faModal.id = 'email2faModal';
  email2faModal.tabIndex = -1;
  email2faModal.setAttribute('aria-labelledby', 'email2faModalLabel');
  email2faModal.setAttribute('aria-hidden', 'true');
  email2faModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="email2faModalLabel">Email Verification</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="emailVerificationForm">
            <!-- Email address input -->
            <div class="mb-3">
              <label for="emailInput" class="form-label" id="emailAddressLabel">Email Address</label>
              <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
            </div>
            <div class="emailError text-danger mt-2" id='emailError' style="display: none;"></div>
            <div class="d-grid gap-2 mb-3">
              <button type="button" class="btn btn-primary" id='send-email-code-button'>Send Code</button>
            </div>
            <!-- Verification code input -->
            <div class="mb-3">
              <label for="codeInput" class="form-label" id="codeInputLabel">Verification Code</label>
              <input type="text" class="form-control" id="codeInput" required>
            </div>
            <div class="codeError text-danger mt-2" id='codeError' style="display: none;"></div>
            <div class="d-grid gap-2">
              <button type="button" class="btn btn-success" id='send-verification-code-button'>Verify and Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  const countdownTimerDiv = document.createElement('div');
  countdownTimerDiv.className = 'countdown-timer text-center my-2';
  countdownTimerDiv.style.display = 'none'; // 처음에는 숨김
  email2faModal.querySelector('.modal-body').appendChild(countdownTimerDiv);

  // 이메일 전송 버튼에 이벤트 리스너 추가
  const sendEmailButton = email2faModal.querySelector(
    '#send-email-code-button'
  );
  sendEmailButton.addEventListener('click', function () {
    if (isValidEmail(document.getElementById('emailInput').value)) {
      const countdownTimerDiv = email2faModal.querySelector('.countdown-timer');
      startCountdown(5 * 60, countdownTimerDiv);
    }
  });

  return email2faModal;
}
export function updateScoreModalContent() {
  document.getElementById('scoreModalLabel').innerHTML =
    i18next.t('scoreModalLabel');
  document.getElementById('win-label').innerHTML = i18next.t('win-label');
  document.getElementById('win-label').innerHTML = i18next.t('win-label');
  document.getElementById('lose-label').innerHTML = i18next.t('lose-label');
  document.getElementById('save-score').innerHTML = i18next.t('save-score');

  document.getElementById('email2faModalLabel').innerHTML =
    i18next.t('email2faModalLabel');
  document.getElementById('emailAddressLabel').innerHTML =
    i18next.t('emailAddressLabel');
  document.getElementById('emailInput').placeholder = i18next.t('emailInput');
  document.getElementById('send-email-code-button').innerHTML = i18next.t(
    'send-email-code-button'
  );
  document.getElementById('codeInputLabel').innerHTML =
    i18next.t('codeInputLabel');
  document.getElementById('send-verification-code-button').innerHTML =
    i18next.t('send-verification-code-button');
}

function formatCurrentTime() {
  const now = new Date();
  const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${month}/${day}, ${hours}:${minutes}`;
}

export function updateScoreModal(gameResult) {
  const winnerInfo = gameResult.winner;
  const loserInfo = gameResult.loser;

  const winnerNameElement = document.getElementById('classic-winner-name');
  const loserNameElement = document.getElementById('classic-loser-name');
  const winnerImageElement = document.getElementById('classic-winner-image');
  const loserImageElement = document.getElementById('classic-loser-image');

  winnerNameElement.textContent = winnerInfo.name;
  loserNameElement.textContent = loserInfo.name;
  winnerImageElement.src = winnerInfo.image;
  loserImageElement.src = loserInfo.image;
}
