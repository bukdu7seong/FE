
// email.js

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

async function sendVerificationEmail(gameId, callback) {
  const email = document.getElementById('emailInput').value;

  if (!isValidEmail(email)) {
    console.error('Invalid email format');
    // 여기서 사용자에게 이메일 형식이 잘못되었다는 메시지를 표시할 수 있습니다.
    return;
  }

  if (callback && typeof callback === 'function') {
    callback(email, gameId); // 콜백 함수 호출
  }
}
