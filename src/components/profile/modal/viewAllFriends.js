import { globalState, userState } from '../../../../lib/state/state.js';
import { escapeHtml } from '../../../utils/validateInput.js';
import { getFriendData } from '../data/friendData.js';
import { getImageData } from '../data/imageData.js';
import { userProfileModal } from './userProfile.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-friend-content">
          <div class="modal-header">
            <h2 class="modal-title" id="viewAllFriendsModalTitle">Friends</h2>
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
  `;
}

async function fetchFriendData(pageNumber = 1) {
  return await getFriendData(pageNumber);
}

export class viewAllFriendsModal {
  constructor(modalId = 'viewAllFriendsModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.modalInstance = null;
    this.profileModalInstance = null;
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

    const prevBigButton = this.modalInstance._element.querySelector(
      `.pagination .prev-big`
    );
    const prevSmallButton = this.modalInstance._element.querySelector(
      `.pagination .prev-small`
    );
    const nextSmallButton = this.modalInstance._element.querySelector(
      `.pagination .next-small`
    );
    const nextBigButton = this.modalInstance._element.querySelector(
      `.pagination .next-big`
    );

    prevBigButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage = 1;
        this.setFriendList(1);
      }
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
      if (this.currentPage < this.maxPage) {
        this.currentPage = this.maxPage;
        this.setFriendList(this.maxPage);
      }
    });
  }

  setFriendList(pageNumber = 1) {
    const friendList = this.modalInstance._element.querySelector(
      '.modal-friend-list-list ul'
    );

    fetchFriendData(pageNumber).then((friendData) => {
      this.maxPage = friendData.totalPages;
      this.totalData = friendData.total;
      this.updatePageInfo();

      if (!friendData.friends.length) {
        friendList.innerHTML = '';

        const friendItem = document.createElement('li');
        friendItem.textContent = i18next.t('viewAllFriendsModalNoData');
        friendList.appendChild(friendItem);
      } else {
        let friendIdArray = [];

        const friendPromises = friendData.friends.map(async (result) => {
          const friendItem = document.createElement('li');
          const userImage = await getImageData(result.img);
          const friendImgSrc = userImage
            ? userImage
            : '/assets/images/profile/default.png';

          // Friend List Item
          const friendListItemDiv = document.createElement('div');
          friendListItemDiv.classList.add('modal-item');
          friendListItemDiv.classList.add('modal-friend-list-item');
          friendListItemDiv.id = escapeHtml(result.id.toString());
          friendIdArray.push(result.id);

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
          friendProfileBtn.classList.add('userProfile');
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

          return friendItem;
        });

        Promise.all(friendPromises).then((friendItems) => {
          friendList.innerHTML = '';

          friendItems.forEach((friendItem) => {
            friendList.appendChild(friendItem);
          });
          this.listenFriendLogin(friendIdArray);
        });
      }
    });
  }

  listenFriendLogin(array) {
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
      }, 420);
    });

    waitForSocketOpen
      .then(() => {
        const checkLoginInterval = setInterval(() => {
          userSocket.send(JSON.stringify({ userid: array }));
        }, 420);

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

  updatePageInfo() {
    const pageInfo = this.modalInstance._element.querySelector(
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
    clearInterval(userState.getState().socketViewAll);
    userState.setState({ socketViewAll: null }, false);
    globalState.setState({ viewAllModal: null });
  }

  show() {
    updateMultilingualContent();
    this.modalInstance.show();
    this.setFriendList(this.currentPage);
  }

  hide() {
    this.modalInstance.hide();
  }
}
function updateMultilingualContent() {
  document.getElementById('viewAllFriendsModalTitle').textContent = i18next.t(
    'viewAllFriendsModalTitle'
  );
}
