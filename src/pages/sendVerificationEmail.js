async function sendVerificationEmail() {
  let email = document.getElementById('emailInput').value;

  try {
    const response = await fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Verification email sent successfully:', data);
    // 추가적인 성공 처리 로직 (예: 사용자에게 알림 표시)
  } catch (error) {
    console.error('Error sending verification email:', error);
    // 오류 처리 로직 (예: 오류 메시지 표시)
  }
}
