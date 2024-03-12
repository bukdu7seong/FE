import { userState } from '../../../lib/state/state.js';
import { listenFriendLogin } from './loginStatus.js';
import { changeDateFormat } from '../../utils/date.js';
import { escapeHtml } from '../../utils/validateInput.js';
import { changeUserImageModal } from './modal/changeUserImage.js';
import { changeUserNameModal } from './modal/changeUserName.js';
import { userProfileModal } from './modal/userProfile.js';
import { viewAllFriendsModal } from './modal/viewAllFriends.js';
import { viewAllHistoryModal } from './modal/viewAllHistory.js';
import {
  testFriendData,
  testHistoryData,
  testRequestData,
} from './testData.js';

const BUTTONS = [
  'changeUserName',
  'changeUserImage',
  'viewAllHistory',
  'viewAllFriends',
  'userProfile',
];

function setModal() {
  BUTTONS.forEach((button) => {
    const modalTrigger = document.getElementsByClassName(button);
    Array.from(modalTrigger).forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        let modal = null;

        switch (button) {
          case 'changeUserName':
            modal = new changeUserNameModal();
            break;
          case 'changeUserImage':
            modal = new changeUserImageModal();
            break;
          case 'viewAllHistory':
            modal = new viewAllHistoryModal();
            break;
          case 'viewAllFriends':
            modal = new viewAllFriendsModal();
            break;
          case 'userProfile':
            const userId = event.target.closest('.item').id;
            modal = new userProfileModal(userId);
            break;
          default:
            break;
        }

        modal.show();
      });
    });
  });
}

