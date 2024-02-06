import { Navigate } from '../../lib/router/navigate.js';

export function checkLogin(store, routes) {
  console.log('checkLogin', store.state.login);
  if (!store.state.login) {
    // 로그인 상태가 아니면 로그인 페이지로 이동
    Navigate(routes, '/login', true);
  } else {
    // 로그인 상태면 프로필 페이지로 이동
    Navigate(routes, '/profile', true);
  }
}
