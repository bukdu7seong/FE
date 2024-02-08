import { Navigate } from '../../lib/router/navigate.js';
import { store } from './store.js';

export function checkLogin(routes) {
  store.subscribe((state) => {
    if (state.isLoggedIn && window.location.pathname === '/login') {
      Navigate(routes, '/profile', true);
    } else if (!state.isLoggedIn && window.location.pathname !== '/login') {
      Navigate(routes, '/login', true);
    }
  });
}
