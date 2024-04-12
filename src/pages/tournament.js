import { gameState } from '../../lib/state/state.js';
import applyLanguageTournamentSettingModal from '../components/language/applyLanguageTournamentSettingModal.js';
export function pageTournament() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');

  page.innerHTML = `
        <div class="main-box">
          <div class="user-box"></div>
          <div class="game-box" id="tournament">
            <p class="header-pong" id='tournament-pong'>PONG</p>
            <p class="header-classic" id='tournament-header'>TOURNAMENT</p>
            <div class="player-container">
              <div class="player-option" id="tournament-player1">PLAYER 1</div>
              <div class="divider"></div>
              <div class="player-option" id="tournament-player2">PLAYER 2</div>
            </div>
          </div>
          <div id="mainNavbar"></div>
        </div>
      `;
  page.appendChild(createTournamentSettingModal());
  page.appendChild(createTournamentRoundModal());
  page.appendChild(createTournamentWinnerModal());
  setupTournamentEvents(page);
  return page;
}

function createTournamentSettingModal() {
  const modalContainer = document.createElement('div');

  modalContainer.innerHTML = `
  <div class="modal fade" id="tournamentSettingModal" tabindex="-1" aria-labelledby="tournamentSettingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0">
          <h2 class="modal-title" id="tournamentSettingModalLabel">TOURNAMENT Game Setting</h2>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <!-- Player 1 Input -->
            <div class="row mb-2">
              <div class="col-sm-4">
                <label for="player1-name" class="form-label" id='t-player1-label'>Player 1</label>
              </div>
              <div class="col">
                <input type="text" class="form-control bg-secondary text-white" id="player1-name" placeholder="Name" required maxlength="10">
              </div>
            </div>
            <!-- Player 2 Input -->
            <div class="row mb-2">
              <div class="col-sm-4">
                <label for="player2-name" class="form-label" id='t-player2-label'>Player 2</label>
              </div>
              <div class="col">
                <input type="text" class="form-control bg-secondary text-white" id="player2-name" placeholder="Name" required maxlength="10">
              </div>
            </div>
            <!-- Player 3 Input -->
            <div class="row mb-2">
              <div class="col-sm-4">
                <label for="player3-name" class="form-label" id='t-player3-label'>Player 3</label>
              </div>
              <div class="col">
                <input type="text" class="form-control bg-secondary text-white" id="player3-name" placeholder="Name" required maxlength="10">
              </div>
            </div>
            <!-- Player 4 Input -->
            <div class="row mb-2">
              <div class="col-sm-4">
                <label for="player4-name" class="form-label" id='t-player4-label'>Player 4</label>
              </div>
              <div class="col">
                <input type="text" class="form-control bg-secondary text-white" id="player4-name" placeholder="Name" required maxlength="10">
              </div>
            </div>
            <!-- Mode Selection -->
            <div class="row">
              <div class="col-sm-4">
                <span class="form-label d-block" id='t-mode'>Mode</span>
              </div>
              <div class="col">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gameMode" id="normal" checked>
                  <label class="form-check-label" for="normal" id='t-normal-label'>
                    Normal Mode
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gameMode" id="speed">
                  <label class="form-check-label" for="speed" id='t-speed-label'>
                    Speed Mode
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gameMode" id="object">
                  <label class="form-check-label" for="object" id='t-object-label'>
                    Object Mode
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" id="startTournamentButton" class="btn btn-lg btn-success w-100">START</button>
          <div id="round-error" class="text-danger"></div>

        </div>
      </div>
    </div>
  </div>
`;
  return modalContainer;
}

function createTournamentRoundModal() {
  const modalContainer = document.createElement('div');

  modalContainer.innerHTML = `
  <div class="modal fade" id="tournamentRoundModal" tabindex="-1" aria-labelledby="tournamentRoundModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="tournamentRoundModalLabel">TOURNAMENT ROUND 1</h5>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-center">
              <div class="h6" id='round-player1'>Player 1</div>
              <input type="text" class="form-control bg-secondary text-white" id="round-player1-name" value="joyoujeo" readonly>
            </div>
            <div class="text-center">
              <div class="h6" id='round-player2'>Player 2</div>
              <input type="text" class="form-control bg-secondary text-white" id="round-player2-name" value="gychoi" readonly>
            </div>
          </div>
          <div class="text-center my-3" id='round-content'>
            <h6>Are you ready?</h6>
          </div>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-lg btn-success" id="startRoundButton">START</button>
        </div>
      </div>
    </div>
  </div>
`;
  return modalContainer;
}

function createTournamentWinnerModal() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <div class="modal fade" id="tournamentWinnerModal" tabindex="-1" aria-labelledby="tournamentWinnerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white">
              <div class="modal-header border-0">
                  <h5 class="modal-title" id="tournamentWinnerModalLabel">TOURNAMENT WINNER!</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center">
                  <h6 id='tournament_player'>Player</h6>
                  <input type="text" class="form-control bg-secondary text-white mb-4" id="winner-name" readonly>
              </div>
              <div class="modal-footer border-0 justify-content-center">
                  <button type="button" class="btn btn-lg btn-success" id="restartGameButton">OK</button>
              </div>
          </div>
      </div>
    </div>`;

  modalContainer
    .querySelector('#restartGameButton')
    .addEventListener('click', function () {
      const modalElement = document.getElementById('tournamentWinnerModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    });

  return modalContainer;
}

export function setupTournamentEvents(page) {
  gameState.setState({ currentGameStatus: 'idle' });
  let gameBox = page.querySelector('#tournament');
  let tournamentSettingModal = new bootstrap.Modal(
    page.querySelector('#tournamentSettingModal'),
    {
      keyboard: false,
    }
  );

  let startTournamentButton = page.querySelector('#startTournamentButton');

  const player1Name = page.querySelector('#player1-name');
  const player2Name = page.querySelector('#player2-name');
  const player3Name = page.querySelector('#player3-name');
  const player4Name = page.querySelector('#player4-name');

  startTournamentButton.addEventListener('click', function () {
    const playerNames = [
      player1Name.value,
      player2Name.value,
      player3Name.value,
      player4Name.value,
    ];

    if (playerNames.includes('')) {
      gameState.setState({ currentGameStatus: 'error' });
      const roundError = page.querySelector('#round-error');
      roundError.textContent = 'Please enter names for all players';
      return;
    } else if (new Set(playerNames).size !== playerNames.length) {
      gameState.setState({ currentGameStatus: 'error' });
      const roundError = page.querySelector('#round-error');
      roundError.textContent = 'Please enter unique names for all players';
      return;
    }

    gameState.setState({ currentGameStatus: 'playing' });
    tournamentSettingModal.hide();
  });

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      gameState.getState().currentGameStatus === 'idle'
    ) {
      tournamentSettingModal.hide();
    }
  });

  gameBox.addEventListener('click', function () {
    if (gameState.getState().currentGameStatus === 'idle') {
      applyLanguageTournamentSettingModal();
      tournamentSettingModal.show();
    }
  });
}
