import { logout } from '../components/common/logout.js';
import { ACCOUNT_API_URL } from './api.js';
import { getCookie, removeCookie, setCookie } from './cookie.js';

function parseJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export async function getAccessToken() {
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    return null;
  }

  const decodeToken = parseJwt(accessToken);
  if (!decodeToken) {
    removeCookie('accessToken');
    return null;
  }
  const expireTime = decodeToken.exp;
  const currentTime = Date.now() / 1000;

  if (expireTime <= currentTime) {
    removeCookie('accessToken');
    try {
      const response = await fetch(`${ACCOUNT_API_URL}/api/account/reissue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        setCookie('accessToken', data.access);
        return data.access;
      } else {
        throw new Error('Failed to reissue access token.');
      }
    } catch (e) {
      alert(e.message);
      logout();
      return null;
    }
  } else {
    return accessToken;
  }
}
