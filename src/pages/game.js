import { gameState } from '../../lib/state/state.js';

export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
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

          </div>
          
        </div>
      `;
  page.innerHTML = content;

  // 이벤트 리스너 제거는 SPA 페이지 전환시 필요한 경우에만 구현합니다.
  // function removeGameBoxListener() {
  //   gameBox.removeEventListener('click', function() {
  //     gameSettingModal.show();
  //   });
  // }


//   gameState.setState({ currentGameStatus: 'idle' });
//   let gameBox = page.querySelector('#game');
//   let gameSettingModal = new bootstrap.Modal(page.querySelector('#gameSettingModal'), {
//     keyboard: false
//   });
//   let startGameButton = page.querySelector('#startGameButton');
//
//   startGameButton.addEventListener('click', function() {
//     gameState.setState({ currentGameStatus: 'playing' }); // 게임 상태를 'playing'으로 변경
//     gameSettingModal.hide(); // 모달을 숨깁니다.
//   });
//
//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'Escape') {
//       // 'Escape' 키가 눌렸을 때의 조건
//       if (gameState.getState().currentGameStatus === 'idle') {
//         gameSettingModal.hide(); // 모달을 숨깁니다.
//       }
//     }
//   });
//
// // game-box 클릭 이벤트
//   gameBox.addEventListener('click', function() {
//     if (gameState.getState().currentGameStatus === 'idle') {
//       gameSettingModal.show(); // 게임 상태가 'idle'일 때만 모달을 표시합니다.
//     }
//   });

  // page.appendChild(createScoreModal());
  page.appendChild(createEmail2faModal());
  initGameEvents(page);
  return page;
}

export function initGameEvents(page) {
  let gameSettingModal = new bootstrap.Modal(page.querySelector('#gameSettingModal'), {
    keyboard: false
  });
  let startGameButton = page.querySelector('#startGameButton');
  let gameBox = page.querySelector('#game');

  // 게임 시작 버튼 이벤트
  startGameButton.addEventListener('click', function() {
    gameState.setState({ currentGameStatus: 'playing' });
    gameSettingModal.hide();
  });

  // Escape 키 이벤트
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && gameState.getState().currentGameStatus === 'idle') {
      gameSettingModal.hide();
    }
  });

  // 게임 박스 클릭 이벤트
  gameBox.addEventListener('click', function() {
    if (gameState.getState().currentGameStatus === 'idle') {
      updateGameSettingModalContent();
      gameSettingModal.show();
    }
  });

}

export function updateGameBoxContent() {
  document.getElementById("pong").innerHTML = i18next.t("pong");
  document.getElementById('classic').innerHTML = i18next.t('classic');
  document.getElementById('player1').innerHTML = i18next.t('player1');
  document.getElementById('player2').innerHTML = i18next.t('player2');
}

function updateGameSettingModalContent() {
  document.getElementById("gameSettingModalLabel").innerHTML = i18next.t("gameSettingModalLabel");
  document.getElementById('player2-label').innerHTML = i18next.t('player2-label');
  document.getElementById('player-name').placeholder = i18next.t('player-name');
  document.getElementById('mode').innerHTML = i18next.t('mode');
  document.getElementById('normal-label').innerHTML = i18next.t('normal-label');
  document.getElementById('speed-label').innerHTML = i18next.t('speed-label');
  document.getElementById('object-label').innerHTML = i18next.t('object-label');
  document.getElementById('startGameButton').innerHTML = i18next.t('startGameButton');
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
    script.src = 'src/pages/sendVerificationEmail.js'; // 스크립트 파일 경로
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


export function createScoreModal(gameResult) {
  if (!gameResult) {
    console.error('gameResult is undefined or null');
    return; // 함수를 빠져나가거나 적절한 처리를 합니다.
  }

  const currentTime = formatCurrentTime();
  const winnerName = gameResult.winner.name; // 승자의 닉네임
  const winnerImage = gameResult.winner.image; // 승자의 이미지
  const loserName = gameResult.loser.name; // 패자의 닉네임
  const loserImage = gameResult.loser.image; // 패자의 이미지

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
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <!-- Winner section -->
                <div class="winner-loser mb-3 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-success rounded-pill px-3 me-2" id='win-label'>WIN</span>
                    <img src="${winnerImage}" class="rounded-circle me-2" alt="${winnerName}" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1">${winnerName}</span>
                    <span class="time-score rounded-pill bg-secondary px-3">${currentTime}</span>
                </div>
                <!-- Loser section -->
                <div class="winner-loser mb-4 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-secondary rounded-pill px-3 me-2" id='lose-label'>LOSE</span>
                    <img src="${loserImage}" class="rounded-circle me-2" alt="${loserName}" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1">${loserName}</span>
                    <span class="time-score rounded-pill bg-secondary px-3">${currentTime}</span>
                </div>
            </div>

            <div class="modal-footer border-0">
                <button type="button" class="btn btn-lg btn-success w-100 mb-2 rounded-pill" data-bs-target="#email2faModal" data-bs-toggle="modal" id='save-score'>SAVE SCORE</button>
            </div>
      </div>
    </div>`;
  return scoreModal;
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
                        <label for="emailInput" class="form-label" id='email-input-label'>Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
                    </div>
<!--                    <div class="emailError text-danger mt-2" style="display: none;"></div> &lt;!&ndash; 에러 메시지 표시 영역 &ndash;&gt;-->
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary" onclick="sendVerificationEmail()" id='send-verification-code-button'>SAVE</button>
                    </div>
                </form>
            </div>
      </div>
    </div>`;
  return email2faModal;
}

export function updateScoreModalContent() {
  document.getElementById("scoreModalLabel").innerHTML = i18next.t("scoreModalLabel");
  document.getElementById("win-label").innerHTML = i18next.t("win-label");
  document.getElementById("lose-label").innerHTML = i18next.t("lose-label");
  document.getElementById("score-player2").innerHTML = i18next.t("score-player2");
  document.getElementById('save-score').innerHTML = i18next.t('save-score');

  document.getElementById('email2faModalLabel').innerHTML = i18next.t('email2faModalLabel');
  document.getElementById('email-input-label').innerHTML = i18next.t('email-input-label');
  document.getElementById('emailInput').placeholder = i18next.t('emailInput');
  document.getElementById('send-verification-code-button').innerHTML = i18next.t('send-verification-code-button');

}

function formatCurrentTime() {
  const now = new Date();
  const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${month}/${day}, ${hours}:${minutes}`;
}
