import { globalState, userState } from '../../../../lib/state/state.js';
import { ACCOUNT_API_URL, GAME_API_URL } from '../../../utils/api.js';
import { redirectError, toastError } from '../../../utils/error.js';
import { getImageData } from '../data/imageData.js';
import { getAccessToken } from '../../../utils/token.js';

function modalHTML(modalId) {
  return `
    <div class='modal fade' id='${modalId}'>
      <div class='modal-dialog modal-dialog-centered'>
        <div class='modal-content'>
          <div class='modal-header' data-bs-theme='dark'>
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body modal-player-profile'>
            <div class='modal-profile-photo'>
              <img src='/assets/images/profile/default.png' alt='profile photo'>
            </div>
            <div class='modal-profile-info'>
              <div class='modal-profile-wrapper'>
                <div class='login-status logout'></div>
                <div class='modal-profile-name'>
                  <span>-</span>
                </div>
              </div>
              <div class='modal-profile-stats'>
                <div class='modal-win-rate'>
                  <span>-</span>
                  <span>RATE</span>
                </div>
                <div class='modal-win'>
                  <span>-</span>
                  <span>WIN</span>
                </div>
                <div class='modal-loss'>
                  <span>-</span>
                  <span>LOSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function fetchUserProfile(userId) {
  try {
    const accessToken = await getAccessToken();

    const userResponse = await fetch(
      `${ACCOUNT_API_URL}/api/account/user-stats/?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      if (userResponse.status === 401) {
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else if (userResponse.status === 404) {
        throw new Error('User not found.');
      } else {
        throw new Error('Failed to fetch user profile.');
      }
    }

    const gameResponse = await fetch(
      `${GAME_API_URL}/api/games/user-stats/?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!gameResponse.ok) {
      if (gameResponse.status === 401) {
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else {
        throw new Error('Failed to fetch user game data.');
      }
    }

    const userData = await userResponse.json();
    const gameData = await gameResponse.json();

    const response = {
      username: userData.username,
      image: userData.img,
      win_rate: gameData.win_rate,
      wins: gameData.wins,
      losses: gameData.losses,
    };

    return response;
  } catch (error) {
    toastError(error.message);
  }
}

export class userProfileModal {
  constructor(userId, modalId = 'userProfileModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.userId = userId;
    this.modalInstance = null;
    this.initModal();
  }

  initModal() {
    document.body.insertAdjacentHTML('beforeend', this.modalHTML);

    this.modalInstance = new bootstrap.Modal(
      document.getElementById(this.modalId)
    );

    this.modalInstance._element.addEventListener(
      'hidden.bs.modal',
      this.handleHidden.bind(this)
    );

    fetchUserProfile(this.userId).then((data) => {
      if (data) {
        this.setUserInfo(data);
      }
    });
  }

  async setUserInfo(userData) {
    const userPhoto = this.modalInstance._element.querySelector(
      '.modal-profile-photo img'
    );
    const userName = this.modalInstance._element.querySelector(
      '.modal-profile-name span'
    );
    const userWinRate = this.modalInstance._element.querySelector(
      '.modal-win-rate span'
    );

    const userWin =
      this.modalInstance._element.querySelector('.modal-win span');
    const userLoss =
      this.modalInstance._element.querySelector('.modal-loss span');

    if (userData.image) {
      const userImage = await getImageData(userData.image);
      userPhoto.src = userImage
        ? userImage
        : '/assets/images/profile/default.png';
    } else {
      userPhoto.src = '/assets/images/profile/default.png';
    }

    userName.textContent = userData.username;
    userWinRate.textContent = userData.win_rate;
    userWin.textContent = userData.wins;
    userLoss.textContent = userData.losses;
  }

  listenUserLogin() {
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
        const array = [this.userId];

        const checkLoginInterval = setInterval(() => {
          userSocket.send(JSON.stringify({ userid: array }));
        }, 420);

        if (userState.getState().socketProfile) {
          const previousInterval = userState.getState().socketProfile;
          clearInterval(previousInterval);
        } else {
          userState.setState({ socketProfile: checkLoginInterval }, false);
        }
      })
      .catch(() => {
        const loginStatusDiv =
          this.modalInstance._element.querySelector('.login-status');
        loginStatusDiv.classList.remove('login');
        loginStatusDiv.classList.add('offline');
      });
  }

  handleHidden() {
    this.modalInstance._element.remove();
    clearInterval(userState.getState().socketProfile);
    userState.setState({ socketProfile: null }, false);
    globalState.setState({ profileModal: null });
  }

  show() {
    this.modalInstance.show();
    this.listenUserLogin();
  }

  hide() {
    this.modalInstance.hide();
  }
}
