import { userState } from '../../../../lib/state/state.js';
import { escapeHtml } from '../../../utils/validateInput.js';
import {
  testFriendData,
  testFriendData2,
  testFriendData3,
} from '../testData.js';

function modalHTML(modalId) {
  return `
      <div class="modal fade" id="${modalId}">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal-friend-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5">Friends</h2>
            </div>
            <div class="modal-body modal-friend-list-body">
              <div class="modal-friend-list-list">
                <ul></ul>
              </div>
            </div>
            <div class="modal-footer">
                <div class="pagination-container">
                <div class="total-pages">
                    <span>1-5 of 100</span>
                </div>
                <ul class="pagination">
                  <li class="page-item">
                    <button class="page-link prev-big">
                        <span>&laquo;</span>
                    </button>
                  </li>
                  <li class="page-item">
                    <button class="page-link prev-small">
                        <span>&lsaquo;</span>
                    </button>
                  </li>
                  <li class="page-item">
                    <button class="page-link next-small">
                        <span>&rsaquo;</span>
                    </button>
                  </li>
                  <li class="page-item">
                    <button class="page-link next-big">
                        <span>&raquo;</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function fetchFriendData(pageNumber = 1) {
  // API로 변경해야 한다
  if (pageNumber === 1) {
    return testFriendData;
  } else if (pageNumber === 2) {
    return testFriendData2;
  } else if (pageNumber === 3) {
    return testFriendData3;
  }
}

export class viewAllFriendsModal {
  constructor(modalId = 'viewAllFriendsModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.modalInstance = null;
    this.currentPage = 1;
    this.maxPage = 0;
    this.totalData = 0;
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

    this.setFriendList(this.currentPage);

    const prevBigButton = document.querySelector(`.pagination .prev-big`);
    const prevSmallButton = document.querySelector(`.pagination .prev-small`);
    const nextSmallButton = document.querySelector(`.pagination .next-small`);
    const nextBigButton = document.querySelector(`.pagination .next-big`);

    prevBigButton.addEventListener('click', () => {
      this.currentPage = 1;
      this.setFriendList(1);
    });

    prevSmallButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.setFriendList(this.currentPage);
      }
    });

    nextSmallButton.addEventListener('click', () => {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
        this.setFriendList(this.currentPage);
      }
    });

    nextBigButton.addEventListener('click', () => {
      this.currentPage = this.maxPage;
      this.setFriendList(this.maxPage);
    });
  }

  setFriendList(pageNumber = 1) {
    const friendList = document.querySelector('.modal-friend-list-list ul');
    friendList.innerHTML = '';

    fetchFriendData(pageNumber).then((friendData) => {
      this.maxPage = friendData.totalPages;
      this.totalData = friendData.total;
      this.updatePageInfo();

      if (!friendData.friends.length) {
        const friendItem = document.createElement('li');
        friendItem.textContent = 'No data';
        friendList.appendChild(friendItem);
      } else {
        friendData.friends.forEach((result) => {
          const friendItem = document.createElement('li');
          const friendImgSrc = `data:image/png;base64,${result.user_img}`;

          // Friend List Item
          const friendListItemDiv = document.createElement('div');
          friendListItemDiv.classList.add('modal-friend-list-item');
          friendListItemDiv.id = escapeHtml(result.id.toString());

          // Login Status
          const loginStatusDiv = document.createElement('div');
          loginStatusDiv.classList.add('modal-login-status');
          loginStatusDiv.classList.add('modal-logout');

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
      }
      this.listenFriendLogin();
    });
  }

  listenFriendLogin() {
    if (userState.getState().socketStatus === 'offline') {
      const allLoginStatus = document.querySelectorAll('.modal-login-status');
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
            const friendItem = document.getElementById(loginStatus.id);
            const loginStatusDiv = friendItem.querySelector(
              '.modal-login-status'
            );
            if (loginStatus.login) {
              loginStatusDiv.classList.remove('modal-logout');
              loginStatusDiv.classList.add('modal-login');
            } else {
              loginStatusDiv.classList.remove('modal-login');
              loginStatusDiv.classList.add('modal-logout');
            }
          });
        };
      })
      .catch(() => {
        const allLoginStatus = document.querySelectorAll('.modal-login-status');
        allLoginStatus.forEach((loginStatus) => {
          loginStatus.classList.remove('modal-logout');
          loginStatus.classList.add('modal-offline');
        });
      });
  }

  updatePageInfo() {
    const pageInfo = document.querySelector(
      '.pagination-container .total-pages'
    );
    pageInfo.textContent = `
        ${(this.currentPage - 1) * 5 + 1} 
        - ${
          this.currentPage * 5 < this.totalData
            ? this.currentPage * 5
            : this.totalData
        }
      of ${this.totalData}
    `;
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
