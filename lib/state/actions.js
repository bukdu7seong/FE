import { store } from './store.js';

export function setProfileImage(imageUrl) {
  // 상태 업데이트 로직
  store.setState({ profileImageUrl: imageUrl });
}

export function login() {
  store.setState({ isLoggedIn: true });
  navigate(routes, '/profile', true);
}

export function logout() {
  store.setState({ isLoggedIn: false });
  navigate(routes, '/login', true);
}
