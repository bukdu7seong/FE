// [쿠키 설정]
export function setCookie(name, data) {
  document.cookie = `${name}=${data}; path=/; secure;`;
}

export function getCookie(name) {
  let cookies = document.cookie; // 모든 쿠키를 가져옵니다.
  let cookieArr = cookies.split(';'); // 쿠키들을 ';'를 기준으로 나눕니다.

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split('='); // 각 쿠키를 '=' 기준으로 키와 값을 나눕니다.
    if (name === cookiePair[0].trim()) {
      // 찾고자 하는 키의 쿠키가 있다면 값을 디코딩하여 반환합니다.
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null; // 해당하는 쿠키가 없다면 null을 반환합니다.
}

export function removeCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
