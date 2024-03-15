import { route } from '../../../lib/router/router.js';
import { routes } from '../../app.js';
import { userState } from '../../../lib/state/state.js';
import { setCookie } from '../../../src/utils/cookie.js';

// [로그인 요청]
async function requestLogin(credentials) {
  // URL: localhost?/api/login -> 수정 필요
  console.log('username:', credentials.username);
  console.log('password:', credentials.password);
  return await fetch('http://localhost:8000/api/account/signin/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status === 200) {
        userState.setState({
          isLoggedIn: true,
        });

        setCookie(response.json());

        route(routes, '/profile', true, false);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((status) => {
      const errorMessageDiv = document.getElementById('login-error-message');
      if (status === 403) {
        alert('2FA 인증이 필요합니다. 인증을 진행해주세요.');
      } else {
        errorMessageDiv.textContent = '로그인에 실패했습니다.';
      }
    });
}

// [42 OAuth 요청]
async function request42OAuth() {
  await fetch('http://localhost:8000/api/account/42oauth', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log('data.url:', data.url);
      window.location.href = data.url; // signup
    })
    .catch((e) => {
      console.log('error:', e.status);
      if (e.status === 404) {
        console.log('404 Not Found: 해당 사용자가 존재하지 않습니다.', e);
      } else if (e.status === 409) {
        console.log('409 Conflict: 42 토큰이 만료되었습니다.', e);
      } else {
        console.log('UNSUPPORTED_MEDIA_TYPE', e);
      }
    });
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
