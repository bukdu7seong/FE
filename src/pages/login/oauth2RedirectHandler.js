// src/pages/oauth2RedirectHandler.js
export function handleOAuth2Redirect() {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const error = queryParams.get('error');

  if (code) {
    // 인증 코드 처리
    console.log('Authorization code:', code);
    // 인증 코드를 백엔드 서버로 전송하거나 추가 처리
  } else if (error) {
    // 에러 처리
    console.error('OAuth2 Error:', error);
  }

  // 필요한 경우 사용자를 다른 페이지로 리다이렉트
  // 예: navigate(routes, '/profile', true);
}
