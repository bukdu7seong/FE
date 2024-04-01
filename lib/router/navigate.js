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
  if (updateHistory) window.history.pushState({}, '', href);

  if (name.toLowerCase() === 'logout') {
    let logoutLink = document.getElementById('logout-button'); // 로그아웃 버튼의 ID가 'logout-button'이라고 가정합니다.
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      createLogoutModal(); // 모달 생성 함수 호출
    });
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

