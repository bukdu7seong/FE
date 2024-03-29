import { globalState } from '../../lib/state/state.js';
import { failureToast } from '../components/profile/toast/failure.js';
import { logout } from './logout.js';

export function throwError(message) {
  globalState.setState({ isLoggedIn: false });
  throw new Error(message);
}

export function toastError(message) {
  const toast = new failureToast(message);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 3000);
}

export function redirectError(message) {
  alert(message);
  logout();
}