function setProfile() {
  const userData = userState.getState();
  const profileName = document.querySelector('.profile-name span');
  const profileImage = document.querySelector('.profile-photo img');
  const profileStats = document.querySelector('.profile-stats');

  if (profileName) {
    profileName.textContent = `${userData.userName}`;
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
      const userImgSrc = `data:image/png;base64,${result.player2_img}`;

      const historyItemDiv = document.createElement('div');
      historyItemDiv.classList.add('history-item');

      // Icon
      const historyIconDiv = document.createElement('div');
      historyIconDiv.classList.add('history-icon');
      const iconImg = document.createElement('img');
      iconImg.src = `../assets/images/icon/hand-thumbs-${iconThumb}-fill.svg`;
      iconImg.alt = `hand thumbs ${iconThumb}`;
      historyIconDiv.appendChild(iconImg);

      // User Info
      const historyUserInfoDiv = document.createElement('div');
      historyUserInfoDiv.classList.add('history-user-info');
      const historyUserPhotoDiv = document.createElement('div');
      historyUserPhotoDiv.classList.add('history-user-photo');
      const userImg = document.createElement('img');
      userImg.src = userImgSrc;
      userImg.alt = 'history user photo';
      historyUserPhotoDiv.appendChild(userImg);

      const historyInfoWrapperDiv = document.createElement('div');
      historyInfoWrapperDiv.classList.add('history-info-wrapper');

      const historyUserNameDiv = document.createElement('div');
      historyUserNameDiv.classList.add('history-user-name');
      const userNameSpan = document.createElement('span');
      userNameSpan.textContent = escapeHtml(result.player2);
      historyUserNameDiv.appendChild(userNameSpan);

      const historyGameModeDiv = document.createElement('div');
      historyGameModeDiv.classList.add('history-game-mode');
      const gameModeSpan = document.createElement('span');
      gameModeSpan.textContent = escapeHtml(result.game_mode);
      historyGameModeDiv.appendChild(gameModeSpan);

      // Time
      const historyTimeDiv = document.createElement('div');
      historyTimeDiv.classList.add('history-time');
      const timeSpan = document.createElement('span');
      timeSpan.textContent = changeDateFormat(escapeHtml(result.played_at));
      historyTimeDiv.appendChild(timeSpan);

      historyInfoWrapperDiv.appendChild(historyUserNameDiv);
      historyInfoWrapperDiv.appendChild(historyGameModeDiv);
      historyUserInfoDiv.appendChild(historyUserPhotoDiv);
      historyUserInfoDiv.appendChild(historyInfoWrapperDiv);
      historyItemDiv.appendChild(historyIconDiv);
      historyItemDiv.appendChild(historyUserInfoDiv);
      historyItemDiv.appendChild(historyTimeDiv);
      historyItem.appendChild(historyItemDiv);
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
      const friendImgSrc = `data:image/png;base64,${result.user_img}`;

      // Friend List Item
      const friendListItemDiv = document.createElement('div');
      friendListItemDiv.classList.add('item');
      friendListItemDiv.classList.add('friend-list-item');
      friendListItemDiv.id = escapeHtml(result.id.toString());

      // Login Status
      const loginStatusDiv = document.createElement('div');
      loginStatusDiv.classList.add('login-status', 'logout');

      // Friend Info
      const friendInfoDiv = document.createElement('div');
      friendInfoDiv.classList.add('friend-info');

      const friendPhotoDiv = document.createElement('div');
      friendPhotoDiv.classList.add('friend-photo');
      const friendPhotoImg = document.createElement('img');
      friendPhotoImg.src = friendImgSrc;
      friendPhotoImg.alt = 'friend photo';
      friendPhotoDiv.appendChild(friendPhotoImg);

      const friendNameDiv = document.createElement('div');
      friendNameDiv.classList.add('friend-name');
      const friendNameSpan = document.createElement('span');
      friendNameSpan.textContent = escapeHtml(result.username);
      friendNameDiv.appendChild(friendNameSpan);

      // Friend Profile
      const friendProfileDiv = document.createElement('div');
      friendProfileDiv.classList.add('friend-profile');
      const friendProfileBtn = document.createElement('button');
      friendProfileBtn.type = 'button';
      friendProfileBtn.classList.add('btn', 'btn-outline-light');
      friendProfileBtn.classList.add('userProfile');
      friendProfileBtn.textContent = 'Profile';

      friendInfoDiv.appendChild(friendPhotoDiv);
      friendInfoDiv.appendChild(friendNameDiv);
      friendListItemDiv.appendChild(loginStatusDiv);
      friendListItemDiv.appendChild(friendInfoDiv);
      friendListItemDiv.appendChild(friendProfileDiv);
      friendProfileDiv.appendChild(friendProfileBtn);
      friendItem.appendChild(friendListItemDiv);
      friendList.appendChild(friendItem);
    });

    listenFriendLogin();
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
      const requestImgSrc = `data:image/png;base64,${result.user_img}`;

      // Friend Request Item
      const friendRequestItemDiv = document.createElement('div');
      friendRequestItemDiv.classList.add('friend-request-item');
      friendRequestItemDiv.classList.add('friend-request-item');

      // Friend Request Info
      const friendRequestInfoDiv = document.createElement('div');
      friendRequestInfoDiv.className = 'friend-request-info';

      const friendRequestPhotoDiv = document.createElement('div');
      friendRequestPhotoDiv.className = 'friend-request-photo';
      const friendRequestPhotoImg = document.createElement('img');
      friendRequestPhotoImg.src = requestImgSrc;
      friendRequestPhotoImg.alt = 'friend request photo';
      friendRequestPhotoDiv.appendChild(friendRequestPhotoImg);

      const friendRequestNameDiv = document.createElement('div');
      friendRequestNameDiv.className = 'friend-request-name';
      const friendRequestNameSpan = document.createElement('span');
      friendRequestNameSpan.textContent = escapeHtml(result.username);
      friendRequestNameDiv.appendChild(friendRequestNameSpan);

      // Friend Request Buttons
      const friendRequestBtnDiv = document.createElement('div');
      friendRequestBtnDiv.className = 'friend-request-btn';

      const acceptButton = document.createElement('button');
      acceptButton.type = 'button';
      acceptButton.className = 'btn btn-success';
      const acceptImg = document.createElement('img');
      acceptImg.src = '../assets/images/icon/check-lg.svg';
      acceptImg.alt = 'accept';
      acceptButton.appendChild(acceptImg);

      const declineButton = document.createElement('button');
      declineButton.type = 'button';
      declineButton.className = 'btn btn-danger';
      const declineImg = document.createElement('img');
      declineImg.src = '../assets/images/icon/x-lg.svg';
      declineImg.alt = 'decline';
      declineButton.appendChild(declineImg);

      // Friend Request Profile
      const friendRequestProfileDiv = document.createElement('div');
      friendRequestProfileDiv.className = 'friend-request-profile';
      const profileButton = document.createElement('button');
      profileButton.type = 'button';
      profileButton.className = 'btn btn-outline-light';
      profileButton.id = escapeHtml(result.id.toString());
      profileButton.textContent = 'Profile';
      friendRequestProfileDiv.appendChild(profileButton);

      friendRequestInfoDiv.appendChild(friendRequestPhotoDiv);
      friendRequestInfoDiv.appendChild(friendRequestNameDiv);
      friendRequestBtnDiv.appendChild(acceptButton);
      friendRequestBtnDiv.appendChild(declineButton);
      friendRequestItemDiv.appendChild(friendRequestInfoDiv);
      friendRequestItemDiv.appendChild(friendRequestBtnDiv);
      friendRequestItemDiv.appendChild(friendRequestProfileDiv);
      requestItem.appendChild(friendRequestItemDiv);
      requestList.appendChild(requestItem);
    });
  }
}

// API 받아서 페이지 갱신하는 함수도 만들어야 한다.
export function profile() {
  setProfile();
  setHistoryList();
  setFriendList();
  setRequestList();
  setModal();
}
