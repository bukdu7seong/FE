import { userState } from '../../../../lib/state/state.js';
import { successToast } from '../../common/toast/success.js';
import { redirectError, throwError, toastError } from '../../../utils/error.js';
import { getCookie } from '../../../utils/cookie.js';
import { getImageData } from '../data/imageData.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';

function modalHTML(modalId) {
  return `
    <div class="modal fade" id="${modalId}">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="changeUserImageModalh1">Change Profile Image</h1>
          </div>
          <div class="modal-body">
            <input type="file" id="newProfileImage" accept="image/*" required>
            <div id="error-message" class="text-danger"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="changeUserImageModalCloseButton">Close</button>
            <button type="button" class="btn btn-primary" id="changeUserImageModalSaveButton">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function updateUserImage(image) {
  try {
    const formData = new FormData();
    const accessToken = await getAccessToken();
    formData.append('image', image);

    const response = await fetch(
      `${ACCOUNT_API_URL}/api/account/update-image/`,
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
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else {
        throw new Error('Failed to update user image.');
      }
    } else {
      const responseData = await response.json();
      const imagePath = responseData.image;
      const image = await getImageData(imagePath);

      userState.setState({ userImage: image });
      document.querySelector('.profile-photo img').src = image;
    }
  } catch (error) {
    toastError(error.message);
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
    updateMultilingualContent();
    this.modalInstance.show();
  }

  hide() {
    this.modalInstance.hide();
  }
}
function updateMultilingualContent() {
  document.getElementById('changeUserImageModalh1').innerHTML = i18next.t(
    'changeUserImageModalh1'
  );
  document.getElementById('changeUserImageModalCloseButton').innerHTML =
    i18next.t('changeUserImageModalCloseButton');
  document.getElementById('changeUserImageModalSaveButton').innerHTML =
    i18next.t('changeUserImageModalSaveButton');
}
