const modalHTML = `
<div class="modal fade" id="changeUserNameModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Change Username</h1>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" id="newUsername"
        required minlength="2" maxlength="10" placeholder="Enter new username">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
`;

export class changeUserName {
  constructor(modalId = 'changeUserNameModal') {
    this.modalHTML = modalHTML;
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
      'shown.bs.modal',
      this.handleShow.bind(this)
    );

    this.modalInstance._element.addEventListener(
      'hidden.bs.modal',
      this.handleHidden.bind(this)
    );

    // https://getbootstrap.kr/docs/5.3/components/modal/#%eb%8b%a4%ec%96%91%ed%95%9c-%eb%aa%a8%eb%8b%ac-%ec%bd%98%ed%85%90%ec%b8%a0
    document
      .querySelector('.modal-footer .btn-primary')
      .addEventListener('click', this.checkInput.bind(this));
  }

  checkInput() {
    this.inputData = document.getElementById('newUsername').value;
    console.log('INPUT:', this.inputData);
    this.hide();
  }

  handleShow() {
    const inputField = document.getElementById('newUsername');
    inputField.value = '';
    this.inputData = '';
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
