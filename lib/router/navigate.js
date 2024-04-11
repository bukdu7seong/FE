import { PageNotFound } from '../../src/pages/404.js';
import { globalState } from '../state/state.js';

let previousPath = '';
let set = false;

// 라우터를 설정.
export function navigate(
  routes,
  href = window.location.pathname, // 현재 URL의 경로를 알려준다.
  updateHistory = true
) {
  if (href === previousPath && href !== '/game' && href !== '/tournament') {
    return false;
  }

  previousPath = href;

  if (!set && globalState.getState().isLoggedIn) {
    routes['/'] = routes['/profile'];
    routes['/login'] = routes['/profile'];
    routes['/signup'] = routes['/profile'];
    routes['/twofa'] = routes['/profile'];
    routes['/oauth2-redirect'] = routes['/profile'];
    set = true;
  }

  if (updateHistory) {
    window.history.pushState({}, '', href);
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
