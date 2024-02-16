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
