import { userState } from '../../../../lib/state/state.js';
import { escapeHtml, validateInput } from '../../../utils/validateInput.js';
import { testFriendData, testFriendData3 } from '../testData.js';

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
  // API로 변경해야 한다
  let user = testFriendData.friends.find((user) => user.username === username);
  return user || null;
}

async function getFriendList() {
  return testFriendData3.friends;
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

    if (!user) {
      const userItem = document.createElement('li');
      userItem.textContent = 'No data';
      userList.appendChild(userItem);
    } else {
      const userItem = document.createElement('li');
      const userImgSrc = `data:image/png;base64,${user.user_img}`;

      // User List Item
      const userListItemDiv = document.createElement('div');
      userListItemDiv.classList.add('modal-item');
      userListItemDiv.classList.add('modal-user-list-item');
      userListItemDiv.id = escapeHtml(user.id.toString());

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

    this.listenUserLogin();
    this.checkUserIsFriend();
    this.inviteUser();
  }

  listenUserLogin() {
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
        userSocket.onmessage = (event) => {
          const loginStatusList = JSON.parse(event.data); // {}

          loginStatusList.forEach((loginStatus) => {
            for (let [key, value] of Object.entries(loginStatus)) {
              const friendItem =
                this.modalInstance._element.getElementById(key);
              const loginStatusDiv = friendItem.querySelector('.login-status');
              if (value) {
                loginStatusDiv.classList.remove('logout');
                loginStatusDiv.classList.add('login');
              } else {
                loginStatusDiv.classList.remove('login');
                loginStatusDiv.classList.add('logout');
              }
            }
          });
        };
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

  checkUserIsFriend() {
    const friendList = getFriendList();

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
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const friendId = e.target.closest('.modal-item').id;
        console.log(friendId); // API 변경 필요
        button.disabled = true;
      });
    });
  }

  handleHidden() {
    this.modalInstance._element.remove();
  }

  show() {
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }
}