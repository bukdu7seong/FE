import { routes } from '../../lib/router/router.js';
import { sidebar } from '../components/common/sidebar.js';

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
      <button class="upload-photo-btn" id="choose-photo">Choose a photo for your profile</button>
    </div>
      <div class="profile-stats">
        <div class="win-rate">
          <span>-</span>
          <span id='rate'></span>
        </div>
        <div class="win">
          <span>-</span>
          <span id='win'></span>
        </div>
        <div class="loss">
          <span>-</span>
          <span id='loss'></span>
        </div>
      </div>
  </div>
`;

const playerHistory = `
  <div class="history-title">
    <span id='recent-history'></span>
  </div>
  <div class="history-list">
    <ul></ul>
  </div>
  <div class="history-view-all viewAllHistory">
    <button type="button" class="btn btn-outline-light" id="playerHistoryViewAll">View all</button>
  </div>
`;

const friendList = `
  <div class="friend-title">
    <span id='friends'></span>
  </div>
  <div class="friend-list-list">
    <ul></ul>
  </div>
  <div class="friend-view-all viewAllFriends">
    <button type="button" class="btn btn-outline-light" id="friendListViewAll">View all</button>
  </div>
`;

const friendRequest = `
  <div class="friend-request-title">
    <span id='friend-request'></span>
  </div>
  <div class="friend-request-list">
    <ul></ul>
  </div>
  <div class="friend-request-btn-wrapper">
    <div class="invite-friends inviteFriends">
      <button type="button" class="btn btn-success" id="friendRequestInvite">Invite friends</button>
    </div>
    <div class="friend-request-view-all viewAllRequests">
      <button type="button" class="btn btn-outline-light" id="friendRequestViewAll">View all</button>
    </div>
  </div>
`;

const setting = `
    <div class="setting-option">
      <label class="name" for="2fa" id='2fa-option'></label>
      <label class="toggle">
        <input id="2fa" class="toggle-checkbox 2fa" type="checkbox" checked>
        <div class="toggle-switch"></div>
      </label>
    </div>
    <div class="setting-option" id="language-settings">
      <label class="name" for="language-btn" id='language'></label>
      <button type="button" data-bs-toggle="dropdown" class="language-btn" id="language-btn">
        <img src="../assets/images/icon/globe2.svg" alt="language">
      </button>
      <ul class="dropdown-menu dropdown-menu-dark language-list">
        <li class="dropdown-item" id="lang-kr" data-lang="kr">한국어</li>
        <li class="dropdown-item" id="lang-en" data-lang="en">English</li>
        <li class="dropdown-item" id="lang-fr" data-lang="fr">Français</li>
      </ul>
    </div>
    <div class="setting-option">
      <label class="name" for="change-password", id='change-password-guide'></label>
      <button type="button" class="btn btn-success change-password" id="change-password"></button>
    </div>
    <div class="setting-option">
      <label class="name" for="unsubscribe" id='unsubscribe-guide'></label>
      <button type="button" class="btn btn-danger unsubscribe" id="unsubscribe"></button>
    </div>
`;

export function pageProfile() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');

  const content = `
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
      <div id="mainNavbar"></div>
    </div>
  `;

  page.innerHTML = content;
  return page;
}
