const playerProfile = `
  <div class="profile-photo">
    <img src="../assets/images/profile/default.png" alt="profile photo">
  </div>
  <div class="profile-info">
    <div class="profile-name">
      <span>-</span>
      <button class="edit-profile-btn changeUserName">
        <img src="../assets/images/icon/pencil-fill.svg" alt="edit profile">
      </button>
    </div>
    <div class="photo-upload changeUserImage">
      <button class="upload-photo-btn">Choose a photo for your profile</button>
    </div>
    <div class="profile-stats">
      <div class="win-rate">
        <span>-</span>
        <label>RATE</label>
      </div>
      <div class="win">
        <span>-</span>
        <label>WIN</label>
      </div>
      <div class="loss">
        <span>-</span>
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
    <ul></ul>
  </div>
  <div class="history-view-all viewAllHistory">
    <button type="button" class="btn btn-outline-light">View all</button>
  </div>
`;

const friendList = `
  <div class="friend-title">
    <span>Friends</span>
  </div>
  <div class="friend-list-list">
    <ul></ul>
  </div>
  <div class="friend-view-all viewAllFriends">
    <button type="button" class="btn btn-outline-light">View all</button>
  </div>
`;

const friendRequest = `
  <div class="friend-request-title">
    <span>Friend Request</span>
  </div>
  <div class="friend-request-list">
    <ul></ul>
  </div>
  <div class="friend-request-btn-wrapper">
    <div class="invite-friends">
      <button type="button" class="btn btn-success">Invite friends</button>
    </div>
    <div class="friend-request-view-all">
      <button type="button" class="btn btn-outline-light">View all</button>
    </div>
  </div>
`;

const setting = `
    <div class="setting-option">
      <label class="name" for="2fa">2FA authentication options</label>
      <label class="toggle">
        <input id="2fa" class="toggle-checkbox" type="checkbox" checked>
        <div class="toggle-switch"></div>
      </label>
    </div>
    <div class="setting-option">
      <label class="name" for="language">Select language</label>
      <button type="button" data-bs-toggle="dropdown" class="language-btn" id="language">
        <img src="../assets/images/icon/globe2.svg" alt="language">
      </button>
      <ul class="dropdown-menu dropdown-menu-dark language-list">
        <li class="dropdown-item" id="lang-ko">Korean</li>
        <li class="dropdown-item" id="lang-en">English</li>
        <li class="dropdown-item" id="lang-fr">French</li>
      </ul>
    </div>
    <div class="setting-option">
      <label class="name" for="change-password">Change password</label>
      <button type="button" class="btn btn-success" id="change-password">Change password</button>
    </div>
    <div class="setting-option">
      <label class="name" for="unsubscribe">Unsubscribe</label>
      <button type="button" class="btn btn-danger" id="unsubscribe">Unsubscribe</button>
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
