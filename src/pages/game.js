export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="user-box"></div>
          <div class="game-box">
            <p class="header-pong">PONG</p>
            <p class="header-classic">CLASSIC</p>
            <div class="player-container">
              <div class="player-option" id="player1">PLAYER 1</div>
              <div class="divider"></div>
              <div class="player-option" id="player2">
                       <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#gameSettingModal"> PLAYER 2
</button>
            
              </div>
            </div>
          
 


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
                            <label for="player-name" class="form-label">Player 2</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-dark text-white" id="player-name"
                                   placeholder="Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="form-label d-block">Mode</label>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="normal" checked>
                                <label class="form-check-label" for="normal">
                                    Normal Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="speed">
                                <label class="form-check-label" for="speed">
                                    Speed Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="object">
                                <label class="form-check-label" for="object">
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



<!-- Score Modal -->
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
                    <span class="badge bg-success rounded-pill px-3 me-2">WIN</span>
                    <img src="1.jpg" class="rounded-circle me-2" alt="Anna Clarke" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1">Anna Clarke</span>
                    <span class="time-score rounded-pill bg-secondary px-3">13: 42.1</span>
                </div>
                <!-- Loser section -->
                <div class="winner-loser mb-4 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-secondary rounded-pill px-3 me-2">LOSE</span>
                    <div class="bg-light rounded-circle me-2" style="width: 50px; height: 50px;"></div>
                    <span class="fw-bold flex-grow-1">Player 2</span>
                    <span class="time-score rounded-pill bg-secondary px-3">13: 42.1</span>
                </div>
            </div>

            <div class="modal-footer border-0">
                <button type="button" class="btn btn-lg btn-success w-100 mb-2 rounded-pill">SAVE SCORE</button>
                <button type="button" class="btn btn-lg btn-success w-100 rounded-pill">START</button>
            </div>
        </div>
    </div>
</div>


          </div>
          
        </div>
      `;
  page.innerHTML = content;

  return page;
}

export function pageBoard() {
  const page = document.createElement('div');
  page.setAttribute('class', 'board');
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

  return page;
}
