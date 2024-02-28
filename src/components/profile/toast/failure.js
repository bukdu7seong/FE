function toastHTML(message) {
  return `
    <div id="failureToast" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="liveToast" class="toast" role="alert">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
}

export class failureToast {
  constructor(message = 'Failure!') {
    this.toastHTML = toastHTML(message);
    this.toastInstance = null;
    this.initToast();
  }

  initToast() {
    document.body.insertAdjacentHTML('beforeend', this.toastHTML);

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
    document.getElementById('failureToast').remove();
  }

  show() {
    this.toastInstance.show();
  }

  hide() {
    this.toastInstance.hide();
  }
}
