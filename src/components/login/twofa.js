import { setCookie } from '../../utils/cookie.js';
import { route } from '../../../lib/router/router.js';
import { routes } from '../../app.js';
import { userState } from '../../../lib/state/state.js';

// [2FA 코드 재전송 요청]
async function requestResend() {
  try {
    const response = await fetch('http://localhost:8000/api/account/2fa/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userState.getState('email') }),
    });

    if (response.status === 200) {
      alert('Authentication code resent successfully.');
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    if (e.message === '400') {
      alert('400 Bad Request');
    } else {
      alert('UNSUPPORTED_MEDIA_TYPE');
    }
  }
}

// [2FA 코드 인증 요청]
async function requestTwoFACode(code) {
  console.log(code);
  try {
    const response = await fetch('http://localhost:8000/api/account/2fa/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        email: userState.getState().userEmail,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      setCookie(data);
      route(routes, '/profile', true, false);
    } else {
      throw Error(response.status);
    }
  } catch (e) {
    alert('error:', e);
    if (e.message.includes('404')) {
      alert('404 Not Found');
      route(routes, '/404', true, false);
    } else if (e.message.includes('409')) {
      alert('409 Conflict');
    } else {
      alert('UNSUPPORTED_MEDIA_TYPE');
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
  const code = document.getElementById('two-f-a-code');
  code.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
      alert('Entered code: ' + code.value);
      requestTwoFACode(code.value);
    }
  });
}

function timer() {
  let time = 300;
  const timer = document.getElementById('timer');
  const timerId = setInterval(() => {
    // setInterval로 초마다 시간 감소
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    time--;

    if (time < 0) {
      clearInterval(timerId);
      timer.textContent =
        'Authentication time has expired. Please press the resend button.';
      timer.style.color = 'red';
      alert('Authentication time has expired. Please press the resend button.');
    }
  }, 1000);
}

// [2FA]
export function twoFA() {
  resendEmail();
  verifyCode();
  timer();
}
