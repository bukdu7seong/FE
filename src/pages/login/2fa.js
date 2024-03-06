export function page2FA() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
	<div class="form-signin text-center">
		<img src="../../../images/icon/laptop-solid.svg" alt="laptop icon" class="icon-2fa"/>
		<h1 class="text-bold">2-Factor Authentication</h1>
		<p>You have 2FA enabled on this account. Please user your 2FA e-mail to enter the current 6-digit code to complete the login process.</p>
		<button type="submit" class="btn btn-outline-light form-signin">
		2FA CODE
		</button>
		<button type="submit" class="btn btn-outline-light form-signin">
		- 
		</button>
	</div>
		`;

  page.innerHTML = content;
  return page;
}
