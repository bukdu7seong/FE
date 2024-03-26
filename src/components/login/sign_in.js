import { route } from '../../../lib/router/router.js';
import { routes } from '../../app.js';
import { userState } from '../../../lib/state/state.js';
import { setCookie } from '../../../src/utils/cookie.js';

// [유저 정보 요청]
async function requestUserInfo(userID) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/account/${userID}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      userState.setState({
        username: data.username,
        email: data.email,
        profileImage: data.profile_image,
        winRate: data.win_rate,
        win: data.win,
        loss: data.loss,
      });
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      default:
        alert('Failed to proceed sign up process. Please login again.');
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
      // userID로 로그인 한 사람의 정보 요청하는 부분
      requestUserInfo(response.userID);
      userState.setState({
        isLoggedIn: true,
      });

      const responseData = await response.json(); // 비동기
      setCookie(responseData);

      route(routes, '/profile', true, false);
    } else if (response.status === 301) {
      console.log('sign in data:', response);
      console.log('sign in data:', response.email);
      console.log('sign in data:', response.userID);
      console.log('sign in data:', response.access);
      console.log('sign in data:', response.refresh);
      // 2FA가 인증 되었을 때
      userState.setState({
        isLoggedIn: true,
        userEmail: response.email,
      });
      route(routes, '/twofa', true, false);
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
        alert('Failed to proceed sign up process. Please login again.');
        break;
    }
    route(routes, '/login', true, false);
  }
}

// [42 OAuth 요청]
async function request42OAuth() {
  try {
    const response = await fetch('http://localhost:8000/api/account/42oauth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      window.location.href = data.url; // signup/
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '404':
        alert('404 Not Found: The user does not exist.');
        break;
      case '409':
        alert('409 Conflict: The 42 token has expired.');
        break;
      default:
        alert('UNSUPPORTED_MEDIA_TYPE');
    }
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
