import { changeUserNameModal } from './modal/changeUserName.js';

const MODALS = ['changeUserName'];

function setModal() {
  MODALS.forEach((modalId) => {
    const modalTrigger = document.getElementById(modalId);
    modalTrigger.addEventListener('click', () => {
      let modal = null;

      switch (modalId) {
        case 'changeUserName':
          modal = new changeUserNameModal();
          break;
        default:
          break;
      }

      modal.show();
    });
  });
}

function setHistoryList() {
  // API 받아서 페이지 갱신하는 함수도 만들어야 한다.
}

// API 받아서 페이지 갱신하는 함수도 만들어야 한다.
export function profile() {
  setModal();
}
