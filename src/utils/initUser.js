import { globalState, userState } from '../../lib/state/state.js';
import { failureToast } from '../components/profile/toast/failure.js';
import { successToast } from '../components/profile/toast/success.js';
import { getCookie, removeCookie } from './cookie.js';

export async function initUserInfo() {
  if (!globalState.getState().isLoggedIn) {
    return;
  }

  try {
    const accessToken = getCookie('accessToken');
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
    const userGameInfo = data.game_info;
    const imageResponse = await fetch(`http://localhost:8000${userData.img}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let userImage = '';

    if (imageResponse.ok) {
      userImage = imageResponse.url;
    } else if (imageResponse.status === 401) {
      throw new Error('Unauthorized access token. Please login again.');
    } else {
      // 이미지를 불러오지 못했을 때 기본 이미지로 대체
      alert('Failed to fetch user image.');
      userImage = '../assets/images/profile/default.png';
    }

    userState.setState(
      {
        userImage: userImage,
        userId: userData.user_id,
        userName: userData.username,
        userEmail: userData.email,
        userLanguage: userData.language,
        user2fa: userData.is_2fa,
        WinRate: userGameInfo.win_rate,
        Wins: userGameInfo.wins,
        Losses: userGameInfo.losses,
      },
      false
    );

    const connectWebSocket = async (attempt = 1) => {
      console.log('connecting...');
      const accessToken = getCookie('accessToken');
      const socket = new WebSocket(
        `ws://localhost:8000/ws/friend/status?token=${accessToken}`
      );

      const timeout = setTimeout(() => {
        socket.close();
      }, 4242);

      socket.onopen = () => {
        clearTimeout(timeout);
        userState.setState({ userSocket: socket }, false);
        userState.setState({ socketStatus: 'online' }, false);

        const toast = new successToast('Connect Success!');
        toast.show();
        setTimeout(() => {
          toast.hide();
        }, 4242);
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
          userState.setState({ socketStatus: 'offline' }, false);
        }
      };
    };

    await connectWebSocket();
  } catch (error) {
    alert(error);
    removeCookie();
    globalState.setState({ isLoggedIn: false });
  }

  // 페이지 리로드 혹은 페이지 전환, 브라우저를 닫을 시 소켓 연결을 끊는다.
  window.addEventListener('beforeunload', function (e) {
    const userData = userState.getState();

    if (userData.userSocket) {
      userData.userSocket.close();
    }
  });
}
