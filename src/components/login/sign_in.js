import {
  firstRoute,
  redirectRoute,
  route,
} from '../../../lib/router/router.js';
import { globalState, userState } from '../../../lib/state/state.js';
import { getCookie, setCookie } from '../../../src/utils/cookie.js';
import { request42OAuth } from './oauth2/request42OAuth.js';

// [유저 이미지 요청]
async function requestImageFormData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response;
    }
    throw new Error(response.status.toString());
  } catch (e) {
    if (e.message === '400') {
      alert('400: Bad Request in requestImageFormData');
    } else {
      console.log('error: ', e);
    }
  }
}

// [유저 정보 요청]
export async function requestUserInfo() {
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

    if (response.status === 200) {
      const data = await response.json();
      const userData = data.user_info;
      const userGameInfo = data.game_info;

      userState.setState(
        {
          userImage: userData.img,
          userId: userData.user_id,
          userName: userData.username,
          userLanguage: userData.language,
          user2fa: userData.is_2fa,
          WinRate: userGameInfo.win_rate,
          Wins: userGameInfo.wins,
          Losses: userGameInfo.losses,
        },
        false
      );
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      default:
        alert('Failed to proceed sign in process. Please login again.');
        break;
    }
  }
}

// [로그인 요청]
async function requestLogin(credentials) {
  try {
    const response = await fetch('http://localhost:8000/api/account/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (response.status === 200) {
      const responseData = await response.json(); // 비동기
      setCookie('accessToken', responseData.access);
      requestUserInfo();
      globalState.setState({
        isLoggedIn: true,
      });

      firstRoute('/profile');
    } else if (response.status === 301) {
      const responseData = await response.json();
      userState.setState({
        userEmail: responseData.email,
      });
      redirectRoute('/twofa', false);
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
    redirectRoute('/login', false);
  }
}

// [42 OAuth 버튼]
function handleOAuthClick() {
  const oAuth = document.getElementById('42-Button');
  oAuth.addEventListener('click', function (e) {
    e.preventDefault();
    request42OAuth();
  });
}

// [회원가입 버튼]
function handleSignUpClick() {
  const signUp = document.getElementById('sign-up');
  signUp.addEventListener('click', function (e) {
    e.preventDefault();
    request42OAuth();
  });
}

// [로그인 버튼]
function handleSignInClick() {
  // [유저] ID와 PASSWORD 입력
  document
    .getElementById('signin-form')
    .addEventListener('submit', function (e) {
      e.preventDefault(); // 폼 제출 기본 이벤트 막기 (새로고침 방지) 보통 폼 제출, 링크 클릭 시 새로고침이 일어나는데 이를 막기 위해 사용
      const username = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;

      const credentials = {
        username: username,
        password: password,
      };
      // [프론트 -> 백] 로그인 요청과 함께 credentials 전달
      requestLogin(credentials);
    });
}

// [버튼 리스너]
export function signIn() {
  handleSignInClick();
  handleSignUpClick();
  handleOAuthClick();
}
