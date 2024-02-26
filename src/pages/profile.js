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

const friendList = `
  <div class="friend-title">
    <span>Friends</span>
  </div>
  <div class="friend-list-list">
    <ul>
      <li>
        <div class="friend-list-item">
          <div class="login-status login"></div>
          <div class="friend-info">
            <div class="friend-photo">
              <img src="../images/profile/default.png" alt="friend photo">
            </div>
            <div class="friend-name">
              <span>Default Friend</span>
            </div>
          </div>
          <div class="friend-profile">
            <button class="friend-profile-btn">Profile</button>
          </div>
        </div>
      </li>
      <li>
        <div class="friend-list-item">
          <div class="login-status logout"></div>
          <div class="friend-info">
            <div class="friend-photo">
              <img src="../images/profile/default.png" alt="friend photo">
            </div>
            <div class="friend-name">
              <span>Default Friend</span>
            </div>
          </div>
          <div class="friend-profile">
            <button class="friend-profile-btn">Profile</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="friend-view-all">
    <button class="friend-view-all-btn">View all</button>
  </div>
`;

const friendRequest = `
  <div class="friend-request-title">
    <span>Friend Request</span>
  </div>
  <div class="friend-request-list">
    <ul>
      <li>
        <div class="friend-request-item">
          <div class="friend-request-info">
            <div class="friend-request-photo">
              <img src="../images/profile/default.png" alt="friend request photo">
            </div>
            <div class="friend-request-name">
              <span>Default Friend</span>
            </div>
          </div>
          <div class="friend-request-btn">
            <button class="accept">
              <img src="../images/icon/check-lg.svg" alt="accept">
            </button>
            <button class="decline">
              <img src="../images/icon/x-lg.svg" alt="decline">
            </button>
          </div>
          <div class="friend-request-profile">
            <button class="friend-request-profile-btn">Profile</button>
          </div>
        </div>
      </li>
      <li>
        <div class="friend-request-item">
          <div class="friend-request-info">
            <div class="friend-request-photo">
              <img src="../images/profile/default.png" alt="friend request photo">
            </div>
            <div class="friend-request-name">
              <span>Default Friend</span>
            </div>
          </div>
          <div class="friend-request-btn">
            <button class="accept">
              <img src="../images/icon/check-lg.svg" alt="accept">
            </button>
            <button class="decline">
              <img src="../images/icon/x-lg.svg" alt="decline">
            </button>
          </div>
          <div class="friend-request-profile">
            <button class="friend-request-profile-btn">Profile</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="friend-request-btn-wrapper">
    <div class="invite-friends">
      <button class="invite-friends-btn">Invite friends</button>
    </div>
    <div class="friend-request-view-all">
      <button class="friend-request-view-all-btn">View all</button>
    </div>
  </div>
`;

const setting = `
    <div class="setting-option">
      <label for="2fa">2FA authentication options</label>
      <label class="toggle">
        <input id="2fa" class="toggle-checkbox" type="checkbox" checked>
        <div class="toggle-switch"></div>
      </label>
    </div>
    <div class="setting-option">
      <label for="language">Select language</label>
      <button class="language-btn" id="language">
        <img src="../images/icon/globe2.svg" alt="language">
      </button>
    </div>
    <div class="setting-option">
      <label for="change-password">Change password</label>
      <button class="change-password-btn" id="change-password">Change password</button>
    </div>
    <div class="setting-option">
      <label for="unsubscribe">Unsubscribe</label>
      <button class="unsubscribe-btn" id="unsubscribe">Unsubscribe</button>
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
              ${friendList}
            </div>
            <div class="blank-div"></div>
            <div class="friend-request">
              ${friendRequest}
            </div>
            <div class="setting">
              ${setting}
            </div>
          </div>
        </div>
      `;

  page.innerHTML = content;
  return page;
}
