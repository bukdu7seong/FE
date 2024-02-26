export function pageSignUp() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
		<main class="form-signup text-center">
		  <p class="signup fw-bold">Sign Up</p>
		  <form id="signup-form" enctype="multipart/form-data">
			<div class="form-floating mb-3">
			  <input
				type="text"
				class="form-control"
				id="usernameInput"
				placeholder="Username"
				required
			  />
			  <label for="usernameInput" class="text-secondary">사용자 이름</label>
			</div>
			<div class="form-floating mb-3">
			  <input
				type="password"
				class="form-control"
				id="passwordInput"
				placeholder="Password"
				required
			  />
			  <label for="passwordInput" class="text-secondary">비밀번호</label>
			</div>
			<div class="form-floating mb-3">
			  <input
				type="email"
				class="form-control"
				id="emailInput"
				placeholder="name@example.com"
				required
			  />
			  <label for="emailInput" class="text-secondary">이메일</label>
			</div>
			<div class="mb-3">
			  <label for="imageInput" class="form-label text-secondary">프로필 이미지 선택</label>
			  <input
				type="file"
				class="form-control"
				id="imageInput"
				accept="image/*"
			  />
			</div>
			<button type="submit" class="btn btn-outline-light form-signup">
			  Sign Up
			</button>
		  </form>
		</main>
	  `;

  page.innerHTML = content;
  return page;
}
