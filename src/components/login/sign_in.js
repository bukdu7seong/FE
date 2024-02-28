import { route, routes } from '../../../lib/router/router.js';
import { globalState, userState } from '../../../lib/state/state.js';

// [프론트 -> 백] 로그인 요청
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
  });
}

// [42 OAuth]
function OAuth_42() {
  const oAuth = document.getElementById('42-OAuth-Button');
  oAuth.addEventListener('click', async function (e) {
    e.preventDefault();
    console.log('42 Authenticator 버튼 클릭');
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
        console.log('data:', data);
        // window.location.href = data.url;
      });
  });
}

// // [42 code] 백엔드로 전송
// async function postCode(code) {
//   await fetch('http://localhost:8000/api/code/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ code: code }),
//   }).then((response) => {
//     console.log('postCode:', response);
//     if (response.status === 200) {
//       return response.json();
//     }
//   });
// }

// // [42 code] 요청
// async function fetchLocation() {
//   await fetch('https://api.intra.42.fr/oauth/authorize', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then((response) => {
//     console.log('fetchLocation:', response);
//     if (response.status === 200) {
//       postCode(response);
//     }
//   });
// }

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
      requestLogin(credentials)
        .then((response) => {
          console.log('123response:', response);
          if (response.status === 301) {
            userState.setState({
              isLoggedIn: true,
              accessToken: response.body.access,
              refreshToken: response.body.refresh,
            });
            sessionStorage.setItem('accessToken', response.body.access);
            route(routes, '/profile', true, false);
          } else {
            throw new Error(`${response.status} - ${response.message}`);
          }
        })
        .catch((e) => {
          console.error('로그인 요청 실패:', e);

          const errorMessageDiv = document.getElementById(
            'login-error-message'
          );
          errorMessageDiv.textContent =
            '로그인에 실패했습니다. 다시 시도해주세요.';
        });
    });
}

// [회원가입 버튼]
function handleSignUpClick() {
  const signUp = document.getElementById('sign-up');
  signUp.addEventListener('click', function () {
    route(routes, '/signup');
  });
}

export function signIn() {
  handleSignInClick();
  handleSignUpClick();
  OAuth_42();
}
