import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { getCookie } from '../../../utils/cookie.js';
import { throwError, toastError } from '../../../utils/error.js';
import { getAccessToken } from '../../../utils/token.js';

export async function getHistoryData(pageNumber = 1) {
  try {
    const accessToken = getAccessToken();

    const response = await fetch(
      `${ACCOUNT_API_URL}/api/games/users/me/games/history?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    // throwError(error.message); // throw? toast?
    toastError(error.message);
  }
}
