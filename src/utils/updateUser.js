import { userState } from '../../lib/state/state.js';

export function updateUserName(name) {
  // API를 백엔드에 보내야 한다.
  // const response = changeUserNameApi(name);
  userState.setState({ userName: name });
}

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

  userBox.querySelector('.user-image').src = userData.userImageUrl;
  userBox.querySelector('.user-name').textContent =
    'Welcome, ' + userData.userName;
}
