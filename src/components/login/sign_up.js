import { userState } from '../../../lib/state/state.js';
import { route } from '../../../lib/router/router.js';
import { routes } from '../../app.js';
import { setCookie } from '../../../src/utils/cookie.js';
import { validateUsername, validatePassword } from '../../utils/validator.js';

async function requestSignUp(formData) {
  try {
    const response = await fetch('http://localhost:8000/api/account/signup/', {
      method: 'POST',
      body: formData, // JSON 대신 formData 사용
    });

    if (response.status !== 201) {
      throw new Error(response.status);
    }

    const data = await response.json();

    userState.setState({
      isLoggedIn: true,
      userID: data.userID,
      username: data.username,
      userImage: data.image,
      userEmail: data.email,
    });
    setCookie(data);

    route(routes, '/twofa', true, false);
    return data;
  } catch (e) {
    console.log(e);
    if (e.message.includes('400')) {
      alert(
        '400: Failed to fetch 42 authentication token. Try logging in again.'
      );
    } else if (e.message.includes('415')) {
      alert('415: Unsupported Media Type. Try logging in again.');
    } else {
      alert('Sign up process failed. Try logging in again.');
    }
  }
}

function checkAgree() {
  document
    .getElementById('signup-form')
    .addEventListener('submit', function (event) {
      var agreeCheckbox = document.getElementById('agree');
      if (!agreeCheckbox.checked) {
        alert('You must agree to the privacy policy.');
        event.preventDefault();
      }
    });
}

function handleSignUpSubmit() {
  document
    .getElementsByClassName('form-signup')[0]
    .addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('usernameInput').value;
      const usernameError = document.getElementById('usernameError');
      if (!validateUsername(username, usernameError)) {
        return;
      }

      const password = document.getElementById('passwordInput').value;
      const passwordError = document.getElementById('passwordError');
      if (!validatePassword(password, passwordError)) {
        return;
      }

      const code = localStorage.getItem('code').replace('?code=', '');
      localStorage.removeItem('code');
      const image = document.getElementById('imageInput').files[0];

      const formData = new FormData();

      formData.append('username', username);
      formData.append('password', password);
      formData.append('code', code);
      if (image !== undefined) {
        formData.append('image', image);
      } else {
        formData.append('image', '');
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      requestSignUp(formData);
    });
}

export function signUp() {
  handleSignUpSubmit();
  checkAgree();
}
