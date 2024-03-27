import { route } from '../../../lib/router/router.js';
import { userState } from '../../../lib/state/state.js';
import { getCookie, setCookie } from '../../../src/utils/cookie.js';

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
async function requestUserInfo(userID) {
  try {
    const accessToken = getCookie('accessToken');
    const response = await fetch(
      `http://localhost:8000/api/account/user-stats/${userID}/`,
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
      userState.setState({
        username: data.username,
        email: data.email,
        profileImage: data.profile_image,
        winRate: data.win_rate,
        win: data.win,
        loss: data.loss,
        image: requestImageFormData(response.url),
      });
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    console.log(e);
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
      setCookie(responseData);
      requestUserInfo(responseData.id);
      userState.setState({
        isLoggedIn: true,
      });

      route('/profile', true, false);
    } else if (response.status === 301) {
      const responseData = await response.json();
      console.log('responseData: ', responseData.email);
      userState.setState({
        isLoggedIn: true,
        userEmail: responseData.email,
      });
      console.log(
        'userState.getState().userEmail: ',
        userState.getState().userEmail
      );
      route('/twofa', true, false);
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
    route('/login', true, false);
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
