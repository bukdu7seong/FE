import { userState } from '../../../../lib/state/state.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" data-bs-theme="dark">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body modal-player-profile">
            <div class="modal-profile-photo">
              <img src="/assets/images/profile/default_profile.png" alt="profile photo">
            </div>
            <div class="modal-profile-info">
              <div class="modal-profile-wrapper">
                <div class="login-status logout"></div>
                <div class="modal-profile-name">
                  <span>-</span>
                </div>
              </div>
              <div class="modal-profile-stats">
                <div class="modal-win-rate">
                  <span>-</span>
                  <label>RATE</label>
                </div>
                <div class="modal-win">
                  <span>-</span>
                  <label>WIN</label>
                </div>
                <div class="modal-loss">
                  <span>-</span>
                  <label>LOSS</label>
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
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await fetch(
      `http://localhost:8000/api/account/user-stats/${userId}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        globalState.setState({ isLoggedIn: false });
        throw new Error('Unauthorized access token. Please login again.');
      } else if (response.status === 404) {
        throw new Error('User not found.');
      } else {
        throw new Error('Failed to fetch user profile.');
      }
    } else {
      return response.json();
    }
  } catch (error) {
    const toast = new failureToast(error.message);
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
}

export class userProfileModal {
  constructor(userId, modalId = 'userProfileModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    // this.userId = userId;
    console.log(userId);
    this.userId = 1; // for development
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
      this.setUserInfo(data);
    });
  }

  setUserInfo(userData) {
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
      userPhoto.src = `${userData.image}`;
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
        userSocket.onmessage = (event) => {
          const loginStatusList = JSON.parse(event.data); // {}

          loginStatusList.forEach((loginStatus) => {
            for (let [key, value] of Object.entries(loginStatus)) {
              if (key === this.userId) {
                const loginStatusDiv =
                  this.modalInstance._element.querySelector('.login-status');
                if (value) {
                  loginStatusDiv.classList.remove('logout');
                  loginStatusDiv.classList.add('login');
                } else {
                  loginStatusDiv.classList.remove('login');
                  loginStatusDiv.classList.add('logout');
                }
              }
            }
          });
        };
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
  }

  show() {
    this.modalInstance.show();
    this.listenUserLogin();
  }

  hide() {
    this.modalInstance.hide();
  }
}
