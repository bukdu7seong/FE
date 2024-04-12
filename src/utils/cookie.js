// [쿠키 설정]
export function setCookie(name, data) {
  document.cookie = `${name}=${data}; path=/; secure;`;
}

export function getCookie(name) {
  let cookies = document.cookie;
  let cookieArr = cookies.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export function removeCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
