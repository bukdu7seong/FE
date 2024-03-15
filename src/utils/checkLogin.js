import { route } from '../../lib/router/router.js';
import { globalState } from '../../lib/state/state.js';
import { routes } from '../app.js';

export function checkLogin() {
  const cookieArray = document.cookie.split('accessToken=');
  let accessToken = '';

  if (cookieArray.length > 1) {
    accessToken = cookieArray[1];
  }

  console.log(accessToken);

  // need to validate access token
  if (accessToken) {
    globalState.setState({ isLoggedIn: true });
  } else {
    globalState.setState({ isLoggedIn: false });
    route(routes, '/login', true, false);
  }
}
