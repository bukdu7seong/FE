import { route, routes, goToProfile } from '../../../lib/router/router.js';

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
  // DOMContentLoaded -> DOM이 로드되면 실행
  const button = document.getElementById('42-OAuth-Button');
  button.addEventListener('click', async function (e) {
    e.preventDefault(); // 폼의 기본 제출 동작을 막음
    console.log('42 Authenticator 버튼 클릭');

    // [2FA] 42 서버로 2FA 코드 전송
    await fetch('http://localhost:8000/api/account/42oauth/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.url;
        window.location.href = url;
      });
  });
}

// [42 code] 백엔드로 전송
async function postCode(code) {
  await fetch('http://localhost:8000/api/login/code/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code }),
  }).then((response) => {
    if (response.status === 200) {
      console.log('postCode:', response);
      return response.json();
    }
  });
}

// [42 code] 요청
async function fetchLocation() {
  await fetch('https://api.intra.42.fr/oauth/authorize', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    console.log('fetchLocation:', response);
    if (response.status === 200) {
      // 그리고 응답 코드를 api/login/code로 보내기
      postCode(response);
    }
  });
}

// [로그인 버튼] 클릭 시 로그인 요청
function handleSignInClick() {
  // [유저] ID와 PASSWORD 입력
  document
    .getElementById('signin-form')
    .addEventListener('submit', function (e) {
      e.preventDefault(); // 폼 제출 기본 이벤트 막기 (새로고침 방지) 보통 폼 제출, 링크 클릭 시 새로고침이 일어나는데 이를 막기 위해 사용
      console.log('로그인 버튼 클릭');

      // 입력된 이메일과 비밀번호 가져오기
      const username = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;

      const credentials = {
        username: username,
        password: password,
      };

      // [프론트 -> 백] 로그인 요청과 함께 credentials 전달
      requestLogin(credentials)
        .then((response) => {
          console.log(response);
          // 200 profile
          if (response.status === 200) {
            return goToProfile();
          }
          // 301 location
          if (response.status === 301) {
            return route(routes, '/2fa', true, false);
          }
          // 400 Bad Request
          throw new Error('400'); // -> catch로 이동
        })
        .then((data) => {
          // [백 -> 프론트] 생성된 JWT 토큰을 프론트로 전송
          console.log('data:', data);
          //   if (data && data.access) {
          //     // [프론트] 받은 JWT 토큰을 sessionStorage에 저장
          //     sessionStorage.setItem('accessToken', data.access);
          //     // [유저] 인증된 상태에서 서비스 사용
          //     console.log('로그인 성공, JWT 토큰 저장.');
          //     globalState.setState({ isLoggedIn: true });
          //     // user state 업데이트 필요
          //     route(routes, '/profile');
          //   } else {
          //     throw new Error('로그인 실패: JWT 토큰이 없어요.');
          //   }
        })
        .catch((error) => {
          if (error.status === 400) {
            console.error('400 Bad Request:', error);
          } else {
            console.error('로그인 요청 실패:', error);
          }
        });
    });
}

export function login() {
  handleSignInClick();
  handleSignUpClick();
  OAuth_42();
}

// [프론트 -> 백] 회원가입 요청
async function requestSignup(credentials) {
  console.log('username:', credentials.username);
  console.log('email:', credentials.email);
  console.log('password:', credentials.password);
  return await fetch('http://localhost:8000/api/account/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

// [회원가입 버튼] 클릭 시 회원가입 페이지로 이동
function handleSignUpClick() {
  document.getElementById('sign-up').addEventListener('click', function (e) {
    e.preventDefault();
    route(routes, '/signup');
  });
}
