import { PageNotFound } from '../../src/pages/404.js';
import { createLogoutModal } from '../../src/pages/logoutModal.js';

let previousPath = '';

// 라우터를 설정.
export function navigate(
  routes,
  href = window.location.pathname, // 현재 URL의 경로를 알려준다.
  updateHistory = true
) {
  if (href === previousPath) return routes[href];

  previousPath = href;

  if (updateHistory) {
    window.history.pushState({}, '', href);
  }

  if (href === '/logout') {
    createLogoutModal(); // 모달 생성 함수 호출
    return routes['/logout'];
  }

  return (
    routes[href] || {
      name: '404',
      page: PageNotFound,
      component: [],
      onRender: null,
    }
  );
}
