import { globalState, userState } from '../../../../lib/state/state.js';
import { successToast } from '../toast/success.js';
import { failureToast } from '../toast/failure.js';
import { validateUsername } from '../../../utils/formValidator.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Change Username</h1>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" id="newUsername"
            required maxlength="10" placeholder="Enter new username (maximum length: 10)">
            <div id="error-message" class="text-danger"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function updateUserName(name) {
  try {
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await fetch(
      'http://localhost:8000/api/account/change-username/',
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
        globalState.setState({ isLoggedIn: false });
        throw new Error('Unauthorized access token. Please login again.');
      } else {
        throw new Error('Failed to change username.');
      }
    } else {
      userState.setState({ userName: name });
    }
  } catch (error) {
    const toast = new failureToast(error.message);
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
}

export class changeUserNameModal {
  constructor(modalId = 'changeUserNameModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.inputData = '';
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
    this.inputData =
      this.modalInstance._element.querySelector('#newUsername').value;

    if (!validateUsername(this.inputData)) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Only alphanumeric characters are allowed.';
    } else if (this.inputData.length === 0) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Please enter a username.';
    } else {
      this.changeName();
      this.popToast();
      this.hide();
    }
  }

  changeName() {
    updateUserName(this.inputData);
    const profileName = document.querySelector('.profile-name span');
    if (profileName) {
      profileName.innerHTML = `${this.inputData}`;
    }
  }

  popToast() {
    this.successToast = new successToast('Successfully changed username!');
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
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }
}
