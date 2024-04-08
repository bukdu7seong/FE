import { redirectRoute, route } from '../../../lib/router/router.js';
import { globalState, routeState } from '../../../lib/state/state.js';
import { getCode } from '../../utils/code.js';
import { getCookie } from '../../utils/cookie.js';

export async function checkLogin() {
  const accessToken = getCookie('accessToken') || null;
  const tempToken = getCookie('tempToken') || null;
  const signUpCode = getCode() || null;

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else if (signUpCode && tempToken) {
    redirectRoute('/signup');
  } else if (signUpCode) {
    redirectRoute('/oauth2-redirect');
  } else {
    globalState.setState({ isLoggedIn: false });
    redirectRoute('/login');
  }
}
