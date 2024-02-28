import { changeUserNameModal } from './modal/modifyUserName.js';

const modals = ['changeUserName'];

// API 받아서 페이지 갱신하는 함수도 만들어야 한다.
export function profile() {
  modals.forEach((modalId) => {
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
