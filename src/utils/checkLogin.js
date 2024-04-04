import { redirectRoute, route } from '../../lib/router/router.js';
import { globalState, routeState } from '../../lib/state/state.js';
import { getCookie } from './cookie.js';

export async function checkLogin() {
  const accessToken = getCookie('accessToken') || null;
  const signUpCode = localStorage.getItem('code') || null;

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else if (signUpCode) {
    redirectRoute('/oauth2-redirect');
  } else {
    globalState.setState({ isLoggedIn: false });
    redirectRoute('/login');
  }
}
