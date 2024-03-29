import { successToast } from '../components/profile/toast/success';

export function toastSuccess(message) {
  const toast = new successToast(message);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 4242);
}
