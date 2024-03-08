export function pageTwoFA() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');

  const content = `
	  <div class="form-signin text-center">
		  <img src="../../../images/icon/laptop-solid.svg" alt="laptop icon" class="icon-2fa"/>
		  <h1 class="text-bold">2-Factor Authentication</h1>
		  <p>You have 2FA enabled on this account. Please user your 2FA e-mail to enter the current 6-character code to complete the login process.</p>
		  
		  <!-- 이메일 재발송 버튼 -->
		  <button type="button" class="btn btn-outline-light form-signin" id="resendEmailButton">
			  Resend 2FA Code
		  </button>
		  
		  <!-- 2FA 코드 입력 -->
		  <input class="twofacode form-control btn btn-outline-light" type="text" placeholder="ㅁㅁㅁ-ㅁㅁㅁ" aria-label="default input example" id="two-f-a-code">
		  
		  <!-- 5분 타이머 -->
		  <p id="timer" class="timer">5:00</p>
	  </div>
  `;
  page.innerHTML = content;
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
