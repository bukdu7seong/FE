export function check2FAEnabled(accessToken) {
  return fetch(`${API_URL}/user/2fa`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
