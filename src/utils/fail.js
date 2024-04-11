import { failureToast } from '../components/common/toast/failure.js';

export function toastFail(messageKey) {
  const translatedMessage = i18next.t(messageKey);

  const toast = new failureToast(translatedMessage);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 4242);
}
