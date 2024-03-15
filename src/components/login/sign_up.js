import { userState } from '../../../lib/state/state.js';
import { route, routes } from '../../../lib/router/router.js';
import { setCookie } from '../../../src/utils/cookie.js';
import { validateUsername, validatePassword } from '../../utils/validator.js';

// function base64ToBytes(base64) {
//   const binString = atob(base64);
//   return Uint8Array.from(binString, (m) => m.codePointAt(0));
// }

// function bytesToBase64(bytes) {
//   const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
//   console.log('binString:', binString);
//   return btoa(binString);
// }

// base64
// async function requestSignUp(signUpInfo) {
//   return await fetch('http://localhost:8000/api/account/signup/', {
//     method: 'POST',
//     body: signUpInfo, // JSON 대신 formData 사용
//   })
//     .then((response) => {
//       console.log('response:', response);
//       if (response.status === 200) {
//         userState.setState({
//           isLoggedIn: true,
//           userID: response.body.userID,
//           username: response.body.username,
//           userImage: base64ToBytes(response.body.image),
//         });

//         setCookie(response);

//         route(routes, '/twofa');
//         return response.json();
//       }
//       throw Error(response.status);
//     })
//     .catch((e) => {
//       if (e.status === 400) {
//         console.log('400 Bad Request: 42 토큰 발급에 실패하였습니다.', e);
//       } else {
//         console.log('UNSUPPORTED_MEDIA_TYPE', e);
//       }
//     });
// }

async function requestSignUp(formData) {
  return await fetch('http://localhost:8000/api/account/signup/', {
    method: 'POST',
    body: formData, // JSON 대신 formData 사용
  })
    .then((response) => {
      console.log('response:', response);
      if (response.status === 201) {
        response.json().then((data) => {
          userState.setState({
            isLoggedIn: true,
            userID: data.userID,
            username: data.username,
            userImage: data.image,
            userEmail: data.email,
          });
        });

        setCookie(response.json());

        route(routes, '/twofa');
        return response.json();
      }
      throw Error(response.status);
    })
    .catch((e) => {
      if (e.status === 400) {
        console.log('400 Bad Request: 42 토큰 발급에 실패하였습니다.', e);
      } else if (e.status === 415) {
        console.log(
          '415 Unsupported Media Type: 42 토큰 발급에 실패하였습니다.',
          e
        );
      } else {
        console.log('UNSUPPORTED_MEDIA_TYPE', e);
      }
    });
}

function checkAgree() {
  document
    .getElementById('signup-form')
    .addEventListener('submit', function (event) {
      var agreeCheckbox = document.getElementById('agree');
      if (!agreeCheckbox.checked) {
        alert('개인정보 처리방침에 동의해야 합니다.');
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
      formData.append('image', image);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      //   const signUpInfo = {
      //     username: document.getElementById('usernameInput').value,
      //     password: document.getElementById('passwordInput').value,
      //     code: localStorage.getItem('code'),
      //     image: bytesToBase64(document.getElementById('imageInput').files[0]),
      //   };
      //   console.log('signUpInfo:', signUpInfo);
      requestSignUp(formData);
    });
}

export function signUp() {
  handleSignUpSubmit();
  checkAgree();
}
