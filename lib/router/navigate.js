import { PageNotFound } from '../../pages/404.js';

let previousPath = '';

// 기본 경로를 설정. (/ -> /profile), 나머진 404page로 이동.
function getDefaultRoute(href, routes) {
  if (href === '/' && routes['/profile']) return routes['/profile'];
  return { name: '404', page: PageNotFound, component: [] };
}

// 라우터를 설정.
export function Navigate(
  routes,
  href = window.location.pathname, // 현재 URL의 경로를 알려준다.
  updateHistory = true
) {
  if (href === previousPath) return routes[href];

  previousPath = href;
  if (updateHistory) window.history.pushState({}, '', href);

  return routes[href] || getDefaultRoute(href, routes);
}
