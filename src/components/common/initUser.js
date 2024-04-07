import { globalState, userState } from '../../../lib/state/state.js';
import { getCookie } from '../../utils/cookie.js';
import { toastSuccess } from '../../utils/success.js';
import { redirectError, throwError, toastError } from '../../utils/error.js';
import { changeLanguage } from '../language/language.js';
import { ACCOUNT_API_URL } from '../../utils/api.js';
import { getAccessToken } from '../../utils/token.js';

export async function initUserInfo() {
  if (!globalState.getState().isLoggedIn) {
    return;
  }

  try {
    const accessToken = getAccessToken();
    const response = await fetch(
      `${ACCOUNT_API_URL}/api/account/user/profile-stats/`, //
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
        throwError('Unauthorized access token. Please login again.');
      } else {
        throwError('Failed to fetch user data. Please login again.');
      }
    }

    const data = await response.json();
    const userData = data.user_info;
    const userGameInfo = data.game_info;
    const imageResponse = await fetch(`${ACCOUNT_API_URL}${userData.img}`, {
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
      throwError('Unauthorized access token. Please login again.');
    } else {
      // alert('Failed to fetch user image.');
      userImage = '/assets/images/profile/default_profile.png';
    }

    changeLanguage(userData.language.toLowerCase());
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
      const accessToken = getAccessToken();
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
        toastSuccess('Connect Success!');
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
          toastError('Failed to connect to WebSocket server.');
          userState.setState({ userSocket: null }, false);
          userState.setState({ socketStatus: 'offline' }, false);
        }
      };
    };

    await connectWebSocket();
  } catch (error) {
    redirectError(error.message);
  }

  // 페이지 리로드 혹은 페이지 전환, 브라우저를 닫을 시 소켓 연결을 끊는다.
  window.addEventListener('beforeunload', function (e) {
    const userData = userState.getState();

    if (userData.userSocket) {
      userData.userSocket.close();
    }
  });
}
