// [회원가입 버튼] 클릭 시 회원가입 페이지로 이동
function handleSignUpClick() {
  document.getElementById('sign-up').addEventListener('click', function (e) {
    e.preventDefault(); // 기본 동작 막기
    // sign-up 페이지로 이동
    // 여기선 라우팅만 하고, 실제로 페이지를 렌더링하는 부분은 따로 있어야 함
  });
}

export function signup() {
  handleSignUpClick(); // 회원가입 버튼 클릭 시 회원가입 요청
}
