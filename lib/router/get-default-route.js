import { PageNotFound } from '../../src/pages/404.js';

// 기본 경로를 설정. (/ -> /profile), 나머진 404page로 이동.
export function getDefaultRoute(href, routes) {
  if (href === '/' && routes['/login']) return routes['/login'];
  return { name: '404', page: PageNotFound, component: [] };
}
