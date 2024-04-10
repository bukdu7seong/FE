import { GAME_API_URL } from '../../../utils/api.js';
import { throwError, toastError } from '../../../utils/error.js';
import { getAccessToken } from '../../../utils/token.js';

export async function getGameData() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${GAME_API_URL}/api/games/stats/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throwError('Unauthorized access token. Please login again.');
      } else {
        throwError('Failed to fetch user data. Please login again.');
      }
    }

    return await response.json();
  } catch (error) {
    // throwError(error.message); // throw? toast?
    toastError(error.message);
  }
}
