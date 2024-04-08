import { ACCOUNT_API_URL } from '../../../utils/api.js';
import { logout } from '../../common/logout.js';

export async function request42OAuth() {
  try {
    const response = await fetch(`${ACCOUNT_API_URL}/api/account/42oauth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      // console.log(data.url);
      window.location.href = data.url;
    } else {
      throw new Error(response.status.toString());
    }
  } catch (e) {
    switch (e.message) {
      case '404':
        alert('404 Not Found: The user does not exist.');
        break;
      case '409':
        alert('409 Conflict: The 42 token has expired.');
        break;
      default:
        alert(`Error ${e.message}: Failed to fetch 42 OAuth:`);
        break;
    }
    logout();
  }
}
