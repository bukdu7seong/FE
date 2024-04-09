import { failureToast } from '../components/common/toast/failure.js';

export function toastFail(messageKey) {
  // messageKey는 번역 키입니다. 예: 'passwordChangeFail'
  const translatedMessage = i18next.t(messageKey);

  const toast = new failureToast(translatedMessage);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 4242);
}
