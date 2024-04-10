import { firstRoute, redirectRoute } from '../../../lib/router/router.js';
import { globalState, userState } from '../../../lib/state/state.js';
import { getCookie, setCookie } from '../../utils/cookie.js';
import { ACCOUNT_API_URL } from '../../utils/api.js';
import { request42OAuth } from './oauth2/request42OAuth.js';
import { logout } from '../common/logout.js';

// [로그인 요청]
async function requestLogin(userInfo) {
  try {
    const response = await fetch(`${ACCOUNT_API_URL}/api/account/signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
      credentials: 'include',
    });

    if (response.status === 200) {
      const responseData = await response.json(); // 비동기
      setCookie('accessToken', responseData.access);
      globalState.setState({
        isLoggedIn: true,
      });

      firstRoute('/profile');
    } else if (response.status === 301) {
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
      case '403':
        alert(
          '403: 2FA authentication is required. Please proceed with the authentication.'
        );
        break;
      default:
        alert('Failed to proceed sign in process. Please login again.');
        break;
    }
    logout();
  }
}

// [42 OAuth 버튼]
function handleOAuthClick() {
  const oAuth = document.getElementById('42-Button');
  if (!oAuth) {
    return;
  }

  oAuth.addEventListener('click', function (e) {
    e.preventDefault();
    request42OAuth();
  });
}

// [로그인 버튼]
function handleSignInClick() {
  const signInForm = document.getElementById('signin-form');
  if (!signInForm) {
    return;
  }

  signInForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');
    if (!usernameInput || !passwordInput) {
      return;
    }

    const username = usernameInput.value;
    const password = passwordInput.value;
    const userInfo = {
      username: username,
      password: password,
    };

    requestLogin(userInfo);
  });
}

// [버튼 리스너]
export function signIn() {
  handleSignInClick();
  handleOAuthClick();
}
