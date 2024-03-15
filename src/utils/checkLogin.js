import { route } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../app.js';

export function checkLogin() {
  const accessToken = document.cookie.split('accessToken=')[1];

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    route(routes, '/login', true, false);
  }
}
