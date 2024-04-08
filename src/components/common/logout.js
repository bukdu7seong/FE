import { globalState, userState } from '../../../lib/state/state.js';
import { removeCookie } from '../../utils/cookie.js';

export function logout() {
  localStorage.removeItem('code');
  removeCookie('accessToken');
  removeCookie('tempToken');
  if (userState.getState().userSocket) {
    userState.getState().userSocket.close();
  }
  window.location.href = '/login';
}
