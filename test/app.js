const loginForm = document.querySelector('#form-signin');
const emailInput = document.querySelector('#form-signin input[type="email"]');
const passwordInput = document.querySelector(
  '#form-signin input[type="password"]'
);
const greeting = document.querySelector('#greeting');
const errorMessage = document.querySelector('#error-message');

// const loginButton = document.querySelector('#form-signin button');
// const link = document.querySelector('a');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'email';

function onLoginSubmit(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  Promise;
  // 테스트를 위해 fetch 대신에 직접 Promise를 반환하는 가짜 fetch 함수를 사용
  const fakeFetch = (url, options) => {
    // function(매개변수) {}, (매개변수) => { 함수 본문 }
    return new Promise((resolve, reject) => {
      // const response = {
      // 	status: 200,
      // 	json: () => Promise.resolve({ userId: 1, accessToken: 'veryL0oooo', '2fa': false, }),})

      // 가짜 응답 객체
      const fakeResponse = {
        status: 200,
        json: () =>
          Promise.resolve({
            userId: 1,
            accessToken: 'veryL0oooooOooO0000OongJWTv4lue',
            '2fa': false, // true나 false로 테스트 조건 변경 가능
          }),
        headers: {
          // 301을 받았을 때 Location이라는 헤더가 있으면 그 값을 반환하도록 설정.
          get: (header) => {
            if (header === 'Location') {
              return '/profile';
            }
          },
        },
      };
      // 성공 상태를 모방
      resolve(fakeResponse);
    });
  };

  fakeFetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, password }),
  })
    .then((response) => {
      //
      console.log('response: ', response);
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 301) {
        window.location.href = response.headers.get('Location');
      } else if (response.status === 401) {
        throw new Error(
          'Full authentication is required to access this resource'
        );
      } else if (response.status === 500) {
        throw new Error('Internal Server Error');
      }
    })
    .then((data) => {
      //
      console.log('data: ', data);
      if (data) {
        // sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('accessToken', data.accessToken);
        if (data['2fa']) {
          // 2FA 처리 로직
          /*
42 로그인
요청
ㄹ
ㄹ
code
email 다르면 회원가입 백엔드?
*/
        } else {
          window.location.pathname = '/profile';
        }
      }
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove(HIDDEN_CLASSNAME);
    });
}

// function handleLinkClick(event) {
//   event.preventDefault();
//   console.dir(event);
// }

// link.addEventListener('click', handleLinkClick); // handleLinckClick()이 아니라 handleLinkClick으로 넣어야함. ->
// // event의 종류는 여러가지가 있음. console.log(event)를 찍어보면 어떤 이벤트인지 확인할 수 있음.

const savedToken = sessionStorage.getItem('accessToken'); // 'accessToken'을 문자열로 수정
if (!savedToken) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreeting(savedToken);
}
