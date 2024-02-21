const playerProfile = `
  <div class="profile-photo">
    <img src="../images/profile/default.png" alt="profile photo">
  </div>
  <div class="profile-info">
    <div class="profile-name">
      <span>Player name</span>
      <button class="edit-profile-btn">
        <img src="../images/icon/pencil-fill.svg" alt="edit profile">
      </button>
    </div>
    <div class="photo-upload">
      <button class="upload-photo-btn">Choose a photo for your profile</button>
    </div>
    <div class="profile-stats">
      <div class="win-rate">
        <span>80%</span>
        <label>RATE</label>
      </div>
      <div class="win">
        <span>10</span>
        <label>WIN</label>
      </div>
      <div class="loss">
        <span>2</span>
        <label>LOSS</label>
      </div>
    </div>
  </div>
`;

export function pageProfile() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="user-box"></div>
          <div class="profile-box">
            <div class="player-profile">
              ${playerProfile}
            </div>
            <div class="player-history">
            </div>      
            <div class="friend-list">
            </div>
            <div class="blank-div"></div>
            <div class="friend-request">
            </div>
            <div class="setting">
            </div>
          </div>
        </div>
      `;

  page.innerHTML = content;
  return page;
}
