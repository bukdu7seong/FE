import { userState } from '../../lib/state/state.js';

// API를 통해 받아와야 하지만 일단은 임시적인 부분.
const tempImages = [
  '../../assets/images/profile/profile_01.jpg',
  '../../assets/images/profile/profile_02.jpg',
  '../../assets/images/profile/profile_03.jpg',
  '../../assets/images/profile/profile_04.jpg',
];
const tempData = {
  userImageUrl: tempImages[Math.floor(Math.random() * tempImages.length)],
  userName: 'Guest',
}; // getUserData() 로 대체해야 함

export function updateUserInfo() {
  // API로 변경해야 한다.
  // const userData = getUserData();
  const userData = tempData;

  // 음... API 호출이 너무 빈번하지만 일단은 이렇게 처리.

  userState.setState(
    {
      userImageUrl: userData.userImageUrl,
      userName: userData.userName,
      userSocket: new WebSocket('ws://localhost:8080'),
    },
    false
  );
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
