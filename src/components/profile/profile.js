import { globalState, userState } from '../../../lib/state/state.js';
import { changeDateFormat } from '../../utils/date.js';
import { escapeHtml } from '../../utils/validateInput.js';
import { changeUserImageModal } from './modal/changeUserImage.js';
import { changeUserNameModal } from './modal/changeUserName.js';
import { userProfileModal } from './modal/userProfile.js';
import { viewAllFriendsModal } from './modal/viewAllFriends.js';
import { viewAllHistoryModal } from './modal/viewAllHistory.js';
import { viewAllRequestsModal } from './modal/viewAllRequest.js';
import { change2FA } from './modal/change2FA.js';
import { changePasswordModal } from './modal/changePassword.js';
import { deleteUserModal } from './modal/unsubscribe.js';
import { applyLanguage, changeLanguage } from '../language/language.js';
import { updateRequest } from './updateRequest.js';
import { inviteFriendsModal } from './modal/inviteFriends.js';
import { getHistoryData } from './data/historyData.js';
import { getFriendData } from './data/friendData.js';
import { getRequestData } from './data/requestData.js';
import { getImageData } from './data/imageData.js';
import { ACCOUNT_API_URL } from '../../utils/api.js';
import { getAccessToken } from '../../utils/token.js';
import applyLanguageProfile from '../language/applyLanguageProfile.js';
import { getGameData } from './data/gameData.js';

const BUTTONS = [
  'changeUserName',
  'changeUserImage',
  'viewAllHistory',
  'viewAllFriends',
  'viewAllRequests',
  'inviteFriends',
  'change-password',
  'unsubscribe',
];

function setModal() {
  BUTTONS.forEach((button) => {
    const modalTrigger = document.getElementsByClassName(button);

    if (!modalTrigger) {
      return;
    }

    Array.from(modalTrigger).forEach((trigger) => {
      trigger.addEventListener('click', () => {
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
            globalState.setState({ viewAllModal: modal });
            break;
          case 'viewAllRequests':
            modal = new viewAllRequestsModal();
            globalState.setState({ viewAllModal: modal });
            break;
          case 'inviteFriends':
            modal = new inviteFriendsModal();
            globalState.setState({ viewAllModal: modal });
            break;
          case 'change-password':
            modal = new changePasswordModal();
            break;
          case 'unsubscribe':
            modal = new deleteUserModal();
            break;
          default:
            break;
        }

        if (modal) {
          modal.show();
        }
      });
    });
  });
}

async function setProfile() {
  const profileName = document.querySelector('.profile-name span');
  const profileImage = document.querySelector('.profile-photo img');
  const profileStats = document.querySelector('.profile-stats');

  const userData = userState.getState();

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

  const userGameData = await getGameData();
  if (!userGameData) {
    return;
  }

  if (profileStats) {
    const winRate = profileStats.querySelector('.win-rate span');
    const win = profileStats.querySelector('.win span');
    const loss = profileStats.querySelector('.loss span');

    if (winRate) {
      winRate.textContent = `${userGameData.win_rate}%`;
    }

    if (win) {
      win.textContent = `${userGameData.wins}`;
    }

    if (loss) {
      loss.textContent = `${userGameData.losses}`;
    }
  }
}

