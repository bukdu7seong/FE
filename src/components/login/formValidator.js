export function validateUsername(username, usernameError) {
  // 아이디 길이 검증
  if (username.length < 2) {
    usernameError.textContent = 'username must be at least 2 characters long.';
    return false;
  }

  // 영문 소문자 검증
  if (!username.match(/[a-z]/)) {
    usernameError.textContent =
      'username must contain at least one lowercase letter.';
    return false;
  }

  // 특수문자 검증
  if (
    username.match(
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\<\>\,\.\?\/\~\`]/
    )
  ) {
    usernameError.textContent = 'username cannot contain special characters.';
    return false;
  }

  usernameError.textContent = '';
  return true;
}

export function validatePassword(password, passwordError) {
  // 비밀번호 길이 검증
  if (password.length < 8) {
    passwordError.textContent = 'password must be at least 8 characters long.';
    return false;
  }

  // 숫자 포함 검증
  if (!password.match(/\d/)) {
    passwordError.textContent = 'password must contain at least one number.';
    return false;
  }

  // 소문자 포함 검증
  if (!password.match(/[a-z]/)) {
    passwordError.textContent =
      'password must contain at least one lowercase letter.';
    return false;
  }

  // 특수 문자 포함 검증
  if (
    !password.match(
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\<\>\,\.\?\/\~\`]/
    )
  ) {
    passwordError.textContent =
      'password must contain at least one special character.';
    return false;
  }

  passwordError.textContent = '';
  return true;
}

export function validateImage(file, imageError) {
  if (!file) {
    imageError.textContent = 'Please select an image file.';
    return false;
  }

  // 이미지 파일 확장자 검증
  if (!file.type.match('image.*')) {
    imageError.textContent = 'You can only upload image files.';
    return false;
  }

  // 이미지 파일 크기 검증
  if (file.size > 2 * 1024 * 1024) {
    imageError.textContent = 'Image file size must be less than 2MB.';
    return false;
  }

  imageError.textContent = '';
  return true;
}
