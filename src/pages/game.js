import {
  formatCurrentTime,
  setupGameSettingModal,
} from '../components/game/game.js';

export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');

  page.innerHTML = `
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
          <div id="mainNavbar"></div>
        </div>
      `;
  page.appendChild(createGameSettingModal());
  page.appendChild(createScoreModal());
  page.appendChild(createEmail2faModal());
  setupGameSettingModal(page);
  return page;
}

function createGameSettingModal() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
     <button type="button" class="btn gameSettingModal" data-bs-toggle="modal" data-bs-target="#gameSettingModal"></button>
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
                            <input type="text" class="form-control bg-dark text-white" id="player-name" required maxlength="10"
                                   placeholder="Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <span class="form-label d-block" id='mode'>Mode</span>
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

  page.innerHTML = `
      <div class="ball">
        <div class="ball_effect"></div>
      </div>
      <div class="paddle paddle_1"></div>
      <div class="paddle paddle_2"></div>
      <div class="player_1_score">0</div>
      <div class="player_2_score">0</div>
    `;

  function loadScript() {
    let script = document.createElement('script');
    script.src = 'src/components/common/isValidEmail.js';
    document.body.appendChild(script);
  }
  loadScript();

  return page;
}

export function createScoreModal() {
  const currentTime = formatCurrentTime();

  const scoreModal = document.createElement('div');
  scoreModal.innerHTML = `
    <div class="modal fade" id="scoreModal" tabindex="-1" aria-labelledby="scoreModalLabel" aria-hidden="true">
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
              <img src="assets/images/profile/default.png" class="rounded-circle me-2" id="classic-winner-image" alt="Winner" style="width: 50px; height: 50px;">
              <span class="fw-bold flex-grow-1" id="classic-winner-name">Winner Name</span>
              <span class="time-score rounded-pill bg-secondary px-3" id="win-time">${currentTime}</span>
            </div>
            <!-- Loser section -->
            <div class="winner-loser mb-4 p-2 rounded d-flex align-items-center justify-content-between">
              <span class="badge bg-secondary rounded-pill px-3 me-2" id='lose-label'>LOSE</span>
              <img src="assets/images/profile/default.png" class="rounded-circle me-2" id="classic-loser-image" alt="Loser" style="width: 50px; height: 50px;">
              <span class="fw-bold flex-grow-1" id="classic-loser-name">Loser Name</span>
              <span class="time-score rounded-pill bg-secondary px-3" id="lose-time">${currentTime}</span>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-lg btn-success w-100 mb-2 rounded-pill" data-bs-target="#email2faModal" data-bs-toggle="modal" id='save-score'>SAVE SCORE</button>
          </div>
        </div>
      </div>
    </div>`;

  return scoreModal;
}

function createEmail2faModal() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <div class="modal fade" id="email2faModal" tabindex="-1" aria-labelledby="email2faModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-dark" id='send-email-code-button'>Send Code</button>
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
      </div>
    </div>`;

  const countdownTimerDiv = document.createElement('div');
  countdownTimerDiv.className = 'countdown-timer text-center my-2';
  countdownTimerDiv.style.display = 'none';
  modalContainer.querySelector('.modal-body').appendChild(countdownTimerDiv);

  return modalContainer;
}
