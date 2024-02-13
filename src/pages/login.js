export function pageLogIn() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  // const content = `
  //   <button id="loginButton">로그인</button>
  //   <button id="logoutButton" style="display:none;">로그아웃</button>
  // `;
  const content = `
  <body class="d-flex align-items-center py-4 bg-body-tertiary">
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
        <div class="form-check my-0.8">
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    </main>
    <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
  	  `;
  page.innerHTML = content;
  return page;
}
