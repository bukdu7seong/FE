import { userState } from '../../../../lib/state/state.js';
import { changeDateFormat } from '../../../utils/date.js';
import { escapeHtml } from '../../../utils/validateInput.js';
import {
  testHistoryData,
  testHistoryData2,
  testHistoryData3,
} from '../testData.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-history-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Game History</h2>
          </div>
          <div class="modal-body history-list">
            <div class="modal-history-list">
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

async function fetchHistoryData(pageNumber = 1) {
  // API로 변경해야 한다
  if (pageNumber === 1) {
    return testHistoryData;
  } else if (pageNumber === 2) {
    return testHistoryData2;
  } else if (pageNumber === 3) {
    return testHistoryData3;
  } else {
    return null;
  }
}

export class viewAllHistoryModal {
  constructor(modalId = 'viewAllHistoryModal') {
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

    this.setHistoryList(this.currentPage);

    const prevBigButton = document.querySelector(`.pagination .prev-big`);
    const prevSmallButton = document.querySelector(`.pagination .prev-small`);
    const nextSmallButton = document.querySelector(`.pagination .next-small`);
    const nextBigButton = document.querySelector(`.pagination .next-big`);

    prevBigButton.addEventListener('click', () => {
      this.currentPage = 1;
      this.setHistoryList(1);
    });

    prevSmallButton.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        this.setHistoryList(this.currentPage);
      }
    });

    nextSmallButton.addEventListener('click', () => {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
        this.setHistoryList(this.currentPage);
      }
    });

    nextBigButton.addEventListener('click', () => {
      this.currentPage = this.maxPage;
      this.setHistoryList(this.maxPage);
    });
  }

  setHistoryList(pageNumber = 1) {
    const historyList = document.querySelector('.modal-history-list ul');
    historyList.innerHTML = '';

    fetchHistoryData(pageNumber).then((historyData) => {
      this.maxPage = historyData.totalPages;
      this.totalData = historyData.total;
      this.updatePageInfo();

      if (!historyData.results.length) {
        const historyItem = document.createElement('li');
        historyItem.textContent = 'No data';
        historyList.appendChild(historyItem);
      } else {
        historyData.results.forEach((result) => {
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
