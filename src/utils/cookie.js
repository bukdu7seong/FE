// [쿠키 설정]
export function setCookie(data) {
  document.cookie = `accessToken=${data.access}; path=/; secure; secure`; // 'path=/'는 쿠키가 전체 사이트에서 유효, 'secure; httponly'는 쿠키가 보안 연결에서만 전송되고, 자바스크립트를 통해 접근할 수 없다는 걸 의미. secure는 https에서만 사용 가능
  document.cookie = `refreshToken=${data.refresh}; path=/; secure; secure`; // 리프레쉬 토큰도 같은 방식으로 쿠키에 저장
}

export function getCookie(name) {
  let cookies = document.cookie; // 모든 쿠키를 가져옵니다.
  let cookieArr = cookies.split(';'); // 쿠키들을 ';'를 기준으로 나눕니다.

  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split('='); // 각 쿠키를 '=' 기준으로 키와 값을 나눕니다.
    if(name === cookiePair[0].trim()) {
      // 찾고자 하는 키의 쿠키가 있다면 값을 디코딩하여 반환합니다.
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null; // 해당하는 쿠키가 없다면 null을 반환합니다.
}

export function removeCookie() {
  document.cookie =
    'accessToken=; path=/; secure; secure; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie =
    'refreshToken=; path=/; secure; secure; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
