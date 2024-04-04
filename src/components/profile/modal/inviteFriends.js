import { globalState, userState } from '../../../../lib/state/state.js';
import { getCookie } from '../../../utils/cookie.js';
import { redirectError, toastError } from '../../../utils/error.js';
import { escapeHtml, validateInput } from '../../../utils/validateInput.js';
import { getFriendData } from '../data/friendData.js';
import { getImageData } from '../data/imageData.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header" data-bs-theme="dark">
          <h2 class="modal-title">Invite Friends</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" id="searchFriends" placeholder="Search">
          <button type="button" id="searchButton" class="btn btn-primary">Search</button>
          <div id="error-message" class="text-danger"></div>
          <div class="modal-search-friend-list">
            <ul></ul>
          </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  `;
}

async function searchUser(username) {
  try {
    const accessToken = getCookie('accessToken');

    const response = await fetch(
      `http://localhost:8000/api/account/search/${username}/`,
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
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else if (response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('Failed to search user');
      }
    }

    return await response.json();
  } catch (error) {
    toastError(error.message);
  }
}

async function inviteUser(friendId) {
  try {
    const accessToken = getCookie('accessToken');

    const response = await fetch(
      `http://localhost:8000/api/friend/send-friend-request/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ user_id: friendId }),
      }
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Already invited or already friends.');
      } else if (response.status === 401) {
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else {
        throw new Error('Failed to invite friend');
      }
    }
  } catch (error) {
    toastError(error.message);
  }
}

async function getFriendList() {
  return null; // 모든 유저를 가져오도록 변경해야 함, 아니면 빼던가...
}

export class inviteFriendsModal {
  constructor(modalId = 'inviteFriendsModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.inputData = '';
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

    this.modalInstance._element
      .querySelector('#searchButton')
      .addEventListener('click', this.checkInput.bind(this));

    this.modalInstance._element
      .querySelector('#searchFriends')
      .addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.checkInput();
        }
      });
  }

  checkInput() {
    this.inputData =
      this.modalInstance._element.querySelector('#searchFriends').value;

    if (!validateInput(this.inputData)) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Only alphanumeric characters are allowed.';
    } else if (this.inputData.length === 0) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Please enter a username.';
    } else {
      this.searchFriend();
      this.modalInstance._element.querySelector('#error-message').textContent =
        '';
      this.inputData = '';
    }
  }

  async searchFriend() {
    const userList = this.modalInstance._element.querySelector(
      '.modal-search-friend-list ul'
    );
    userList.innerHTML = '';

    const user = await searchUser(this.inputData);
    let userIdArray = [];

    if (!user) {
      const userItem = document.createElement('li');
      userItem.textContent = 'No data';
      userList.appendChild(userItem);
    } else {
      const userItem = document.createElement('li');
      const userImage = await getImageData(user.image);
      const userImgSrc = userImage
        ? userImage
        : '/assets/images/profile/default.png';

      // User List Item
      const userListItemDiv = document.createElement('div');
      userListItemDiv.classList.add('modal-item');
      userListItemDiv.classList.add('modal-user-list-item');
      userListItemDiv.id = escapeHtml(user.id.toString());
      userIdArray.push(user.id);

      // User Status
      const loginStatusDiv = document.createElement('div');
      loginStatusDiv.classList.add('modal-login-status');
      loginStatusDiv.classList.add('modal-logout');

      // User Info
      const userInfoDiv = document.createElement('div');
      userInfoDiv.classList.add('modal-user-info');

      const userPhotoDiv = document.createElement('div');
      userPhotoDiv.classList.add('modal-user-photo');
      const userPhotoImg = document.createElement('img');
      userPhotoImg.src = userImgSrc;
      userPhotoImg.alt = 'user photo';
      userPhotoDiv.appendChild(userPhotoImg);

      const userNameDiv = document.createElement('div');
      userNameDiv.classList.add('modal-user-name');
      const userNameSpan = document.createElement('span');
      userNameSpan.textContent = escapeHtml(user.username);
      userNameDiv.appendChild(userNameSpan);

      const userInviteDiv = document.createElement('div');
      userInviteDiv.classList.add('modal-user-invite');
      const userInviteBtn = document.createElement('button');
      userInviteBtn.type = 'button';
      userInviteBtn.classList.add('btn', 'btn-outline-light');
      userInviteBtn.classList.add('inviteUser');
      userInviteBtn.textContent = 'Invite';

      userInfoDiv.appendChild(userPhotoDiv);
      userInfoDiv.appendChild(userNameDiv);
      userListItemDiv.appendChild(loginStatusDiv);
      userListItemDiv.appendChild(userInfoDiv);
      userListItemDiv.appendChild(userInviteDiv);
      userInviteDiv.appendChild(userInviteBtn);
      userItem.appendChild(userListItemDiv);
      userList.appendChild(userItem);
    }

    this.listenUserLogin(userIdArray);
    this.checkUserIsFriend();
    this.inviteUser();
  }

  listenUserLogin(array) {
    if (userState.getState().socketStatus === 'offline') {
      const allLoginStatus = this.modalInstance._element.querySelectorAll(
        '.modal-login-status'
      );
      allLoginStatus.forEach((loginStatus) => {
        loginStatus.classList.remove('modal-logout');
        loginStatus.classList.add('modal-offline');
      });
      return;
    }

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
      }, 1000);
    });

    waitForSocketOpen
      .then(() => {
        const checkLoginInterval = setInterval(() => {
          userSocket.send(JSON.stringify({ userid: array }));
        }, 1000);

        if (userState.getState().socketViewAll) {
          const previousInterval = userState.getState().socketViewAll;
          clearInterval(previousInterval);
        } else {
          userState.setState({ socketViewAll: checkLoginInterval }, false);
        }
      })
      .catch(() => {
        const allLoginStatus = this.modalInstance._element.querySelectorAll(
          '.modal-login-status'
        );
        allLoginStatus.forEach((loginStatus) => {
          loginStatus.classList.remove('modal-logout');
          loginStatus.classList.add('modal-offline');
        });
      });
  }

  async checkUserIsFriend() {
    const friendList = await getFriendList();

    if (!friendList) {
      return;
    }

    friendList.then((friends) => {
      const friendIds = friends.map((friend) => friend.id);

      const allInviteButtons =
        this.modalInstance._element.querySelectorAll('.inviteUser');

      allInviteButtons.forEach((button) => {
        if (friendIds.includes(parseInt(button.closest('.modal-item').id))) {
          button.disabled = true;
        }
      });
    });
  }

  inviteUser() {
    const inviteButtons =
      this.modalInstance._element.querySelectorAll('.inviteUser');

    inviteButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        const friendId = e.target.closest('.modal-item').id;
        await inviteUser(friendId);
        button.disabled = true;
      });
    });
  }

  handleHidden() {
    this.modalInstance._element.remove();
    clearInterval(userState.getState().socketViewAll);
    userState.setState({ socketViewAll: null }, false);
    globalState.setState({ viewAllModal: null });
  }

  show() {
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }
}
