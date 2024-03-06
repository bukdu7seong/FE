export function validateInput(input) {
  const alphanumeric = /^[a-zA-Z0-9]*$/;
  if (!input.match(alphanumeric)) {
    return false;
  }
  return true;
}

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
