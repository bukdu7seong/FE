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
      <img src="../../../assets/images/icon/laptop-solid.svg" alt="laptop icon" class="icon-2fa"/>
      <h1 class="text-bold">2-Factor Authentication</h1>
      <p>You have 2FA enabled on this account. Please user your 2FA e-mail to enter the current 6-character code to complete the login process.</p>
      
      <!-- 이메일 재발송 버튼 -->
      <button type="button" class="btn btn-outline-light form-signin" id="resendEmailButton">
        Resend 2FA Code
      </button>
      
      <!-- 2FA 코드 입력 -->
      <input class="twofacode form-control btn btn-outline-light form-2fa" type="text" placeholder="ㅁㅁㅁ-ㅁㅁㅁ" aria-label="default input example" id="two-f-a-code">
      
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

/*
  <div class="full-screen">
	  <div class="form-signin text-center">
		<img src="../../../images/icon/laptop-solid.svg" alt="laptop icon" class="icon-2fa"/>
		<h1 class="text-bold">2-Factor Authentication</h1>
		<p>You have 2FA enabled on this account. Please use your 2FA email to enter the current 6-digit code to complete the login process.</p>
  	</div>
  </div>

*/
// export function page2FA() {
//   const page = document.createElement('div');
//   page.setAttribute('class', 'full-screen');

//   const formContainer = document.createElement('div');
//   formContainer.className = 'form-signin text-center';

//   formContainer.appendChild(createIconImage());
//   formContainer.appendChild(createTitle());
//   formContainer.appendChild(createDescription());
//   formContainer.appendChild(createButtons());

//   page.appendChild(formContainer);

//   return page;
// }

// function createIconImage() {
//   const img = document.createElement('img');
//   img.src = '../../../images/icon/laptop-solid.svg';
//   img.alt = 'laptop icon';
//   img.className = 'icon-2fa';
//   return img;
// }

// function createTitle() {
//   const title = document.createElement('h1');
//   title.className = 'text-bold';
//   title.textContent = '2-Factor Authentication';
//   return title;
// }

// function createDescription() {
//   const description = document.createElement('p');
//   description.textContent =
//     'You have 2FA enabled on this account. Please use your 2FA email to enter the current 6-digit code to complete the login process.';
//   return description;
// }

// function createButtons() {
//   const buttonContainer = document.createElement('div');

//   const button1 = document.createElement('button');
//   button1.type = 'submit';
//   button1.className = 'btn btn-outline-light form-signin';
//   button1.textContent = '2FA CODE';

//   const button2 = document.createElement('button');
//   button2.type = 'submit';
//   button2.className = 'btn btn-outline-light form-signin';
//   button2.textContent = '-';

//   buttonContainer.appendChild(button1);
//   buttonContainer.appendChild(button2);

//   return buttonContainer;
// }
