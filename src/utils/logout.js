import { globalState, userState } from '../../lib/state/state.js';
import { removeCookie } from './cookie.js';

export function logout() {
  globalState.setState({ isLoggedIn: false });
  removeCookie('accessToken');
  if (userState.getState().userSocket) {
    userState.getState().userSocket.close();
  }
  window.location.href = '/login';
}
