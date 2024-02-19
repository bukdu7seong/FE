// [프론트 -> 백] 로그인 요청과 함께 nickname과 password 전달
function requestLogin(credentials) {
  // URL: localhost?/api/login -> 수정 필요
  return fetch('https://localhost/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // 폼 제출 기본 이벤트 막기 (새로고침 방지)

    // 입력된 이메일과 비밀번호 가져오기
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;

    // [유저] ID와 PASSWORD 입력
    const credentials = { nickname: email, password: password };

    // [프론트 -> 백] 로그인 요청과 함께 credentials 전달
    requestLogin(credentials)
      .then((response) => {
        // 새로운 유저인 경우 301 상태 코드와 함께 프로필 페이지로 리다이렉트
        if (response.status === 301) {
          // 백엔드 서버에서 Location 헤더를 설정해주면, 해당 위치로 리다이렉트.
          if (response.headers.has('Location')) {
            window.location.href = response.headers.get('Location');
          } else {
            console.error('Location 헤더가 없어서 리다이렉트를 못 해.');
          }
          return;
        }
        if (response.ok) {
          // 존재하는 유저인 경우 응답 처리
          return response.json();
        }
        throw new Error('로그인 실패'); // -> catch로 이동
      })
      .then((data) => {
        // [백 -> 프론트] 생성된 JWT 토큰을 프론트로 전송
        if (data && data.accessToken) {
          // [프론트] 받은 JWT 토큰을 sessionStorage에 저장
          sessionStorage.setItem('accessToken', data.accessToken);
          // [유저] 인증된 상태에서 서비스 사용
          console.log('로그인 성공, JWT 토큰 저장.');
          window.location.href = '/profile'; // 로그인 성공 후 프로필 페이지로 리다이렉트
        }
      })
      .catch((error) => console.error('로그인 요청 실패:', error));
  });

  // '42 Authenticator' 버튼에 대한 이벤트 리스너
  document
    .getElementById('42-authenticator')
    .addEventListener('click', function () {
      // '42 Authenticator' 인증 로직 처리
      console.log('42 Authenticator 버튼 클릭');
    });
});
