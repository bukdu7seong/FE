import { globalState, userState } from '../../lib/state/state';
import { removeCookie } from './cookie';

export function logout() {
  globalState.setState({ isLoggedIn: false });
  removeCookie();
  if (userState.getState().userSocket) {
    userState.getState().userSocket.disconnect();
  }
  window.location.href = '/login';
}
