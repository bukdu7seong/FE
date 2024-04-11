import { validatePassword } from '../../login/formValidator.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';
import { toastSuccess } from '../../../utils/success.js';
import { toastFail } from '../../../utils/fail.js';

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
            <button type="button" class="btn btn-success" id='change-password-modal-change'></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function changeUserPassword(oldPassword, newPassword) {
  const accessToken = await getAccessToken();
  const url = `${ACCOUNT_API_URL}/api/account/change-password/`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, status: response.status, data: errorData };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (error) {
    console.error('Error changing password:', error);

    return { success: false, status: 'NetworkError', data: error };
  }
}

export class changePasswordModal {
  constructor(modalId = 'changePasswordModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.modalInstance = null;
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

    const form = this.modalInstance._element.querySelector(
      '#passwordChangeForm'
    );
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkInput();
    });

    this.modalInstance._element
      .querySelector('.btn-success')
      .addEventListener('click', this.checkInput.bind(this));
  }

  checkInput() {
    const currentPassword =
      this.modalInstance._element.querySelector('#currentPassword').value;
    const newPassword =
      this.modalInstance._element.querySelector('#newPassword').value;
    const confirmPassword =
      this.modalInstance._element.querySelector('#confirmPassword').value;
    const errorMessageElement = this.modalInstance._element.querySelector(
      '#password-error-message'
    );

    if (!validatePassword(newPassword, errorMessageElement)) {
      errorMessageElement.textContent = i18next.t('invalidPasswordFormat');
      return;
    } else if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = i18next.t('newPasswordNotMatch');
      return;
    } else {
      errorMessageElement.textContent = '';
      this.changePassword(currentPassword, newPassword);
    }
  }

  async changePassword(current, newPass) {
    const result = await changeUserPassword(current, newPass);
    const errorMessageElement = this.modalInstance._element.querySelector(
      '#password-error-message'
    );

    if (result && result.success) {
      toastSuccess('passwordChangeSuccess');
      this.hide();
    } else {
      if (result.status === 400) {
        errorMessageElement.textContent = i18next.t('incorrectCurrentPassword');
      } else {
        toastFail('passwordChangeFail');
      }
    }
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
    document.getElementById('changePasswordModalLabel').innerHTML = i18next.t(
      'changePasswordModalLabel'
    );
    document.getElementById('change-password-modal-current').innerHTML =
      i18next.t('change-password-modal-current');
    document.getElementById('change-password-modal-new').innerHTML = i18next.t(
      'change-password-modal-new'
    );
    document.getElementById('change-password-modal-new-confirm').innerHTML =
      i18next.t('change-password-modal-new-confirm');
    document.getElementById('change-password-modal-cancel').innerHTML =
      i18next.t('change-password-modal-cancel');
    document.getElementById('change-password-modal-change').innerHTML =
      i18next.t('change-password-modal-change');
  }
}
