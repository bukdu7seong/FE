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

const playerHistory = `
  <div class="history-title">
    <span>Recent History</span>
  </div>
  <div class="history-list">
    <ul>
      <li>
        <div class="history-item">
          <div class="history-icon">
            <img src="../images/icon/hand-thumbs-up-fill.svg" alt="hand thumbs up">
          </div>
          <div class="history-user-info">
            <div class="history-user-photo">
              <img src="../images/profile/default.png" alt="history user photo">
            </div>
            <div class="history-info-wrapper">
              <div class="history-user-name">
                <span>User Name</span>
              </div>
              <div class="history-game-mode">
                <span>Speed Mode</span>
              </div>
            </div>
          </div>
          <div class="history-time">
            <span>13:42 1.1</span>
          </div>
        </div>
      </li>
      <li>
        <div class="history-item">
          <div class="history-icon">
            <img src="../images/icon/hand-thumbs-down-fill.svg" alt="hand thumbs up">
          </div>
          <div class="history-user-info">
            <div class="history-user-photo">
              <img src="../images/profile/default.png" alt="history user photo">
            </div>
            <div class="history-info-wrapper">
              <div class="history-user-name">
                <span>User Name</span>
              </div>
              <div class="history-game-mode">
                <span>Speed Mode</span>
              </div>
            </div>
          </div>
          <div class="history-time">
            <span>13:42 1.1</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="history-view-all">
    <button class="history-view-all-btn">View all</button>
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
              ${playerHistory}
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
