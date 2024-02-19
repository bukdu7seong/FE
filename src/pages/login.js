export function pageLogIn() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  // const content = `
  //   <button id="loginButton">로그인</button>
  //   <button id="logoutButton" style="display:none;">로그아웃</button>
  // `;
  const content = `
      <div class="form-signin text-center">
        <p class="login fw-bold">Log in</p>
        <form id="login-form">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
            />
            <label for="floatingInput" class="text-secondary">이메일 주소</label>
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
          <p class="text-secondary">
            <a
              id="sign-up"
              href="/sign-up"
              style="text-decoration: none; color: turquoise"
              >Sign up</a
            >
            with 42 Authenticator to continue.
          </p>
          <button type="submit" class="btn btn-outline-light form-signin">
            Sign in
          </button>
          <button
            type="button"
            id="42-OAuth-Button"
            class="btn btn-outline-light form-signin"
          >
            42 OAuth
          </button>
        </form>
      </div>
  	`;

  page.innerHTML = content;
  return page;
}
