import { route } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../../lib/router/router.js';

export function checkLogin() {
  const accessToken = sessionStorage.getItem('accessToken');

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    route(routes, '/login', true, false);
  }
}
