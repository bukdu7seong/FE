function toastHTML(message) {
  return `
    <div id="successToast" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
}

export class successToast {
  constructor(message = 'Success!') {
    this.toastHTML = toastHTML(message);
    this.toastInstance = null;
    this.initToast();
  }

  initToast() {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      document.body.insertAdjacentHTML('beforeend', this.toastHTML);
    } else {
      toastContainer.insertAdjacentHTML('beforeend', this.toastHTML);
    }

    this.toastInstance = new bootstrap.Toast(
      document.getElementById('liveToast')
    );

    this.toastInstance._element.addEventListener(
      'hidden.bs.toast',
      this.handleHidden.bind(this)
    );
  }

  handleHidden() {
    this.toastInstance._element.remove();
    if (document.getElementById('successToast')) {
      document.getElementById('successToast').remove();
    }
  }

  show() {
    this.toastInstance.show();
  }

  hide() {
    this.toastInstance.hide();
  }
}
