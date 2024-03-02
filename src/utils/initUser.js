import { globalState, userState } from '../../lib/state/state.js';

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

export function initUserInfo() {
  const loginState = globalState.getState().isLoggedIn;
  if (!loginState) {
    return;
  }

  // API로 변경해야 한다.
  // const userData = getUserData();
  const userData = tempData;

  // user data를 받아오고 나서, 유효성 검증을 해야 한다
  // XSS 공격 방지 필요

  userState.setState(
    {
      userImageUrl: userData.userImageUrl,
      userName: userData.userName,
      userSocket: new WebSocket('ws://localhost:8080'),
    },
    false
  );
}
