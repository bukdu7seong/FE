import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getCookie } from '../../../utils/cookie.js';
import { toastError } from '../../../utils/error.js';
import { getAccessToken } from '../../../utils/token.js';

export async function getRequestData(pageNumber = 1) {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${ACCOUNT_API_URL}/api/friend/pending-friends/?page=${pageNumber}&pageSize=5`,
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
