import { redirectRoute } from '../../../lib/router/router.js';
import { globalState } from '../../../lib/state/state.js';
import { getCode } from '../../utils/code.js';
import { getCookie } from '../../utils/cookie.js';
import { getAccessToken } from '../../utils/token.js';

export async function checkLogin() {
  const accessToken = await getAccessToken();
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

export async function preCheckLogin() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
  }
}
