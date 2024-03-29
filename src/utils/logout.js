import { globalState, userState } from '../../lib/state/state.js';
import { removeCookie } from './cookie.js';

export function logout() {
  globalState.setState({ isLoggedIn: false });
  removeCookie();
  if (userState.getState().userSocket) {
    userState.getState().userSocket.disconnect();
  }
  window.location.href = '/login';
}
