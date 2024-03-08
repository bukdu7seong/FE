import { globalState, userState } from '../../../../lib/state/state.js';
import { successToast } from '../toast/success.js';
import { failureToast } from '../toast/failure.js';

function modalHTML(frontModalId, backModalId) {
  return `
  <div class='modal fade' id='${frontModalId}' tabindex='-1' aria-labelledby='confirm2FAModalLabel' aria-hidden='true'>
    <div class='modal-dialog modal-dialog-centered'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='confirm2FAModalLabel'>2단계 인증 확인</h5>
                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                2단계 인증을 진행하시겠습니까?
            </div>
            <div class='modal-footer'>
                <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>취소</button>
                <button type='button' class='btn btn-primary' data-bs-target='#codeInputModal' data-bs-toggle='modal'>확인</button>
            </div>
        </div>
    </div>
</div>

<!-- Code Input Modal -->
<div class='modal fade' id='${backModalId}' tabindex='-1' aria-labelledby='codeInputModalLabel' aria-hidden='true'>
    <div class='modal-dialog modal-dialog-centered'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='codeInputModalLabel'>인증 코드 입력</h5>
                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <form id='codeInputForm'>
                    <div class='mb-3'>
                        <label for='codeInput' class='form-label'>인증 코드</label>
                        <input type='text' class='form-control' id='codeInput' placeholder='코드를 입력하세요'>
                    </div>
                    <div class='mb-3'>
                        <small id='timer' class='text-muted'>남은 시간: 05:00</small>
                    </div>
                    <div class='d-grid gap-2 mb-3'>
                        <button type='submit' class='btn btn-primary'>코드 확인</button>
                        <button type='button' class='btn btn-outline-secondary'>코드 재전송</button>
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

async function update2FA() {
  try {
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await fetch(
      'http://localhost:8000//api/account/update-2fa/',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_2fa: userState.getState().user2fa}),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        globalState.setState({ isLoggedIn: false });
        throw new Error('Unauthorized access token. Please login again.');
      } else {
        throw new Error('Failed to change profile image.');
      }
    } else {
      const data = await response.json();
      userState.setState({ is_2fa:  !userState.getState().user2fa});
    }
  } catch (error) {
    popToast(failureToast, error.message);
  }
}

export class change2FA {
  constructor(frontModalId = 'confirm2FAModal', backModalId = 'codeInputModal') {
    this.modalHTML = modalHTML(frontModalId, backModalId);
    this.frontModalId = frontModalId;
    this.backModalId = backModalId;
    this.frontModalInstance = null;
    this.backModalInstance = null;
    this.initModal();
  }

  initModal() {
    document.body.insertAdjacentHTML('beforeend', this.modalHTML);

    this.frontModalInstance = new bootstrap.Modal(
      document.getElementById(this.frontModalId)
    );

    this.backModalInstance = new bootstrap.Modal(
      document.getElementById(this.backModalId)
    );

    // this.frontModalId._element.addEventListener(
    //   'hidden.bs.modal',
    //   this.handleHidden(this.frontModalInstance).bind(this)
    // );
    //
    // this.backModalId._element.addEventListener(
    //   'hidden.bs.modal',
    //   this.handleHidden(this.backModalInstance).bind(this)
    // );

    this.backModalInstance._element
      .querySelector('.btn-primary')
      .addEventListener('click', this.checkInput.bind(this));
  }

  checkInput() {
    this.inputFile =
      this.modalInstance._element.querySelector('#newProfileImage').files[0];

    if (!this.inputFile) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Please select an image.';
    } else {
      this.changeImage();
      this.popToast();
      this.hide();
    }
  }

  handleHidden(modalInstance) {
    modalInstance._element.remove();
  }


  show() {
    const is2FAEnabled = userState.getState().user2fa;
    if (is2FAEnabled) {
      popToast(successToast, '2FA 인증이 해제되었습니다.');
    } else {
      this.frontModalInstance.show();
    }
    userState.setState({ user2fa: !userState.getState().user2fa });
  }

  // hide() {
  //   this.frontModalInstance.hide();
  //   this.backModalInstance.hide();
  // }
}
