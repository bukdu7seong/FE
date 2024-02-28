import { changeUserName } from './modal/modifyUserName.js';

const modals = ['changeUserName'];

export function profile() {
  modals.forEach((modalId) => {
    const modalTrigger = document.getElementById(modalId);
    modalTrigger.addEventListener('click', () => {
      let modal = null;

      switch (modalId) {
        case 'changeUserName':
          modal = new changeUserName();
          break;
        default:
          break;
      }

      modal.show();
    });
  });
}
