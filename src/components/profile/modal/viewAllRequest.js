import { globalState, userState } from '../../../../lib/state/state.js';
import { escapeHtml } from '../../../utils/validateInput.js';
import { getImageData } from '../data/imageData.js';
import { getRequestData } from '../data/requestData.js';
import { updateRequest } from '../updateRequest.js';
import { userProfileModal } from './userProfile.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-friend-request-content">
          <div class="modal-header">
            <h2 class="modal-title" id="viewAllRequestsModalTitle">Friend Request</h2>
          </div>
          <div class="modal-body modal-friend-request-list-body">
            <div class="modal-friend-request-list">
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

async function fetchRequestData(pageNumber = 1) {
  return await getRequestData(pageNumber);
}

export class viewAllRequestsModal {
  constructor(modalId = 'viewAllRequestsModal') {
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
        this.setHistoryList(1);
      }
    });

    prevSmallButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.setRequestList(this.currentPage);
      }
    });

    nextSmallButton.addEventListener('click', () => {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
        this.setRequestList(this.currentPage);
      }
    });

    nextBigButton.addEventListener('click', () => {
      if (this.currentPage < this.maxPage) {
        this.currentPage = this.maxPage;
        this.setHistoryList(this.maxPage);
      }
    });
  }

  setRequestList(pageNumber = 1) {
    const requestList = this.modalInstance._element.querySelector(
      '.modal-friend-request-list ul'
    );
    requestList.innerHTML = '';

    fetchRequestData(pageNumber).then((requestData) => {
      this.maxPage = requestData.totalPages;
      this.totalData = requestData.total;
      this.updatePageInfo();

      // API 상 friends와 차이가 없는지 확인해봐야 함
      if (!requestData.friends.length) {
        const requestItem = document.createElement('li');
        requestItem.textContent = 'No Friend Request';
        requestItem.textContent = i18next.t('viewAllRequestsModalNoFriend');
        requestList.appendChild(requestItem);
      } else {
        let requestIdArray = [];

        requestData.friends.forEach(async (result) => {
          const requestItem = document.createElement('li');
          const requestImage = await getImageData(result.img);
          const requestImgSrc = requestImage
            ? requestImage
            : '/assets/images/profile/default.png';

          // Friend Request Item
          const friendRequestItemDiv = document.createElement('div');
          friendRequestItemDiv.classList.add('modal-item');
          friendRequestItemDiv.classList.add('modal-friend-request-item');
          friendRequestItemDiv.id = escapeHtml(result.id.toString());
          requestIdArray.push(result.id);

          // Login Status
          const loginStatusDiv = document.createElement('div');
          loginStatusDiv.classList.add('modal-login-status');
          loginStatusDiv.classList.add('modal-logout');

          // Friend Request Info
          const friendRequestInfoDiv = document.createElement('div');
          friendRequestInfoDiv.className = 'modal-friend-request-info';

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

          acceptButton.addEventListener('click', () => {
            updateRequest(result.id, true);
            this.setRequestList(this.currentPage);
          });

          const declineButton = document.createElement('button');
          declineButton.type = 'button';
          declineButton.className = 'btn btn-danger';
          const declineImg = document.createElement('img');
          declineImg.src = '../assets/images/icon/x-lg.svg';
          declineImg.alt = 'decline';
          declineButton.appendChild(declineImg);

          declineButton.addEventListener('click', () => {
            updateRequest(result.id, false);
            this.setRequestList(this.currentPage);
          });

          // Friend Request Profile
          const friendRequestProfileDiv = document.createElement('div');
          friendRequestProfileDiv.className = 'friend-request-profile';
          const requestProfileBtn = document.createElement('button');
          requestProfileBtn.type = 'button';
          requestProfileBtn.classList.add('btn', 'btn-outline-light');
          requestProfileBtn.classList.add('userProfile');
          requestProfileBtn.textContent = 'Profile';
          friendRequestProfileDiv.appendChild(requestProfileBtn);

          requestProfileBtn.addEventListener('click', () => {
            const userId = result.id;
            const modal = new userProfileModal(userId);
            globalState.setState({ profileModal: modal });
            modal.show();
          });

          friendRequestInfoDiv.appendChild(friendRequestPhotoDiv);
          friendRequestInfoDiv.appendChild(friendRequestNameDiv);
          friendRequestBtnDiv.appendChild(acceptButton);
          friendRequestBtnDiv.appendChild(declineButton);
          friendRequestItemDiv.appendChild(loginStatusDiv);
          friendRequestItemDiv.appendChild(friendRequestInfoDiv);
          friendRequestItemDiv.appendChild(friendRequestBtnDiv);
          friendRequestItemDiv.appendChild(friendRequestProfileDiv);
          requestItem.appendChild(friendRequestItemDiv);
          requestList.appendChild(requestItem);
        });

        this.listenFriendLogin(requestIdArray);
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
    this.setRequestList(this.currentPage);
  }

  hide() {
    this.modalInstance.hide();
  }
}
function updateMultilingualContent() {
  document.getElementById('viewAllRequestsModalTitle').innerHTML = i18next.t('viewAllRequestsModalTitle');
}