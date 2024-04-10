import { failureToast } from '../../common/toast/failure.js';
import { userState } from '../../../../lib/state/state.js';
import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';
import { toastSuccess } from '../../../utils/success.js';

async function update2FA(is2FAEnabled) {
  const accessToken = await getAccessToken();
  const url = `${ACCOUNT_API_URL}/api/account/update-2fa/`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ is_2fa: is2FAEnabled }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update 2FA status.');
    }

    const data = await response.json();
    toastSuccess('change2faSuccess');
    return data;
  } catch (error) {
    popToast(failureToast, error.message);
  }
}

export class change2FA {
  constructor() {
    this.is2FAEnabled = userState.getState().user2fa;
  }

  toggle2FA() {
    this.is2FAEnabled = !this.is2FAEnabled;
    update2FA(this.is2FAEnabled);
    userState.setState({ user2fa: this.is2FAEnabled }, false);
  }
}

function popToast(ToastType, message, duration = 3000) {
  const toast = new ToastType(message);
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, duration);
}
