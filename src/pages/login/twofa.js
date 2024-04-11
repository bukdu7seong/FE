let timerId2 = null;

function startTimer(duration, display) {
  if (timerId2) {
    clearInterval(timerId2); // 기존 타이머 인스턴스를 정지
  }

  let timer = duration;
  timerId2 = setInterval(function () {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(timerId2);
      display.textContent = 'EXPIRED';
    }
  }, 1000);
}

export function pageTwoFA() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  page.innerHTML = `
    <div class="form-signin text-center">
      <img src="/assets/images/icon/laptop-solid.png" alt="laptop icon" class="icon-2fa"/>
      <h1 class="text-bold">2-Factor Authentication</h1>
      <p>You have 2FA enabled on this account. Please user your 2FA e-mail to enter the current 6-character code to complete the login process.</p>
      
      <!-- 이메일 재발송 버튼 -->
      <button type="button" class="btn btn-outline-light form-signin" id="resendEmailButton">
        Resend 2FA Code
      </button>
      <div id="resendInfo" class="text-success"></div>
      <div id="resendError" class="text-danger"></div>
      
      <!-- 2FA 코드 입력 -->
      <div class="input-group">
        <input class="twofacode form-control btn btn-outline-light form-2fa" type="text" placeholder="" aria-label="default input example" id="two-f-a-code">
        <button class="submit-btn btn btn-outline-light form-2fa" type="button" id="submitTwoFA">Submit</button>
      </div>
      <div id="codeError" class="text-danger"></div>

      <!-- 5분 타이머 -->
      <p id="timer2" class="timer">05:00</p>
    </div>
  `;

  // 타이머와 재전송 버튼 요소 찾기
  const timerDisplay = page.querySelector('#timer2');
  const resendButton = page.querySelector('#resendEmailButton');

  // 타이머 초기화 및 재전송 버튼에 이벤트 리스너 추가
  startTimer(60 * 5, timerDisplay); // 타이머 초기화 (5분)
  resendButton.addEventListener('click', function () {
    startTimer(60 * 5, timerDisplay); // 재전송 버튼 클릭 시 타이머 리셋
  });

  return page;
}
