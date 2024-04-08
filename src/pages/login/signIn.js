export function pageLogIn() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
      <div class="form-signin text-center">
        <p class="signin fw-bold">Pong</p>
        <form id="signin-form">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label for="floatingInput" class="text-secondary">아이디</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label for="floatingPassword" class="text-secondary">비밀번호</label>
          </div>
		      <div id="login-error-message" class="d-flex justify-center" style="color: #fe6b6b;"></div>
          <p class="text-secondary">
            <a
              id="sign-up"
              href="/signup"
              style="text-decoration: none; color: turquoise"
              ></a
          </p>
          <button type="submit" class="btn btn-outline-light form-signin">
		  	Log in
          </button>
          <button
            type="button"
            id="42-Button"
            class="btn btn-outline-light form-signin"
          >
            Log in with 42
          </button>
        </form>
      </div>
  	`;

  page.innerHTML = content;
  return page;
}
