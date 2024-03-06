import { globalState } from '../../../../lib/state/state.js';
import { successToast } from '../toast/success.js';
import { failureToast } from '../toast/failure.js';
import { getBase64 } from '../../../utils/getBase64.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Change Profile Image</h1>
          </div>
          <div class="modal-body">
            <input type="file" id="newProfileImage" accept="image/*" required>
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

async function updateUserImage(image) {
  try {
    const accessToken = sessionStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(
      'http://localhost:8000/api/account/update-image/',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
      userState.setState({ userImage: data.image });
    }
  } catch (error) {
    const toast = new failureToast(error.message);
    toast.show();
    setTimeout(() => {
      toast.hide();
    }, 3000);
  }
}

export class changeUserImageModal {
  constructor(modalId = 'changeUserImageModal') {
    this.modalHTML = modalHTML(modalId);
    this.modalId = modalId;
    this.inputFile = null;
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

  changeImage() {
    updateUserImage(this.inputFile);
  }

  popToast() {
    this.successToast = new successToast('Successfully changed image!');
    this.successToast.show();
    setTimeout(() => {
      this.successToast.hide();
      this.successToast = null;
    }, 4242);
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
