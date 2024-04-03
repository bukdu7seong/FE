import { redirectRoute, route } from '../../lib/router/router.js';
import { globalState, routeState } from '../../lib/state/state.js';
import { getCookie } from './cookie.js';

export async function checkLogin() {
  if (
    window.location.pathname === '/signup' &&
    window.location.search.includes('code')
  ) {
    localStorage.setItem('code', window.location.search);
    // redirectRoute('/signup');
    return;
  }

  const accessToken = getCookie('accessToken');
  // console.log('ACCESSTOKEN', accessToken);

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    redirectRoute('/login');
  }
}
