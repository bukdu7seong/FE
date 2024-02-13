function setProfileImage(imageUrl) {
  // 상태 업데이트 로직
  store.setState({ profileImageUrl: imageUrl });
}

function login() {
  isLoggedIn = true;
  Navigate(routes, '/profile', true);
}

function logout() {
  isLoggedIn = false;
  Navigate(routes, '/login', true);
}
