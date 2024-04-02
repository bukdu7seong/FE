import { getCookie } from '../../../utils/cookie.js';
import { toastError } from '../../../utils/error.js';

export async function getRequestData(pageNumber = 1) {
  try {
    const accessToken = getCookie('accessToken');

    const response = await fetch(
      `http://localhost:8000/api/friend/pending-friends/?page=${pageNumber}&pageSize=5`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    toastError(error.message);
  }
}
