export function pageProfile() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="profile-box"></div>
          <h1>Profile</h1>
          <p>Welcome to the profile page.</p>
        </div>
      `;
  page.innerHTML = content;
  return page;
}
