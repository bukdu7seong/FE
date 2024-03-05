import { globalState, userState } from '../../lib/state/state.js';
import { failureToast } from '../components/profile/toast/failure.js';

// API를 통해 받아와야 하지만 일단은 임시적인 부분.
const tempImages = [
  '../../assets/images/profile/profile_01.jpg',
  '../../assets/images/profile/profile_02.jpg',
  '../../assets/images/profile/profile_03.jpg',
  '../../assets/images/profile/profile_04.jpg',
];
const tempData = {
  userImage: tempImages[Math.floor(Math.random() * tempImages.length)],
  userName: 'Guest',
}; // getUserData() 로 대체해야 함

export async function initUserInfo() {
  if (!globalState.getState().isLoggedIn) {
    return;
  }

  try {
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await fetch(
      'http://localhost:8000/api/account/user/profile-stats/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized access token. Please login again.');
      } else {
        throw new Error('Failed to fetch user data. Please login again.');
      }
    }

    const data = await response.json();
    const userData = data.user_info;

    // user data를 받아오고 나서, 유효성 검증을 해야 한다
    // XSS 공격 방지 필요: username, userImageUrl(base64)
    userState.setState(
      {
        userImage: userData.img,
        userId: userData.user_id,
        userName: userData.username,
        userLanguage: userData.language,
        user2fa: userData.is_2fa,
      },
      false
    );

    const connectWebSocket = async (attempt = 1) => {
      console.log('connecting...');
      const socket = new WebSocket('ws://localhost:8001/ws/friend/status');

      const timeout = setTimeout(() => {
        socket.close();
      }, 4242);

      socket.onopen = () => {
        clearTimeout(timeout);
        userState.setState({ userSocket: socket }, false);
      };

      socket.onerror = () => {
        clearTimeout(timeout);
        socket.close();
      };

      socket.onclose = () => {
        clearTimeout(timeout);
        if (attempt < 3) {
          setTimeout(() => {
            connectWebSocket(attempt + 1);
          }, 2121);
        } else {
          const toast = new failureToast(
            'Failed to connect to WebSocket server.'
          );
          toast.show();
          setTimeout(() => {
            toast.hide();
          }, 4242);
          userState.setState({ userSocket: null }, false);
        }
      };
    };

    await connectWebSocket();
  } catch (error) {
    alert(error);
    sessionStorage.removeItem('accessToken');
  }
}
