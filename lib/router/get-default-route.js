import { PageNotFound } from '../../src/pages/404.js';
import { store } from '../../lib/state/store.js';

let TEST_MODE = true;

// 기본 경로를 설정. (/ -> /profile), 나머진 404page로 이동.
export function getDefaultRoute(href, routes) {
  if (
    href === '/' &&
    (store.getState().isLoggedIn === false) ^ TEST_MODE &&
    routes['/login']
  ) {
    console.log(store.getState().isLoggedIn === false || IS_PROD);
    return routes['/login'];
  }
  if (
    href === '/' &&
    (store.getState().isLoggedIn === true) ^ TEST_MODE &&
    routes['/profile']
  )
    return routes['/profile'];
  return { name: '404', page: PageNotFound, component: [] };
}
