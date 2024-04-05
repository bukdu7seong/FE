export function validateUsername(username, usernameError) {
  // 아이디 길이 검증
  if (username.length < 2) {
    usernameError.textContent = '아이디는 최소 2자 이상이어야 합니다.';
    return false;
  }

  // 영문 소문자 검증
  if (!username.match(/[a-z]/)) {
    usernameError.textContent = '아이디에는 영문 소문자가 포함 되어야 합니다.';
    return false;
  }

  // 특수문자 검증
  if (
    username.match(
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\<\>\,\.\?\/\~\`]/
    )
  ) {
    usernameError.textContent = '아이디에는 특수문자가 포함될 수 없습니다.';
    return false;
  }

  usernameError.textContent = '';
  return true;
}

export function validatePassword(password, passwordError) {
  // 비밀번호 길이 검증
  if (password.length < 8) {
    passwordError.textContent = '비밀번호는 최소 8자 이상이어야 합니다.';
    return false;
  }

  // 숫자 포함 검증
  if (!password.match(/\d/)) {
    passwordError.textContent =
      '비밀번호에는 최소 한 개의 숫자가 포함되어야 합니다.';
    return false;
  }

  // 소문자 포함 검증
  if (!password.match(/[a-z]/)) {
    passwordError.textContent =
      '비밀번호에는 최소 한 개의 소문자가 포함되어야 합니다.';
    return false;
  }

  // 특수 문자 포함 검증
  if (
    !password.match(
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\<\>\,\.\?\/\~\`]/
    )
  ) {
    passwordError.textContent =
      '비밀번호에는 최소 한 개의 특수 문자가 포함되어야 합니다.';
    return false;
  }

  passwordError.textContent = '';
  return true;
}

// export function validateInput(input) {
//   const alphanumeric = /^[a-zA-Z0-9]*$/;
//   if (!input.match(alphanumeric)) {
//     return false;
//   }
//   return true;
// }
