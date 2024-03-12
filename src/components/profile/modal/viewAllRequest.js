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
        <div class="modal-content modal-request-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Friend Request</h2>
          </div>
          <div class="modal-body modal-request-list-body">
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
  // API로 변경해야 한다
  if (pageNumber === 1) {
    return testFriendData;
  } else if (pageNumber === 2) {
    return testFriendData2;
  } else if (pageNumber === 3) {
    return testFriendData3;
  }
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
      this.currentPage = 1;
    });

    prevSmallButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    });

    nextSmallButton.addEventListener('click', () => {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
      }
    });

    nextBigButton.addEventListener('click', () => {
      this.currentPage = this.maxPage;
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
        requestList.appendChild(requestItem);
      } else {
        requestData.friends.forEach((result) => {
          const requestItem = document.createElement('li');
          const requestImgSrc = `data:image/png;base64,${result.user_img}`;

          // Friend Request Item
          const friendRequestItemDiv = document.createElement('div');
          friendRequestItemDiv.classList.add('modal-item');
          friendRequestItemDiv.classList.add('modal-friend-request-item');
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
          profileButton.classList.add('btn', 'btn-outline-light');
          profileButton.classList.add('userProfile');
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
  }

  show() {
    this.modalInstance.show();
    this.setRequestList(this.currentPage);
  }

  hide() {
    this.modalInstance.hide();
  }
}
