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
              <div class="player-option" id="player1">1 PLAYER</div>
              <div class="divider"></div>
              <div class="player-option" id="player2">2 PLAYERS</div>
            </div>
            <footer>
              <p>DEVELOPED BY TWISTED BY RAT</p>
            </footer>
          </div>
        </div>
      `;
  page.innerHTML = content;
  return page;
}
