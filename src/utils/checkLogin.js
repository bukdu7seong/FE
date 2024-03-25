import { route } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../app.js';


export async function checkLogin() {
  const cookieArray = document.cookie.split('accessToken=');
  let accessToken = '';

  if (cookieArray.length > 1) {
    accessToken = cookieArray[1];
  }

  console.log(accessToken);
  
  // need to validate access token
  if (accessToken) {
    // 2FA 설정 여부 확인 API 호출 예시
    const is2FAEnabled = await check2FAEnabled(accessToken);
    if (is2FAEnabled) {
      // isLoggedIn?
      route(routes, '/2fa', true, false); // 2FA 페이지로 리다이렉트
    } else {
      globalState.setState({ isLoggedIn: true });
    }
  } else {
    globalState.setState({ isLoggedIn: false });
    route(routes, '/login', true, false);
  }
}
