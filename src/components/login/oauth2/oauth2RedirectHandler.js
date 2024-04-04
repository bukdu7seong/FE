import { firstRoute, redirectRoute } from '../../../../lib/router/router.js';
import { globalState, userState } from '../../../../lib/state/state.js';
import { setCookie } from '../../../utils/cookie.js';
import { requestUserInfo } from '../sign_in.js';

async function sendAuthCodeToBackend(code) {
  const url = `http://localhost:8000/api/account/42code/${code}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const responseData = await response.json(); // 비동기
      // console.log(responseData);
      setCookie(responseData);
      requestUserInfo();
      globalState.setState({
        isLoggedIn: true,
      });
      localStorage.removeItem('code');
      firstRoute('/profile'); // 성공적인 로그인 후 리다이렉트
    }
    else if (response.status === 301) {
      const responseData = await response.json();
      console.log(responseData);
      userState.setState({
        userEmail: responseData.email,
      });
      redirectRoute('/twofa', false); // 2FA 페이지로 리다이렉트
      // console.log('301: Two Factor Authentication required');
    } else {
      // 서버가 응답한 다른 상태 코드 처리
      const errorData = await response.json();
      console.error(`Error ${response.status}:`, errorData);
      throw new Error(response.status.toString());
    }
  } catch (e) {
    // 네트워크 오류 또는 response.ok가 false일 때의 예외 처리
    console.error('Error:', e);
    switch (e.message) {
      case '400':
        alert('400: Bad Request');
        break;
      case '404':
        alert('404: Not Found');
        break;
      default:
        alert('An unexpected error occurred');
        break;
    }
    redirectRoute('/error', false); // 오류 페이지로 리다이렉트
  }
}

export function handleOAuth2Redirect() {
  const code = localStorage.getItem('code');

  if (code) {
    console.log('Authorization code:', code);
    console.log('API 호출 전');
    sendAuthCodeToBackend(code); // API 호출 후 완료를 기다림
    console.log('API 호출 후');

    // 리다이렉트 수행
    // 예: redirectRoute('/login');
  } else {
    // 에러 처리
    console.error('OAuth2 Error:', error);
  }
}