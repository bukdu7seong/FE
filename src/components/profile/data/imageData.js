import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getAccessToken } from '../../../utils/token.js';
import { toastFail } from '../../../utils/fail.js';

export async function getImageData(imagePath) {
  try {
    const accessToken = await getAccessToken();
    const url = new URL(imagePath, ACCOUNT_API_URL);
    const path = url.pathname;

    const imageResponse = await fetch(`${ACCOUNT_API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!imageResponse.ok) {
      throw new Error('FailedFetchImage');
    }

    return imageResponse.url;
  } catch (error) {
    toastFail(error.message);
    return null;
  }
}
