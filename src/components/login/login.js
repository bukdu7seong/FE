import { route } from '../../../lib/router/router.js';
import { globalState } from '../../../lib/state/state.js';
import { routes } from '../../app.js';

// [프론트 -> 백] 로그인 요청과 함께 nickname과 password 전달
async function requestLogin(credentials) {
  // URL: localhost?/api/login -> 수정 필요
  console.log('username:', credentials.username);
  console.log('password:', credentials.password);
  return await fetch('http://localhost:8000/account/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

// [프론트 -> 백] 로그인 요청과 함께 nickname과 password 전달
async function requestSignup(credentials) {
  // URL: localhost?/api/login -> 수정 필요
  console.log('username:', credentials.username);
  console.log('username:', credentials.email);
  console.log('password:', credentials.password);
  return await fetch('http://localhost:8000/account/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

// [2FA]
function twoFA() {
  // 42OAuth
  // DOMContentLoaded -> DOM이 로드되면 실행
  const button = document.getElementById('42-OAuth-Button');
  button.addEventListener('click', async function (e) {
    e.preventDefault(); // 폼의 기본 제출 동작을 막음
    console.log('42 Authenticator 버튼 클릭');

    // 42 서버로 2FA 코드 전송
    await fetch('http://localhost:8000/account/42oauth', {
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

// [회원가입 버튼] 클릭 시 회원가입 페이지로 이동
function handleSignUpClick() {
  document.getElementById('sign-up').addEventListener('click', function (e) {
    e.preventDefault(); // 기본 동작 막기
    // sign-up 페이지로 이동
    const target = navigate('sign-up', '/sign-up');
    renderAll(target);
    // 여기선 라우팅만 하고, 실제로 페이지를 렌더링하는 부분은 따로 있어야 함
  });
}

// [로그인 버튼] 클릭 시 로그인 요청
function handleSignInClick() {
  const loginForm = document.getElementById('login-form');

  // [유저] ID와 PASSWORD 입력
  loginForm.addEventListener('submit', function (e) {
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
        // 새로운 유저인 경우 301 상태 코드와 함께 프로필 페이지로 리다이렉트
        if (response.status === 301) {
          // 백엔드 서버에서 Location 헤더를 설정해주면, 해당 위치로 리다이렉트.
          if (response.headers.has('Location')) {
            window.location.href = response.headers.get('Location');
          } else {
            // console.error('Location 헤더가 없어서 리다이렉트를 못 해.');
          }
          return;
        }
        if (response.ok) {
          // 존재하는 유저인 경우 응답 처리
          return response.json();
        }
        throw new Error('로그인 실패'); // -> catch로 이동
      })
      .then((data) => {
        // [백 -> 프론트] 생성된 JWT 토큰을 프론트로 전송
        console.log(data);
        if (data && data.access) {
          // [프론트] 받은 JWT 토큰을 sessionStorage에 저장
          sessionStorage.setItem('accessToken', data.access);
          // [유저] 인증된 상태에서 서비스 사용
          console.log('로그인 성공, JWT 토큰 저장.');
          globalState.setState({ isLoggedIn: true });
          // user state 업데이트 필요
          route(routes, '/profile');
          // window.location.href = '/profile'; // 로그인 성공 후 프로필 페이지로 리다이렉트
        } else {
          throw new Error('로그인 실패: JWT 토큰이 없어요.');
        }
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
  handleSignInClick(); // 로그인 버튼 클릭 시 로그인 요청

  handleSignUpClick();

  twoFA(); // 2FA 코드 입력 및 인증 처리
}

// // DOM이 로드되면 실행
// document.addEventListener('DOMContentLoaded', () => {
//   handleSignInClick(); // 로그인 버튼 클릭 시 로그인 요청

//   handleSignUpClick();

//   twoFA(); // 2FA 코드 입력 및 인증 처리
// });
