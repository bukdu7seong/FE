// 이메일 유효성 검사 함수

// 이메일 유효성 검사 함수
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

// 이메일 전송 및 모달 제어 함수
async function sendVerificationEmail(gameId) {
  const email = document.getElementById('emailInput').value;
  const code = document.getElementById('codeInput').value; // 인증 코드 입력값
  const emailModal = bootstrap.Modal.getInstance(document.getElementById('email2faModal')) || new bootstrap.Modal(document.getElementById('email2faModal'));
  const emailErrorDiv = document.getElementById('emailError');
  const codeErrorDiv = document.getElementById('codeError'); // 인증 코드 에러 표시 구역

  if (!isValidEmail(email)) {
    emailErrorDiv.style.display = 'block';
    emailErrorDiv.textContent = 'Invalid email format';
    return;
  } else {
    emailErrorDiv.style.display = 'none';
  }

  const verificationResult = await verifyCodeWithServer(code); // 인증 코드 서버 검증
  if (!verificationResult) {
    codeErrorDiv.style.display = 'block';
    codeErrorDiv.textContent = 'Invalid verification code';
    return;
  }

  // 모든 검증을 통과하면 모달 닫기
  emailModal.hide();
}

