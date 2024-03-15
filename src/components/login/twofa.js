import { setCookie } from '../../utils/cookie.js';
import { route, routes } from '../../../lib/router/router.js';
import { userState } from '../../../lib/state/state.js';

async function requestResend() {
  return await fetch('http://localhost:8000//api/account/2fa/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userState.getState('email') }),
  })
    .then((response) => {
      if (response.status === 200) {
        alert('인증번호가 재전송되었습니다.');
      } else {
        throw new Error(`${response.status} - ${response.message}`);
      }
    })
    .catch((e) => {
      if (response.status === 400) {
        console.log(e);
        console.log('400 Bad Request: 잘못된 요청입니다.');
      } else {
        console.log('error:', e);
      }
    });
}

// [2FA 코드 인증 요청]
async function requestTwoFACode(code) {
  try {
    const response = await fetch('http://localhost:8000/api/account/42code/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    if (response.status === 200) {
      setCookie(data);
      route(routes, '/profile');
    } else {
      throw Error(response.status);
    }
  } catch (e) {
    console.log('error:', e);
    if (response.status === 404) {
      console.log(e);
      console.log(' Not Found: 해당 사용자가 존재하지 않습니다.');
      route(routes, '/404', true, false);
    } else if (response.status === 409) {
      console.log(e);
      console.log(' Conflict: 42 토큰이 만료되었습니다.');
    } else {
      console.log('UNSUPPORTED_MEDIA_TYPE', e);
    }
  }
}

// [2FA 코드 재전송]
function resendEmail() {
  document
    .getElementById('resendEmailButton')
    .addEventListener('click', function () {
      requestResend();
    });
  //
}

// [2FA 코드 입력]
function verifyCode() {
  //click이 아닌 엔터 키로도 인증 가능하게.
  const code = document.getElementById('two-f-a-code');
  code.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
      console.log('Entered code: ' + code.value);
      // 백엔드로 코드 보내서 응답으로 access token 받아오는 함수
      alert('Entered code: ' + code.value);
      requestTwoFACode(code.value);
    }
  });
}

function timer() {
  let time = 300;
  const timer = document.getElementById('timer');
  const timerId = setInterval(() => {
    // setInterval로 1초마다 시간 감소
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    time--;

    if (time < 0) {
      clearInterval(timerId);
      timer.textContent =
        'Authentication time has expired. Please press the resend button.';
      timer.style.color = 'red';
    }
  }, 1000);
}

// [2FA]
export function twoFA() {
  resendEmail();
  verifyCode();
  timer();
}
