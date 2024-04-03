import { redirectRoute, route } from '../../lib/router/router.js';
import { globalState, routeState } from '../../lib/state/state.js';
import { getCookie } from './cookie.js';

export async function checkLogin() {
  const accessToken = getCookie('accessToken') || null;
  const signUpCode = localStorage.getItem('code') || null;

  if (signUpCode) {
    redirectRoute('/signup');
    return;
  }

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    redirectRoute('/login');
  }
}
