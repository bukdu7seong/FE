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
              <div class="player-option" id="player2">PLAYER 2</div>
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
