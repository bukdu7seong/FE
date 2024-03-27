import { gameState } from '../../lib/state/state.js';

export function pageTournament() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
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
            
            <button type="button" id='tournamentBtn' class="btn" data-bs-toggle="modal" data-bs-target="#tournamentSettingModal"></button>

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
                            <input type="text" class="form-control bg-secondary text-white" id="player1-name" placeholder="Name">
                        </div>
                    </div>
                    <!-- Player 2 Input -->
                    <div class="row mb-2">
                        <div class="col-sm-4">
                            <label for="player2-name" class="form-label" id='t-player2-label'>Player 2</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-secondary text-white" id="player2-name" placeholder="Name">
                        </div>
                    </div>
                    <!-- Player 3 Input -->
                    <div class="row mb-2">
                        <div class="col-sm-4">
                            <label for="player3-name" class="form-label" id='t-player3-label'>Player 3</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-secondary text-white" id="player3-name" placeholder="Name">
                        </div>
                    </div>
                    <!-- Player 4 Input -->
                    <div class="row mb-2">
                        <div class="col-sm-4">
                            <label for="player4-name" class="form-label" id='t-player4-label'>Player 4</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-secondary text-white" id="player4-name" placeholder="Name">
                        </div>
                    </div>
                    <!-- Mode Selection -->
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="form-label d-block" id='t-mode'>Mode</label>
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
            </div>
        </div>
    </div>
</div>

          </div>
        </div>
        
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
                        <input type="text" class="form-control bg-secondary text-white" id="player1-name" value="joyoujeo" readonly>
                    </div>
                    <div class="text-center">
                        <div class="h6" id='round-player2'>Player 2</div>
                        <input type="text" class="form-control bg-secondary text-white" id="player2-name" value="gychoi" readonly>
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
  page.innerHTML = content;
  page.appendChild(createTournamentWinnerModal());
  setupTournamentEvents(page);
  return page;
}

export function setupTournamentEvents(page) {
  gameState.setState({ currentGameStatus: 'idle' });
  let gameBox = page.querySelector('#tournament');
  let tournamentSettingModal = new bootstrap.Modal(page.querySelector('#tournamentSettingModal'), {
    keyboard: false
  });
  let startTournamentButton = page.querySelector('#startTournamentButton');

  startTournamentButton.addEventListener('click', function() {
    gameState.setState({ currentGameStatus: 'playing' });
    tournamentSettingModal.hide();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && gameState.getState().currentGameStatus === 'idle') {
      tournamentSettingModal.hide();
    }
  });

  gameBox.addEventListener('click', function() {
    if (gameState.getState().currentGameStatus === 'idle') {
      updateTournamentSettingModalContent();
      tournamentSettingModal.show();
    }
  });
}

export function updateTournamentBoxContent() {
  document.getElementById("tournament-pong").innerHTML = i18next.t("tournament-pong");
  document.getElementById('tournament-header').innerHTML = i18next.t('tournament-header');
  document.getElementById('tournament-player1').innerHTML = i18next.t('tournament-player1');
  document.getElementById('tournament-player2').innerHTML = i18next.t('tournament-player2');
}

function updateTournamentSettingModalContent() {
  document.getElementById("tournamentSettingModalLabel").innerHTML = i18next.t("tournamentSettingModalLabel");
  document.getElementById('t-player1-label').innerHTML = i18next.t('t-player1-label');
  document.getElementById('player1-name').placeholder = i18next.t('player1-name');
  document.getElementById('t-player2-label').innerHTML = i18next.t('t-player1-label');
  document.getElementById('player2-name').placeholder = i18next.t('player2-name');
  document.getElementById('t-player3-label').innerHTML = i18next.t('t-player3-label');
  document.getElementById('player3-name').placeholder = i18next.t('player3-name');
  document.getElementById('t-player4-label').innerHTML = i18next.t('t-player4-label');
  document.getElementById('player4-name').placeholder = i18next.t('player4-name');
  document.getElementById('t-mode').innerHTML = i18next.t('t-mode');
  document.getElementById('t-normal-label').innerHTML = i18next.t('t-normal-label');
  document.getElementById('t-speed-label').innerHTML = i18next.t('t-speed-label');
  document.getElementById('t-object-label').innerHTML = i18next.t('t-object-label');
}

export function updateTournamentRoundModalContent(round) {
  document.getElementById('tournamentRoundModalLabel').textContent = i18next.t('tournamentRoundModalLabel', { round: round });
  document.getElementById("round-player1").innerHTML = i18next.t("round-player1");
  document.getElementById("round-player2").innerHTML = i18next.t("round-player2");
  document.getElementById("round-content").innerHTML = i18next.t("round-content");
  document.getElementById("startRoundButton").innerHTML = i18next.t("startRoundButton");
}

function createTournamentWinnerModal() {
  const tournamentWinnerModal = document.createElement('div');
  tournamentWinnerModal.className = 'modal fade';
  tournamentWinnerModal.id = 'tournamentWinnerModal';
  tournamentWinnerModal.tabIndex = -1;
  tournamentWinnerModal.setAttribute('aria-labelledby', 'tournamentWinnerModalLabel');
  tournamentWinnerModal.setAttribute('aria-hidden', 'true');
  tournamentWinnerModal.innerHTML = `
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
        </div>`;


  // 모달 인스턴스 생성
  tournamentWinnerModal.querySelector("#restartGameButton").addEventListener("click", function() {
    const modalElement = document.getElementById('tournamentWinnerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  });

  return tournamentWinnerModal;
}



export function updateTournamentWinnerModal() {
  document.getElementById("tournamentWinnerModalLabel").innerHTML = i18next.t("tournamentWinnerModalLabel");
  document.getElementById('tournament_player').innerHTML = i18next.t('tournament_player');
  document.getElementById('restartGameButton').innerHTML = i18next.t('restartGameButton');
}
