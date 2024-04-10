import { failureToast } from '../../common/toast/failure.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';
import { toastSuccess } from '../../../utils/success.js';
import { toastFail } from '../../../utils/fail.js';

function confirmDeletionModalHTML(modalId, finalModalId) {
  return `

<div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="confirmDeletionModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="confirmDeletionModalLabel">회원 탈퇴 확인</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id='confirm-deletion-modal-content'>
            정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='confirm-deletion-modal-cancel'>취소</button>
                <button type="button" class="btn btn-danger" data-bs-target="#${finalModalId}" data-bs-toggle="modal" id=confirm-deletion-modal-confirm>탈퇴하기</button>
            </div>
        </div>
    </div>
  `;
}

// 최종 확인 모달 HTML
function finalConfirmationModalHTML(modalId) {
  return `
<div class="modal fade" id='${modalId}' tabindex="-1" aria-labelledby="passwordConfirmModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="passwordConfirmModalLabel">비밀번호 확인</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="passwordConfirmForm">
                    <div class="mb-3">
                        <label for='password-confirm-form-input' class="form-label" id='password-confirm-form-content' >비밀번호를 입력하세요</label>
                        <input type="password" class="form-control" id='password-confirm-form-input' placeholder="비밀번호">  
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-danger" id='password-confirm-form-confirm'>탈퇴 확인</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  `;
}

function popToast(toastType, content) {
  const toast = new toastType(content);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 3000);
}

export class deleteUserModal {
  constructor(
    frontModalId = 'confirmDeletionModal',
    backModalId = 'finalConfirmModal'
  ) {
    this.frontModalHTML = confirmDeletionModalHTML(frontModalId, backModalId);
    this.backModalHTML = finalConfirmationModalHTML(backModalId);
    this.frontModalId = frontModalId;
    this.backModalId = backModalId;
    this.frontModalInstance = null;
    this.backModalInstance = null;
    this.status = 'front';
    this.processing = false;
    this.initModal();
  }

  initModal() {
    document.body.insertAdjacentHTML('beforeend', this.frontModalHTML);
    document.body.insertAdjacentHTML('beforeend', this.backModalHTML);

    this.frontModalInstance = new bootstrap.Modal(
      document.getElementById(this.frontModalId)
    );

    this.backModalInstance = new bootstrap.Modal(
      document.getElementById(this.backModalId)
    );

    this.frontModalInstance._element.addEventListener(
      'hidden.bs.modal',
      this.handleFrontHidden.bind(this)
    );

    this.backModalInstance._element.addEventListener(
      'hidden.bs.modal',
      this.handleBackHidden.bind(this)
    );

    this.frontModalInstance._element
      .querySelector('.btn-danger')
      .addEventListener('click', this.confirm.bind(this));

    this.backModalInstance._element
      .querySelector('.btn-danger')
      .addEventListener('click', this.finalizeDeletion.bind(this));

    document
      .getElementById('passwordConfirmForm')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        this.finalizeDeletion();
      });
  }

  confirm() {
    this.status = 'back';
    this.handleFrontHidden();
    this.backModalInstance.show();
  }

  async finalizeDeletion() {
    const passwordInput = document.getElementById('password-confirm-form-input');
    const password = passwordInput.value;
    if (!password) {
      toastFail('unsubscribePassword');
      return;
    }

    if (this.processing) return;
    this.processing = true;

    try {
      const success = await this.deleteUserAccount(password);
      if (success) {
        toastSuccess('unsubscribeSuccess');
        this.backModalInstance.hide();
      }
      this.processing = false;
    } catch (error) {
      popToast(failureToast, error.message);
      this.processing = false;
    }
  }
  handleBackHidden() {
    this.backModalInstance._element.remove();
  }

  handleFrontHidden() {
    if (this.status === 'back') {
      this.frontModalInstance._element.remove();
      return;
    }
    this.frontModalInstance._element.remove();
    this.backModalInstance._element.remove();
  }

  show() {
    this.updateModalContent();
    this.frontModalInstance.show();
  }

  async deleteUserAccount(password) {
    try {
      const accessToken = await getAccessToken();
      const url = `${ACCOUNT_API_URL}/api/account/delete-account/`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 204) {
        return true;
      } else if (response.status === 403) {
        throw new Error('비밀번호가 올바르지 않습니다.');
      } else {
        throw new Error('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      throw error;
    }
  }

  updateModalContent() {
    document.getElementById('confirmDeletionModalLabel').innerHTML = i18next.t(
      'confirmDeletionModalLabel'
    );
    document.getElementById('confirm-deletion-modal-content').innerHTML =
      i18next.t('confirm-deletion-modal-content');
    document.getElementById('confirm-deletion-modal-cancel').innerHTML =
      i18next.t('confirm-deletion-modal-cancel');
    document.getElementById('confirm-deletion-modal-confirm').innerHTML =
      i18next.t('confirm-deletion-modal-confirm');
    document.getElementById('passwordConfirmModalLabel').innerHTML = i18next.t(
      'passwordConfirmModalLabel'
    );
    document.getElementById('password-confirm-form-content').innerHTML =
      i18next.t('password-confirm-form-content');
    document.getElementById('password-confirm-form-input').placeholder =
      i18next.t('password-confirm-form-input');
    document.getElementById('password-confirm-form-confirm').innerHTML =
      i18next.t('password-confirm-form-confirm');
  }
}
