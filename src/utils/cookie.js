// [쿠키 설정]
export function setCookie() {
  document.cookie = `accessToken=${response.body.access}; path=/; secure; httponly`; // 'path=/'는 쿠키가 전체 사이트에서 유효, 'secure; httponly'는 쿠키가 보안 연결에서만 전송되고, 자바스크립트를 통해 접근할 수 없다는 걸 의미
  document.cookie = `refreshToken=${response.body.refresh}; path=/; secure; httponly`; // 리프레쉬 토큰도 같은 방식으로 쿠키에 저장
}
