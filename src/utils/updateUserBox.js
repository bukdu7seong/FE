import { userState } from '../../lib/state/state.js';

export function updateUserBox() {
  const userBox = document.getElementsByClassName('user-box')[0];
  if (
    !userBox ||
    !userBox.querySelector('.user-image') ||
    !userBox.querySelector('.user-name')
  ) {
    return;
  }

  const userData = userState.getState();

  if (!userData.userImage) {
    userBox.querySelector('.user-image').src =
      '../../assets/images/profile/default.png';
  } else {
    userBox.querySelector('.user-image').src = userData.userImage;
  }

  userBox.querySelector('.user-name').textContent =
    'Welcome, ' + userData.userName;
}
