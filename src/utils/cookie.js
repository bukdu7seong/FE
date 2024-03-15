// [쿠키 설정]
export function setCookie(data) {
  document.cookie = `accessToken=${data.access}; path=/; secure; secure`; // 'path=/'는 쿠키가 전체 사이트에서 유효, 'secure; httponly'는 쿠키가 보안 연결에서만 전송되고, 자바스크립트를 통해 접근할 수 없다는 걸 의미. secure는 https에서만 사용 가능
  document.cookie = `refreshToken=${data.refresh}; path=/; secure; secure`; // 리프레쉬 토큰도 같은 방식으로 쿠키에 저장
}
