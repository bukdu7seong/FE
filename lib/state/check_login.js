import { route } from '../router/router.js';
import { store } from './store.js';

export function checkLogin(routes) {
  store.subscribe((state) => {
    if (state.isLoggedIn && window.location.pathname === '/login') {
      route(routes, '/profile');
    } else if (!state.isLoggedIn && window.location.pathname !== '/login') {
      route(routes, '/login');
    }
  });
}
