import { globalState } from '../../lib/state/state';
import { failureToast } from '../components/profile/toast/failure';

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
  globalState.setState({ isLoggedIn: false });
  removeCookie();
  alert(message);
  window.location.href = '/login';
}
