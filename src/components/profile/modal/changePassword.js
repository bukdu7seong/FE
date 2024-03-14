// 필요한 모듈 또는 유틸리티 가져오기
import { globalState, userState } from '../../../../lib/state/state.js';
import { successToast } from '../toast/success.js';
import { failureToast } from '../toast/failure.js';
// import { validatePassword } from '../../../utils/validatePassword.js'; // 가정: 새로운 비밀번호 유효성 검사 유틸리티

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${modalId}Label">비밀번호 변경</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="passwordChangeForm">
              <div class="mb-3">
                <label for="currentPassword" class="form-label" id='change-password-modal-current'></label>
                <input type="password" class="form-control" id="currentPassword" required>
              </div>
              <div class="mb-3">
                <label for="newPassword" class="form-label" id='change-password-modal-new'></label>
                <input type="password" class="form-control" id="newPassword" required>
              </div>
              <div class="mb-3">
                <label for="confirmPassword" class="form-label" id='change-password-modal-new-confirm'></label>
                <input type="password" class="form-control" id="confirmPassword" required>
              </div>
              <div id="password-error-message" class="text-danger"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='change-password-modal-cancel'></button>
            <button type="button" class="btn btn-primary" id='change-password-modal-change'></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function updatePassword(current, newPass) {
  // 비밀번호 변경 API 호출 로직
  // 여기서는 예시 로직으로 구성합니다.
}

export class changePasswordModal {
  constructor(modalId = 'changePasswordModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.modalInstance = null;
    this.successToast = null;
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
      .querySelector('.btn-primary')
      .addEventListener('click', this.checkInput.bind(this));
  }

  checkInput() {
    const currentPassword = this.modalInstance._element.querySelector('#currentPassword').value;
    const newPassword = this.modalInstance._element.querySelector('#newPassword').value;
    const confirmPassword = this.modalInstance._element.querySelector('#confirmPassword').value;
    const errorMessageElement = this.modalInstance._element.querySelector('#password-error-message');

    if (!validatePassword(newPassword)) {
      errorMessageElement.textContent = '비밀번호 형식이 올바르지 않습니다.';
    } else if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = '새 비밀번호가 일치하지 않습니다.';
    } else {
      this.changePassword(currentPassword, newPassword);
    }
  }

  async changePassword(current, newPass) {
    try {
      await updatePassword(current, newPass);
      this.popToast();
      this.hide();
    } catch (error) {
      const toast = new failureToast(error.message);
      toast.show();
      setTimeout(() => {
        toast.hide();
      }, 3000);
    }
  }

  popToast() {
    this.successToast = new successToast('비밀번호가 성공적으로 변경되었습니다!');
    this.successToast.show();
    setTimeout(() => {
      this.successToast.hide();
      this.successToast = null;
    }, 3000);
  }

  handleHidden() {
    this.modalInstance._element.remove();
  }

  show() {
    this.updateModalContent();
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }

  updateModalContent() {
    document.getElementById('changePasswordModalLabel').innerHTML = i18next.t('changePasswordModalLabel');
    document.getElementById('change-password-modal-current').innerHTML = i18next.t('change-password-modal-current');
    document.getElementById('change-password-modal-new').innerHTML = i18next.t('change-password-modal-new');
    document.getElementById('change-password-modal-new-confirm').innerHTML = i18next.t('change-password-modal-new-confirm');
    document.getElementById('change-password-modal-cancel').innerHTML = i18next.t('change-password-modal-cancel');
    document.getElementById('change-password-modal-change').innerHTML = i18next.t('change-password-modal-change');
  }
}
