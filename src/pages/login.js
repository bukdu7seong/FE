export function pageLogin() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
  <body class="d-flex align-items-center py-4 bg-body-tertiary">
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      ...
    </svg>

    <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
      ...
    </div>

    <main class="form-signin w-100 m-auto">
      <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        <div class="oauth-container">
          <button class="btn btn-google w-100 py-2 my-2" type="button">Sign in with Google</button>
          <button class="btn btn-facebook w-100 py-2 my-2" type="button">Sign in with Facebook</button>
          <button class="btn btn-twitter w-100 py-2 my-2" type="button">Sign in with Twitter</button>
        </div>
      </form>
    </main>
    <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
		  `;
  page.innerHTML = content;
  return page;
}
