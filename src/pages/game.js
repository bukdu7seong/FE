export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="profile-box"></div>
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
          </div>
          
        </div>
      `;
  page.innerHTML = content;

  return page;
}
