import { userState } from '../../../../lib/state/state.js';
import { escapeHtml, validateInput } from '../../../utils/validateInput.js';
import { redirectError, toastError } from '../../../utils/error.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';
import { toastSuccess } from '../../../utils/success.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="change-username">Change Username</h1>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="newUsername"
            required maxlength="10" placeholder="Enter new username (maximum length: 10)">
            <div id="error-message" class="text-danger"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="changeUserNameModalCloseButton">Close</button>
            <button type="button" class="btn btn-success" id="changeUserNameModalSaveButton">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function updateUserName(name) {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(
      `${ACCOUNT_API_URL}/api/account/change-username/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ new_username: name }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else if (response.status === 409) {
        throw new Error('Username already exists.');
      } else {
        throw new Error('Failed to change username.');
      }
    } else {
      userState.setState({ userName: name });
      return true;
    }
  } catch (error) {
    toastError(error.message);
    return false;
  }
}

export class changeUserNameModal {
  constructor(modalId = 'changeUserNameModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.inputData = '';
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

    this.modalInstance._element
      .querySelector('.btn-success')
      .addEventListener('click', this.checkInput.bind(this));
  }

  async checkInput() {
    this.inputData =
      this.modalInstance._element.querySelector('#newUsername').value;

    if (!validateInput(this.inputData)) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        i18next.t('alphanumericUsername');
    } else if (this.inputData.length === 0) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        i18next.t('emptyUsername');
    } else {
      if (await this.changeName()) {
        toastSuccess('changeUserNameSuccess');
        this.hide();
      }
    }
  }

  async changeName() {
    const result = await updateUserName(this.inputData);
    if (result === true) {
      const profileName = document.querySelector('.profile-name span');
      if (profileName) {
        profileName.innerHTML = `${escapeHtml(this.inputData)}`;
      }
    }
    return result;
  }

  handleHidden() {
    this.modalInstance._element.remove();
  }

  show() {
    updateMultilingualContent();
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }
}

function updateMultilingualContent() {
  document.getElementById('change-username').innerHTML =
    i18next.t('change-username');
  document.getElementById('newUsername').placeholder = i18next.t('newUsername');
  document.getElementById('changeUserNameModalCloseButton').innerHTML =
    i18next.t('changeUserNameModalCloseButton');
  document.getElementById('changeUserNameModalSaveButton').innerHTML =
    i18next.t('changeUserNameModalSaveButton');
}
