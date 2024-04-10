import { setCookie } from '../../utils/cookie.js';
import { firstRoute } from '../../../lib/router/router.js';
import { globalState, userState } from '../../../lib/state/state.js';
import { ACCOUNT_API_URL } from '../../utils/api.js';

async function requestResend(resendInfo, resendError) {
  try {
    const response = await fetch(`${ACCOUNT_API_URL}/api/account/2fa/re/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userState.getState().userEmail }),
    });

    if (response.status === 200) {
      if (resendInfo) {
        resendInfo.textContent = 'Email sent successfully.';
      } else {
        alert('Email sent successfully.');
      }
      const button = document.getElementById('resendEmailButton');
      if (button) {
        button.disabled = false;
      }
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        if (!resendError) {
          alert('400 Bad Request');
        } else {
          resendError.textContent = '400 Bad Request';
        }
        break;
      default:
        if (!resendError) {
          alert(
            `An unexpected error occurred: ${e.message} while resending the email.`
          );
        } else {
          resendError.textContent = `An unexpected error occurred: ${e.message}`;
        }
        break;
    }
  }
}

// [2FA 코드 인증 요청]
async function requestTwoFACode(code, codeError) {
  try {
    const response = await fetch(`${ACCOUNT_API_URL}/api/account/2fa/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        email: userState.getState().userEmail,
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const responseData = await response.json();
      setCookie('accessToken', responseData.access);
      globalState.setState({
        isLoggedIn: true,
      });

      firstRoute('/profile');
    } else {
      throw Error(response.status);
    }
  } catch (e) {
    switch (e.message) {
      case '400':
        if (!codeError) {
          alert('Invalid 2FA code.');
        } else {
          codeError.textContent = 'Invalid 2FA code.';
        }
        break;
      default:
        if (!codeError) {
          alert(`An unexpected error occurred: ${e.message}`);
        } else {
          codeError.textContent = `An unexpected error occurred: ${e.message}`;
        }
        break;
    }
    return;
  }
}

// [2FA 코드 재전송]
function resendEmail() {
  const resendBtn = document.getElementById('resendEmailButton');
  if (!resendBtn) {
    return;
  }

  resendBtn.addEventListener('click', function () {
    resendBtn.disabled = true;
    const resendInfo = document.getElementById('resendInfo') || null;
    const resendError = document.getElementById('resendError') || null;
    requestResend(resendInfo, resendError);
  });
  //
}

// [2FA 타이머]
function timer() {
  let time = 300;
  const timerId = setInterval(() => {
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
      clearInterval(timerId);
      return;
    }

    // setInterval로 초마다 시간 감소
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
    time--;

    if (time < 0) {
      clearInterval(timerId);
      timerElement.textContent =
        'Authentication time has expired. Please press the resend button.';
      timerElement.style.color = 'red';
      alert('Authentication time has expired. Please press the resend button.');
    }
  }, 1000);
}

// [2FA 코드 입력]
function verifyCode() {
  const codeBtn = document.getElementById('two-f-a-code');
  if (!codeBtn) {
    return;
  }

  codeBtn.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
      const codeError = document.getElementById('codeError') || null;
      requestTwoFACode(codeBtn.value, codeError);
    }
  });
}

// [2FA]
export function twoFA() {
  resendEmail();
  timer();
  verifyCode();
}
