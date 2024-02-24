import { redirectRoute } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../app.js';

export function checkLogin() {
  const accessToken = sessionStorage.getItem('accessToken');

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    redirectRoute(routes, '/login');
  }
}
