import { getDefaultRoute } from './get-default-route.js';

let previousPath = '';

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
