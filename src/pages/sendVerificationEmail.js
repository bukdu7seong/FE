// 이메일 유효성 검사 함수
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// 이메일 전송 및 모달 제어 함수
// 이메일 유효성 검사 함수
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// 이메일 전송 및 모달 제어 함수
async function sendVerificationEmail(gameId, callback) {
  const email = document.getElementById('emailInput').value;
  const emailModal = bootstrap.Modal.getInstance(document.getElementById('email2faModal')) || new bootstrap.Modal(document.getElementById('email2faModal'));
  const emailErrorDiv = document.getElementById('emailError');

  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = 'Invalid email format';
    return; // 유효하지 않은 이메일 형식일 경우 함수 종료
  } else {
    emailErrorDiv.style.display = 'none';
  }

  if (callback && typeof callback === 'function') {
    await callback(email, gameId); // 콜백 함수 실행
    emailModal.hide(); // 모달 닫기
  }
}

