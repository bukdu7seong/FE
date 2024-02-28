import { validateInput } from '../../../utils/validateInput.js';
import { successToast } from '../toast/success.js';

function modalHTML(modalId) {
  return `<div class="modal fade" id="${modalId}">
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

    if (!validateInput(this.inputData)) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Only alphanumeric characters are allowed.';
    } else if (this.inputData.length === 0) {
      this.modalInstance._element.querySelector('#error-message').textContent =
        'Please enter a username.';
    } else {
      this.callAPI();
      this.popToast();
      this.hide();
    }
  }

  callAPI() {
    // API 호출
    // api ....
    console.log(this.inputData);
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
