import { firstRoute, redirectRoute } from '../../../../lib/router/router.js';
import { globalState, userState } from '../../../../lib/state/state.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getCode, setCode } from '../../../utils/code.js';
import { getCookie, removeCookie, setCookie } from '../../../utils/cookie.js';
import { logout } from '../../common/logout.js';

async function sendAuthCodeToBackend(code) {
  const url = `${ACCOUNT_API_URL}/api/account/42code/${code}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      // 로그인 성공
      const responseData = await response.json();
      setCookie('accessToken', responseData.access);
      globalState.setState({
        isLoggedIn: true,
      });

      firstRoute('/profile');
    } else if (response.status === 206) {
      // 회원가입
      const responseData = await response.json();
      const tempToken = getCookie('tempToken');
      if (tempToken) {
        removeCookie('tempToken');
      }
      setCookie('tempToken', responseData.access);

      redirectRoute('/signup');
    } else if (response.status === 301) {
      // 2FA 리다이렉트
      const responseData = await response.json();
      userState.setState({
        userEmail: responseData.email,
      });

      redirectRoute('/twofa');
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      case '404':
        alert('404: Not Found');
        break;
      default:
        alert(`An unexpected error occurred: ${e.message}`);
        break;
    }
    logout();
  }
}

export function handleOAuth2Redirect() {
  setCode(localStorage.getItem('code'));

  const code = getCode();

  if (code) {
    localStorage.removeItem('code');
    sendAuthCodeToBackend(code);
  } else {
    alert('No redirect code found.');
    logout();
  }
}
