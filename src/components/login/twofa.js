import { setCookie } from '../../utils/cookie.js';
import {
  firstRoute,
  redirectRoute,
  route,
} from '../../../lib/router/router.js';
import { userState } from '../../../lib/state/state.js';
import { requestUserInfo } from './sign_in.js';

// [2FA 코드 재전송 요청]
async function requestResend() {
  try {
    const response = await fetch('http://localhost:8000/api/account/2fa/re/', {
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
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      default:
        alert('Failed to proceed sign up process. Please login again.');
    }
  }
}

// [2FA 코드 인증 요청]
async function requestTwoFACode(code) {
  //   console.log(code);
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
      const responseData = await response.json();
      setCookie(responseData);
      requestUserInfo();
      userState.setState({
        isLoggedIn: true,
      });

      firstRoute('/profile');
    } else {
      throw Error(response.status);
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      case '404':
        alert('404: Not Found');
        route('/404', true, false);
        break;
      case '409':
        alert('409: Conflict');
        break;
      default:
        alert('Failed to proceed sign up process. Please login again.');
    }
    redirectRoute('/login');
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
      alert(
        'Two-factor authentication completed successfully. You are now logged in.'
      );
      requestTwoFACode(code.value);
    }
  });
}

let globalTimerId = null;

// [2FA 타이머]
function timer() {
  if (globalTimerId !== null) {
    clearInterval(globalTimerId);
  }

  let time = 300; // 5분
  globalTimerId = setInterval(() => {
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
      clearInterval(globalTimerId);
      globalTimerId = null;
      return;
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
    time--;

    if (time < 0) {
      clearInterval(globalTimerId);
      timerElement.textContent =
        'Authentication time has expired. Please press the resend button.';
      timerElement.style.color = 'red';
      alert('Authentication time has expired. Please press the resend button.');
      globalTimerId = null;
    }
  }, 1000);
}

// [2FA]
export function twoFA() {
  resendEmail();
  verifyCode();
  timer();
}
