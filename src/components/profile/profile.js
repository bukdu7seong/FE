import { userState } from '../../../lib/state/state.js';
import { changeDateFormat } from '../../utils/date.js';
import { changeUserImageModal } from './modal/changeUserImage.js';
import { changeUserNameModal } from './modal/changeUserName.js';
import { change2FA } from './modal/change2FA.js';
import { changePasswordModal } from './modal/changePassword.js';

import {
  testFriendData,
  testHistoryData,
  testRequestData,
} from './testData.js';


const MODALS = ['changeUserName', 'changeUserImage', '2fa', 'change-password'];

function setModal() {
  MODALS.forEach((modalId) => {
    const modalTrigger = document.getElementById(modalId);
    modalTrigger.addEventListener('click', () => {
      let modal = null;

      switch (modalId) {
        case 'changeUserName':
          modal = new changeUserNameModal();
          break;
        case 'changeUserImage':
          modal = new changeUserImageModal();
          break;
        case '2fa':
          modal = new change2FA();
          break
        case 'change-password':
          modal = new changePasswordModal();
        default:
          break;
      }
      modal.show();
    });
  });
}

function setProfile() {
  const userData = userState.getState();
  const profileName = document.querySelector('.profile-name span');
  const profileImage = document.querySelector('.profile-photo img');
  const profileStats = document.querySelector('.profile-stats');

  if (profileName) {
    profileName.innerHTML = `${userData.userName}`;
  }

  if (profileImage) {
    if (!userData.userImage) {
      profileImage.src = '../../assets/images/profile/default.png';
    } else {
      profileImage.src = userData.userImage;
    }
  }

  if (profileStats) {
    const winRate = profileStats.querySelector('.win-rate span');
    const win = profileStats.querySelector('.win span');
    const loss = profileStats.querySelector('.loss span');

    winRate.textContent = `${userData.WinRate}%`;
    win.textContent = `${userData.Wins}`;
    loss.textContent = `${userData.Losses}`;
  }
}

function setHistoryList() {
  const historyList = document.querySelector('.history-list ul');
  const historyData = testHistoryData; // JSON
  if (!historyData.results.length) {
    const historyItem = document.createElement('li');
    historyItem.textContent = 'No data';
    historyList.appendChild(historyItem);
  } else {
    const firstTwoResults = historyData.results.slice(0, 2);

    firstTwoResults.forEach((result) => {
      const historyItem = document.createElement('li');
      const iconThumb =
        result.winner === userState.getState().userName ? 'up' : 'down';
      const userImg = `data:image/png;base64,${result.player2_img}`;

      historyItem.innerHTML = `
        <div class="history-item">
          <div class="history-icon">
            <img src="../assets/images/icon/hand-thumbs-${iconThumb}-fill.svg" alt="hand thumbs ${iconThumb}">
          </div>
          <div class="history-user-info">
            <div class="history-user-photo">
              <img src=${userImg} alt="history user photo">
            </div>
            <div class="history-info-wrapper">
              <div class="history-user-name">
                <span>${result.player2}</span>
              </div>
              <div class="history-game-mode">
                <span>${result.game_mode}</span>
              </div>
            </div>
          </div>
          <div class="history-time">
            <span>${changeDateFormat(result.played_at)}</span>
          </div>
        </div>
      `;
      historyList.appendChild(historyItem);
    });
  }
}

function setFriendList() {
  const friendList = document.querySelector('.friend-list-list ul');
  const friendData = testFriendData; // JSON
  if (!friendData.friends.length) {
    const friendItem = document.createElement('li');
    friendItem.textContent = 'No data';
    friendList.appendChild(friendItem);
  } else {
    const firstTwoResults = friendData.friends.slice(0, 2);

    firstTwoResults.forEach((result) => {
      const friendItem = document.createElement('li');
      const friendImg = `data:image/png;base64,${result.user_img}`;

      friendItem.innerHTML = `
        <div class="friend-list-item">
          <div class="login-status login"></div>
          <div class="friend-info">
            <div class="friend-photo">
              <img src=${friendImg} alt="friend photo">
            </div>
            <div class="friend-name">
              <span>${result.username}</span>
            </div>
          </div>
          <div class="friend-profile">
            <button type="button" class="btn btn-outline-light">Profile</button>
          </div>
        </div>
      `;
      friendList.appendChild(friendItem);
    });
  }
}

function setRequestList() {
  const requestList = document.querySelector('.friend-request-list ul');
  const requestData = testRequestData; // JSON
  if (!requestData.requests.length) {
    const requestItem = document.createElement('li');
    requestItem.textContent = 'No data';
    requestList.appendChild(requestItem);
  } else {
    const firstTwoResults = requestData.requests.slice(0, 2);

    firstTwoResults.forEach((result) => {
      const requestItem = document.createElement('li');
      const requestImg = `data:image/png;base64,${result.user_img}`;

      requestItem.innerHTML = `
          <div class="friend-request-item">
            <div class="friend-request-info">
              <div class="friend-request-photo">
                <img src=${requestImg} alt="friend request photo">
              </div>
              <div class="friend-request-name">
                <span>${result.username}</span>
              </div>
            </div>
            <div class="friend-request-btn">
              <button type="button" class="btn btn-success">
                <img src="../assets/images/icon/check-lg.svg" alt="accept">
              </button>
              <button type="button" class="btn btn-danger">
                <img src="../assets/images/icon/x-lg.svg" alt="decline">
              </button>
            </div>
            <div class="friend-request-profile">
              <button type="button" class="btn btn-outline-light">Profile</button>
            </div>
          </div>
        `;
      requestList.appendChild(requestItem);
    });
  }
}

// API 받아서 페이지 갱신하는 함수도 만들어야 한다.
export function profile() {
  setModal();
  setProfile();
  setHistoryList();
  setFriendList();
  setRequestList();
}