async function setHistoryList() {
  const historyList = document.querySelector('.history-list ul');
  const historyData = await getHistoryData();

  if (!historyList || !historyData) {
    return;
  }

  if (!historyData.games.length) {
    const historyItem = document.createElement('li');
    historyItem.id = 'historyItemNoData';
    historyItem.textContent = i18next.t('historyItemNoData');
    applyLanguage().set({
      id: 'historyItemNoData',
    });
    historyList.appendChild(historyItem);
  } else {
    const firstTwoResults = historyData.games.slice(0, 2);

    firstTwoResults.forEach(async (result) => {
      const historyItem = document.createElement('li');
      const iconThumb = result.winner ? 'up' : 'down';
      const userImage = await getImageData(result.other_img);
      const userImgSrc = userImage;

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
      userNameSpan.textContent = escapeHtml(result.other);
      historyUserNameDiv.appendChild(userNameSpan);

      const historyGameModeDiv = document.createElement('div');
      historyGameModeDiv.classList.add('history-game-mode');
      const gameModeSpan = document.createElement('span');
      const winScore = escapeHtml(result.win_score);
      const loseScore = escapeHtml(result.lose_score);
      const gameMode = escapeHtml(result.game_mode);
      gameModeSpan.textContent = `${gameMode} | ${winScore} : ${loseScore}`;
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

export async function setFriendList() {
  const friendList = document.querySelector('.friend-list-list ul');
  const friendData = await getFriendData();

  if (!friendList || !friendData) {
    return;
  }

  friendList.innerHTML = '';

  // listenFriendLogin();
  if (!friendData.friends.length) {
    const friendItem = document.createElement('li');
    friendItem.textContent = i18next.t('friendItemNoData');
    friendItem.id = 'friendItemNoData';
    applyLanguage().set({
      id: 'friendItemNoData',
    });
    friendList.appendChild(friendItem);
  } else {
    const firstTwoResults = friendData.friends.slice(0, 2);
    let friendIdArray = [];

    firstTwoResults.forEach(async (result) => {
      const friendItem = document.createElement('li');
      const userImage = await getImageData(result.img);
      const friendImgSrc = userImage
        ? userImage
        : '/assets/images/profile/default.png';

      // Friend List Item
      const friendListItemDiv = document.createElement('div');
      friendListItemDiv.classList.add('item');
      friendListItemDiv.classList.add('friend-list-item');
      friendListItemDiv.id = escapeHtml(result.id.toString());
      friendIdArray.push(result.id);

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
      friendProfileBtn.classList.add('userProfile', 'btn', 'btn-outline-light');
      friendProfileBtn.textContent = 'Profile';

      friendProfileBtn.addEventListener('click', () => {
        const userId = result.id;
        const modal = new userProfileModal(userId);
        globalState.setState({ profileModal: modal });
        modal.show();
      });

      friendInfoDiv.appendChild(friendPhotoDiv);
      friendInfoDiv.appendChild(friendNameDiv);
      friendListItemDiv.appendChild(loginStatusDiv);
      friendListItemDiv.appendChild(friendInfoDiv);
      friendListItemDiv.appendChild(friendProfileDiv);
      friendProfileDiv.appendChild(friendProfileBtn);
      friendItem.appendChild(friendListItemDiv);
      friendList.appendChild(friendItem);
    });
    listenFriendLogin(friendIdArray);
  }
}

function listenFriendLogin(array) {
  const userData = userState.getState();
  const userSocket = userData.userSocket;

  const waitForSocketOpen = new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (userSocket && userSocket.readyState === WebSocket.OPEN) {
        clearInterval(checkInterval);
        resolve(userSocket);
      } else if (userState.getState().socketStatus === 'offline') {
        clearInterval(checkInterval);
        reject(new Error('Socket is offline'));
      }
    }, 420);
  });

  waitForSocketOpen
    .then(() => {
      const checkLoginInterval = setInterval(() => {
        userSocket.send(JSON.stringify({ userid: array }));
      }, 420);

      if (userState.getState().socketFunction) {
        const previousInterval = userState.getState().socketFunction;
        clearInterval(previousInterval);
      } else {
        userState.setState({ socketFunction: checkLoginInterval }, false);
      }
    })
    .catch(() => {
      const allLoginStatus = document.querySelectorAll('.login-status');
      allLoginStatus.forEach((loginStatus) => {
        loginStatus.classList.remove('logout');
        loginStatus.classList.add('offline');
      });
    });
}

