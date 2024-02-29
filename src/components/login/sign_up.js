import { userState } from '../../../lib/state/state.js';
import { route, routes } from '../../../lib/router/router.js';
import { setCookie } from '../../../src/utils/cookie.js';

async function requestSignUp(formData) {
  return await fetch('http://localhost:8000/api/account/signup/', {
    method: 'POST',
    body: formData, // JSON 대신 formData 사용
  })
    .then((response) => {
      console.log('response:', response);
      if (response.status === 200) {
        userState.setState({
          isLoggedIn: true,
          userID: response.body.userID,
          username: response.body.username,
          userImage: response.body.image,
          userEmail: response.body.email,
        });

        setCookie(response);

        route(routes, '/2fa');
        return response.json();
      }
      throw Error(response.status);
    })
    .catch((e) => {
      if (e.status === 400) {
        console.log('BAD_REQUEST', e);
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
        event.preventDefault(); // 폼 제출 방지
      }
    });
}

export function signUp() {
  document
    .getElementsByClassName('form-signup')[0]
    .addEventListener('submit', function (e) {
      e.preventDefault();

      // 유저 이름과 비밀번호 검증 로직 필요 가능성
      const username = document.getElementById('usernameInput').value;
      const password = document.getElementById('passwordInput').value;
      const email = document.getElementById('emailInput').value;
      const image = document.getElementById('imageInput').files[0];

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('image', image);

      requestSignUp(formData);
      checkAgree();
    });
}
