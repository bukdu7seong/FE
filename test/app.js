const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const loginButton = document.querySelector('#login-form button');
const greeting = document.querySelector('#greeting');

const link = document.querySelector('a');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  // event -> 리스너로 전달받은
  event.preventDefault(); // 브라우저의 기본 동작(새로고침)을 안하게 함. username이 새로고침 되면서 지워지기 때문.
  loginForm.classList.add(HIDDEN_CLASSNAME);

  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);

  console.log(event);
  console.log('username: ', username);

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json()) // res.json()은 promise를 반환함.
    .then((data) => {
    //   if (data.status === 'ok') {
    //     window.location.pathname = '/profile';
    //   } else if (data.status === 'fail') {
    //     // 실패 경고
    //     window.location.pathname = '/login';
    //   } else {
    //     Navigate('/404'); // 이거 맞나
    //   }
    });
  /* Todo.
토큰 저장 로직
로그인 실패 시 로직
*/
}

/*
42 로그인
요청
ㄹ
ㄹ
code
email 다르면 회원가입 백엔드?

// function handleLinkClick(event) {
//   event.preventDefault();
//   console.dir(event);
// }

// link.addEventListener('click', handleLinkClick); // handleLinckClick()이 아니라 handleLinkClick으로 넣어야함. ->
// // event의 종류는 여러가지가 있음. console.log(event)를 찍어보면 어떤 이벤트인지 확인할 수 있음.

function paintGreeting(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const saveUsername = localStorage.getItem(USERNAME_KEY); // 토큰으로 바꾸기

if (saveUsername === null) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onLoginSubmit); // addEventListener안에 있는 함수는 직접 실행하지 않고, 브라우저가 실행 해줌.
} else {
  paintGreeting(saveUsername);
}