export async function setRequestList() {
  const requestList = document.querySelector('.friend-request-list ul');
  const requestData = await getRequestData();

  if (!requestList || !requestData) {
    return;
  }

  requestList.innerHTML = '';

  if (!requestData.friends.length) {
    const requestItem = document.createElement('li');
    requestItem.textContent = i18next.t('requestItemNoData');
    requestItem.id = 'requestItemNoData';
    applyLanguage().set({
      id: 'requestItemNoData',
    });
    requestList.appendChild(requestItem);
  } else {
    requestData.friends.slice(0, 2).map(async (result) => {
      const requestItem = document.createElement('li');
      const userImage = await getImageData(result.img);
      const requestImgSrc = userImage
        ? userImage
        : '/assets/images/profile/default.png';

      // Friend Request Item
      const friendRequestItemDiv = document.createElement('div');
      friendRequestItemDiv.classList.add('item');
      friendRequestItemDiv.classList.add('friend-request-item');
      friendRequestItemDiv.id = escapeHtml(result.id.toString());

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

      acceptButton.addEventListener('click', async () => {
        updateRequest(result.id, true).then(async () => {
          await setRequestList();
          await setFriendList();
        });
      });

      const declineButton = document.createElement('button');
      declineButton.type = 'button';
      declineButton.className = 'btn btn-danger';
      const declineImg = document.createElement('img');
      declineImg.src = '../assets/images/icon/x-lg.svg';
      declineImg.alt = 'decline';
      declineButton.appendChild(declineImg);

      declineButton.addEventListener('click', async () => {
        updateRequest(result.id, false).then(async () => {
          await setRequestList();
          await setFriendList();
        });
      });

      // Friend Request Profile
      const friendRequestProfileDiv = document.createElement('div');
      friendRequestProfileDiv.className = 'friend-request-profile';
      const profileButton = document.createElement('button');
      profileButton.type = 'button';
      profileButton.classList.add('userProfile', 'btn', 'btn-outline-light');
      profileButton.textContent = 'Profile';

      profileButton.addEventListener('click', () => {
        const userId = result.id;
        const modal = new userProfileModal(userId);
        globalState.setState({ profileModal: modal });
        modal.show();
      });

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

function setLanguage() {
  const languageElement = document.getElementById('language-settings');
  if (!languageElement) {
    return;
  }

  languageElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('dropdown-item')) {
      const languageCode = event.target.getAttribute('data-lang');
      changeLanguage(languageCode);
      updateUserLanguage(languageCode);
      applyLanguage().call();
    }
  });
}

async function updateUserLanguage(language) {
  const accessToken = await getAccessToken();
  const url = `${ACCOUNT_API_URL}/api/account/update-language/`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ language: language.toUpperCase() }),
    });

    if (!response.ok) {
      // 에러 처리 (예: 상태 코드에 따른 메시지)
      console.error(`Error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

function set2fa() {
  const twoFACheckbox = document.getElementById('2fa');
  if (!twoFACheckbox) {
    return;
  }

  if (userState.getState().user2fa) {
    twoFACheckbox.checked = true;
  } else {
    twoFACheckbox.checked = false;
  }

  twoFACheckbox.addEventListener('change', () => {
    const twoFAModal = new change2FA();
    twoFAModal.toggle2FA();
  });
}

function listenSocketMessage() {
  const userData = userState.getState();
  const userSocket = userData.userSocket;

  const waitForSocketOpen = new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (userSocket && userSocket.readyState === WebSocket.OPEN) {
        clearInterval(checkInterval);
        resolve(userSocket);
      } else if (userState.getState().socketStatus === 'offline') {
        clearInterval(checkInterval);
        reject(new Error('Socket is offline'));
      }
    }, 420);
  });

  waitForSocketOpen
    .then(() => {
      userSocket.onmessage = (event) => {
        const loginStatusList = JSON.parse(event.data);

        Object.entries(loginStatusList).forEach(([userId, isLoggedIn]) => {
          const profileModal = globalState.getState().profileModal;
          const viewAllModal = globalState.getState().viewAllModal;

          if (!viewAllModal && !profileModal) {
            // friends
            const friendItem = document.getElementById(userId);
            if (!friendItem) return;

            const loginStatusDiv = friendItem.querySelector('.login-status');
            const loginStatus = loginStatusDiv.classList;
            if (isLoggedIn) {
              if (loginStatus.contains('logout')) {
                loginStatus.remove('logout');
                loginStatus.add('login');
              }
            } else {
              if (loginStatus.contains('login')) {
                loginStatus.remove('login');
                loginStatus.add('logout');
              }
            }
          }

          if (profileModal) {
            // profile modal
            const modalElement = profileModal.modalInstance._element;
            const modalUserId = profileModal.userId;

            if (modalElement && modalUserId === +userId) {
              const modalLoginStatusDiv =
                modalElement.querySelector('.login-status');
              const loginStatus = modalLoginStatusDiv.classList;
              if (isLoggedIn) {
                if (loginStatus.contains('logout')) {
                  loginStatus.remove('logout');
                  loginStatus.add('login');
                }
              } else {
                if (loginStatus.contains('login')) {
                  loginStatus.remove('login');
                  loginStatus.add('logout');
                }
              }
            }
          }

          if (viewAllModal) {
            // view all modal
            const modalElement = viewAllModal.modalInstance._element;
            const modalItem = modalElement.querySelector(`[id="${userId}"]`);
            if (!modalItem) return;

            const modalLoginStatusDiv = modalItem.querySelector(
              '.modal-login-status'
            );
            const loginStatus = modalLoginStatusDiv.classList;
            if (isLoggedIn) {
              if (loginStatus.contains('modal-logout')) {
                loginStatus.remove('modal-logout');
                loginStatus.add('modal-login');
              }
            } else {
              if (loginStatus.contains('modal-login')) {
                loginStatus.remove('modal-login');
                loginStatus.add('modal-logout');
              }
            }
          }
        });
      };
    })
    .catch(() => {
      const allLoginStatus = document.querySelectorAll('.login-status');
      allLoginStatus.forEach((loginStatus) => {
        loginStatus.classList.remove('logout');
        loginStatus.classList.add('offline');
      });
    });
}

export function profile() {
  setProfile();
  setHistoryList();
  setFriendList();
  setRequestList();
  listenSocketMessage();
  setLanguage();
  set2fa();
  setModal();
  applyLanguageProfile();
}
