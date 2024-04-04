import { getCookie } from '../../../utils/cookie.js';
import { toastError } from '../../../utils/error.js';

export async function getImageData(imagePath) {
  try {
    const accessToken = getCookie('accessToken');
    const url = new URL(imagePath, 'http://localhost:8000');
    const path = url.pathname;

    const imageResponse = await fetch(`http://localhost:8000${path}`, {
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
