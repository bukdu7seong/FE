import { GAME_API_URL } from '../../../utils/api.js';
import { redirectError, throwError, toastError } from '../../../utils/error.js';
import { getAccessToken } from '../../../utils/token.js';

export async function getGameData() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${GAME_API_URL}/api/games/stats/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirectError('Unauthorized access token. Please login again.');
        return;
      } else {
        throwError('Failed to fetch user game data.');
      }
    }

    return await response.json();
  } catch (error) {
    toastError(error.message);
    return null;
  }
}
