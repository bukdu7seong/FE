import { successToast } from '../components/common/toast/success.js';

export function toastSuccess(messageKey) {
  // messageKey는 번역 키입니다. 예: 'connectSuccess'
  const translatedMessage = i18next.t(messageKey);

  const toast = new successToast(translatedMessage);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 4242);
}
