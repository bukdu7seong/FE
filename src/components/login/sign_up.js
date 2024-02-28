async function requestSignUp() {
  return await fetch('http://localhost:8000/api/account/signup', {
    method: 'POST',
    body: formData, // JSON 대신 formData 사용
  })
    .then((response) => {
      console.log('response:', response);
      if (response.status === 201) {
        //   상태관리 함수에
        userState.setState({
          username: response.headers.get('access_token'),
          access_token: response.headers.get('refresh_token'),
          refresh_token: response.headers.get('user_id'),
        });
        // 쿠키에 저장하고, 프로필 페이지로 이동

        console.log('response:', response);
        return response.json();
      }
      throw Error(response.status);
    })
    .catch((e) => {
      //400_BAD_REQUEST
      if (e.status === 400) {
        console.log('BAD_REQUEST', e);
      } else {
        console.log('UNSUPPORTED_MEDIA_TYPE', e);
      }
    });
}

export function signUp() {
  document
    .getElementById('form-signup')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('usernameInput').value;
      const password = document.getElementById('passwordInput').value;
      const image = document.getElementById('imageInput').files[0];

      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('image', image);

      console.log('formData:', formData);
      requestSignUp(formData);
    });
}
