import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getCookie } from '../../../utils/cookie.js';
import { toastError } from '../../../utils/error.js';
import { getAccessToken } from '../../../utils/token.js';

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
      throw new Error('Failed to fetch user image.');
    }

    return imageResponse.url;
  } catch (error) {
    toastError(error.message);
    return null;
  }
}
