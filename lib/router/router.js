import { renderAll } from '../render/render.js';
import { navigate } from './navigate.js';
import {
  gameState,
  globalState,
  routeState,
  userState,
} from '../state/state.js';

export function goToProfile() {
  const profileRoute = '/profile';
  const target = navigate(routes, profileRoute, true);
  renderAll(target);
}

export function routeByState(href = window.location.pathname) {
  routeState.ping();

  globalState.getState().isLoggedIn = true;

  return '/profile';

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
  gameState.setState({ currentGameStatus: 'idle' });
  userState.ping(); // userBox 업데이트

  if (target.onRender) {
    target.onRender();
  }
}
