import { renderAll } from '../render/render.js';
import { navigate } from './navigate.js';
import { globalState, routeState, userState } from '../state/state.js';
import { initUserInfo } from '../../src/utils/initUserInfo.js';

export function goToProfile() {
  const profileRoute = '/profile';
  const target = navigate(routes, profileRoute, true);
  renderAll(target);
}

export function routeByState(href = window.location.pathname) {
  routeState.ping();

  if (!globalState.getState().isLoggedIn) {
    return '/login';
  } else if (href === '/' || href === '/login') {
    return '/';
  } else {
    return href;
  }
}

// 기본 경로를 설정. (/ -> /profile)
export function setDefaultPath(href, routes) {
  routes['/'] = routes['/profile'];

  return routeByState(href);
}

export function redirectRoute(routes, path) {
  const target = navigate(routes, path, true);
  renderAll(target);

  routeState.setState({ currentRoute: target }, false); // 무한 루프 방지
  userState.ping(); // userBox 업데이트

  if (target.onRender) {
    target.onRender.forEach((func) => {
      func();
    });
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
    target.onRender.forEach((func) => {
      func();
    });
  }
}

export function firstRoute(routes, path) {
  const target = navigate(routes, path, false);
  renderAll(target);

  routeState.setState({ currentRoute: target });

  if (globalState.getState().isLoggedIn) {
    initUserInfo();
  }

  if (target.onRender) {
    target.onRender.forEach((func) => {
      func();
    });
  }
}
