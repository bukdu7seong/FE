import { ACCOUNT_API_URL } from './api.js';
import { getCookie, removeCookie, setCookie } from './cookie.js';

function parseJwt(token) {
  // JWT는 세 부분으로 나뉘며, 각 부분은 '.'으로 구분됩니다.
  const base64Url = token.split('.')[1]; // 페이로드 부분을 선택합니다.
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL 인코딩을 Base64로 변환합니다.
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        // Base64로 디코딩된 문자열에서 각 문자를 URI 컴포넌트로 변환합니다.
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload); // JSON 문자열을 객체로 변환합니다.
}

export async function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNTUzMTc5LCJpYXQiOjE3MTI1NTEzNzksImp0aSI6ImRmODRmNzAwYjUyNTQyYWFiMDk5NjM0ZTJhZGY5MDY5IiwidXNlcl9pZCI6OX0.1Gj_XUvd7g82cfG8ACvm9HNgXPYmr0JwmuFNbdPTpik';

  const accessToken = getCookie('accessToken');

  if (!accessToken) {
    return null;
  }

  const decodeToken = parseJwt(accessToken);
  const expireTime = decodeToken.exp;
  const currentTime = Date.now() / 1000;

  if (expireTime <= currentTime) {
    removeCookie('accessToken');
    try {
      const response = fetch(`${ACCOUNT_API_URL}/api/account/reissue/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setCookie('accessToken', data.access);
        return data.access;
      } else {
        throw new Error(response.status.toString());
      }
    } catch (e) {
      alert(e.message);
      return null;
    }
  } else {
    return accessToken;
  }
}
