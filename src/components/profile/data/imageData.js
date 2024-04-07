import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getCookie } from '../../../utils/cookie.js';
import { toastError } from '../../../utils/error.js';

export async function getImageData(imagePath) {
  try {
    const accessToken = getCookie('accessToken');
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
  }
}
