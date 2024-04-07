import { ACCOUNT_API_URL } from '../../utils/api.js';
import { getCookie } from '../../utils/cookie.js';
import { redirectError, toastError } from '../../utils/error.js';

export async function updateRequest(userId, accept) {
  if (accept) {
    try {
      const accessToken = getCookie('accessToken');

      const response = await fetch(
        `${ACCOUNT_API_URL}/api/friend/accept-friend-request/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ friend_request_id: userId }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          redirectError('Unauthorized access token. Please login again.');
        } else {
          throw new Error('Failed to accept friend request.');
        }
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  } else {
    try {
      const accessToken = getCookie('accessToken');

      const response = await fetch(
        `${ACCOUNT_API_URL}/api/friend/delete-friend-request/?friend_request_id=${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          redirectError('Unauthorized access token. Please login again.');
        } else {
          throw new Error('Failed to delete friend request.');
        }
      }
    } catch (error) {
      toastError(error.message);
    }
  }
}
