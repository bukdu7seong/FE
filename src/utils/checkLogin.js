import { route } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../app.js';

export async function checkLogin() {
  const accessToken = document.cookie.split('accessToken=')[1];
  if (accessToken) {
    // 2FA 설정 여부 확인 API 호출 예시
    const is2FAEnabled = await check2FAEnabled(accessToken);
    if (is2FAEnabled) {
      route(routes, '/2fa', true, false); // 2FA 페이지로 리다이렉트
    } else {
      route(routes, '/profile', true, false); // 프로필 페이지로 리다이렉트
    }
  } else {
    globalState.setState({ isLoggedIn: false });
    route(routes, '/login', true, false);
  }
}
