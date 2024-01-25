export function pageTournament() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div id="side-bar"></div>
        <div class="main-box">
          <div class="profile-box"></div>
          <h1>Tournament</h1>
          <p>Welcome to the tournament page.</p>
        </div>
      `;
  page.innerHTML = content;
  return page;
}
