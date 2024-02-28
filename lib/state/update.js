import { userState } from './state.js';

// API를 통해 받아와야 하지만 일단은 임시적인 부분.
const tempImages = [
  '../../images/profile/profile_01.jpg',
  '../../images/profile/profile_02.jpg',
  '../../images/profile/profile_03.jpg',
  '../../images/profile/profile_04.jpg',
];
const tempData = {
  userImageUrl: tempImages[Math.floor(Math.random() * tempImages.length)],
  userName: 'Guest',
}; // getUserData() 로 대체해야 함

export function updateUserBox() {
  if (!document.getElementsByClassName('user-box')[0]) {
    return;
  }

  const userBox = document.getElementsByClassName('user-box')[0];
  if (
    !userBox.querySelector('.user-image') ||
    !userBox.querySelector('.user-name')
  ) {
    return;
  }

  // API로 변경해야 한다.
  // const userData = getUserData();
  const userData = tempData;

  // 한 번 데이터를 저장하면 다시 쿼리하지 않도록 해야할 듯. 일단 이건 나중에...

  userBox.querySelector('.user-image').src = userData.userImageUrl;
  userBox.querySelector('.user-name').textContent =
    'Welcome, ' + userData.userName;

  userState.setState(
    {
      userImageUrl: userData.userImageUrl,
      userName: userData.userName,
    },
    false
  );
}
