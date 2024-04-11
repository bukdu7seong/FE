import { successToast } from '../components/common/toast/success.js';

export function toastSuccess(messageKey) {
  const translatedMessage = i18next.t(messageKey);

  const toast = new successToast(translatedMessage);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 4242);
}
