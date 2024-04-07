import { userState } from '../../../../lib/state/state.js';
import { changeDateFormat } from '../../../utils/date.js';
import { escapeHtml } from '../../../utils/validateInput.js';
import { getHistoryData } from '../data/historyData.js';
import { getImageData } from '../data/imageData.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-history-content">
          <div class="modal-header">
            <h2 class="modal-title" id="viewAllHistoryModalH2">Game History</h2>
          </div>
          <div class="modal-body modal-history-list-body">
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
  return await getHistoryData(pageNumber);
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
      if (this.currentPage < this.maxPage) {
        this.currentPage = this.maxPage;
        this.setHistoryList(this.maxPage);
      }
    });
  }

  setHistoryList(pageNumber = 1) {
    const historyList = document.querySelector('.modal-history-list ul');
    historyList.innerHTML = '';

    fetchHistoryData(pageNumber).then((historyData) => {
      this.maxPage = historyData.totalPages || 1;
      this.totalData = historyData.total || 0;
      this.updatePageInfo();

      if (!historyData.games.length) {
        const historyItem = document.createElement('li');
        historyItem.textContent = i18next.t('viewAllHistoryModalNoData');
        historyList.appendChild(historyItem);
      } else {
        historyData.games.forEach(async (result) => {
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
    updateMultilingualContent();
    this.modalInstance.show();
    this.setHistoryList(this.currentPage);
  }

  hide() {
    this.modalInstance.hide();
  }
}
function updateMultilingualContent() {
  document.getElementById('viewAllHistoryModalH2').innerHTML = i18next.t(
    'viewAllHistoryModalH2'
  );
}
