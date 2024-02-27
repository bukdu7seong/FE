import { renderAll } from '../render/render.js';
import { setPageIconBackground } from '../../src/utils/icon_status.js';
import { navigate } from './navigate.js';
import { globalState, routeState, userState } from '../state/state.js';

export function goToProfile() {
  const profileRoute = '/profile';
  const target = navigate(routes, profileRoute, true);
  renderAll(target);
}

// 기본 경로를 설정. (/ -> /profile)
export function getDefaultPath(href, routes) {
  // const isLogin = store.getState().isLoggedIn;
  const isLogin = globalState.getState().isLoggedIn;

  console.log(isLogin);

  if (!isLogin) {
    return '/login';
  } else if (href === '/' || href === '/login') {
    routes['/'] = routes['/profile'];
    return '/';
  } else {
    return href;
  }
}

export function redirectRoute(routes, path) {
  const target = navigate(routes, path, true);
  renderAll(target);

  routeState.setState({ currentRoute: target }, false); // 무한 루프 방지
  userState.ping(); // userBox 업데이트

  if (target.onRender) {
    target.onRender();
  }
}

export function route(
  routes,
  path = window.location.pathname,
  updateHistory = true
) {
  const target = navigate(routes, path, updateHistory);
  renderAll(target);

  routeState.setState({ currentRoute: target });
  userState.ping(); // userBox 업데이트

  if (target.onRender) {
    target.onRender();
  }
}
