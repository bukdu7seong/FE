export function validateInput(input) {
  const alphanumeric = /^[a-zA-Z0-9]*$/;
  if (!input.match(alphanumeric)) {
    return false;
  }
  return true;
}
