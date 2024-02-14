import { navigate } from '../../lib/router/navigate.js';
import { store } from './store.js';

export function checkLogin(routes) {
  store.subscribe((state) => {
    if (state.isLoggedIn && window.location.pathname === '/login') {
      navigate(routes, '/profile');
    } else if (!state.isLoggedIn && window.location.pathname !== '/login') {
      navigate(routes, '/login');
    }
  });
}
