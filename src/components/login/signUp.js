import { userState } from '../../../lib/state/state.js';
import { redirectRoute, route } from '../../../lib/router/router.js';
import {
  validateUsername,
  validatePassword,
  validateImage,
} from './formValidator.js';
import { ACCOUNT_API_URL } from '../../utils/api.js';
import { getCookie, removeCookie, setCookie } from '../../utils/cookie.js';

async function requestSignUp(formData) {
  const tempToken = getCookie('tempToken');

  try {
    const response = await fetch(`${ACCOUNT_API_URL}/api/account/signup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
      body: formData,
    });

    if (response.status !== 201) {
      throw new Error(response.status);
    }

    removeCookie('tempToken');

    const data = await response.json();

    setCookie('accessToken', data.access);
    userState.setState({
      userEmail: data.email,
    });

    redirectRoute('/twofa');
  } catch (e) {
    console.log(e);
    switch (e.message) {
      case '400':
        alert('Failed to fetch 42 authentication token. Try login again.');
        break;
      case '415':
        alert('Unsupported Media Type. Try logging in again.');
        break;
      default:
        alert('Failed to proceed sign up process. Please login again.');
    }
    redirectRoute('/login', false);
  }
}

async function checkUsername(username, usernameError) {
  try {
    const response = await fetch(
      `${ACCOUNT_API_URL}/api/account/check/?username=${username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to check username.');
    }

    const exist = await response.json();

    if (exist) {
      throw new Error('The username is already in use.');
    }

    return true;
  } catch (e) {
    usernameError.textContent = e.message;
    return false;
  }
}

function checkAgree() {
  const signUpForm = document.getElementById('signup-form');
  if (!signUpForm) {
    return;
  }

  signUpForm.addEventListener('submit', function (e) {
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox) {
      return;
    }

    if (!agreeCheckbox.checked) {
      alert('You must agree to the privacy policy.');
      e.preventDefault();
    }
  });
}

function handleSignUpSubmit() {
  const signUpForm = document.getElementById('signup-form');
  if (!signUpForm) {
    return;
  }

  signUpForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById('usernameInput');
    const usernameError = document.getElementById('usernameError');
    if (!usernameInput || !usernameError) {
      return;
    }

    const username = usernameInput.value;

    if (!validateUsername(username, usernameError)) {
      return;
    }

    if (!(await checkUsername(username, usernameError))) {
      return;
    }

    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    if (!passwordInput || !passwordError) {
      return;
    }

    const password = passwordInput.value;

    if (!validatePassword(password, passwordError)) {
      return;
    }

    const imageInput = document.getElementById('imageInput');
    const imageError = document.getElementById('imageError');
    if (!imageInput || !imageError) {
      return;
    }

    const imageFile = imageInput.files[0];
    if (!validateImage(imageFile, imageError)) {
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('image', imageFile);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    requestSignUp(formData);
  });
}

export function signUp() {
  handleSignUpSubmit();
  checkAgree();
}
