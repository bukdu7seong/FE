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
            <button type="button" class="btn btn-primary" id='change-password-modal-change'></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function changeUserPassword(oldPassword, newPassword) {
  const accessToken = await getAccessToken(); // 쿠키에서 사용자 토큰 가져오기
  const url = `${ACCOUNT_API_URL}/api/account/change-password/`; // 엔드포인트

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 포함
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }), // 비밀번호 변경 데이터 포함
    });

    if (!response.ok) {
      // 요청이 성공하지 않은 경우, 응답 본문과 상태 코드를 포함한 오류 객체 반환
      const errorData = await response.json();
      return { success: false, status: response.status, data: errorData };
    }

    const data = await response.json();
    console.log('Password changed successfully:', data);
    // 요청이 성공한 경우, 성공 데이터 반환
    return { success: true, data: data };
  } catch (error) {
    console.error('Error changing password:', error);
    // 네트워크 오류 등의 문제가 발생한 경우, 오류 정보 반환
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

    // 'submit' 이벤트 리스너 추가
    const form = this.modalInstance._element.querySelector(
      '#passwordChangeForm'
    );
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // 기본 제출 동작 방지
      this.checkInput();
    });

    this.modalInstance._element
      .querySelector('.btn-primary')
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
      errorMessageElement.textContent = '비밀번호 형식이 올바르지 않습니다.';
      return; // 함수 종료
    } else if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = '새 비밀번호가 일치하지 않습니다.';
      return; // 함수 종료
    } else {
      errorMessageElement.textContent = ''; // 에러 메시지 초기화
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
      this.hide(); // 변경 성공 시 모달 숨김
    } else {
      // 비밀번호 변경 실패 처리
      if (result.status === 400) {
        errorMessageElement.textContent = '현재 비밀번호가 정확하지 않습니다.';
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
