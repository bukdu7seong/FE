import { renderAll } from '../render/render.js';
import { navigate } from './navigate.js';
import {
  gameState,
  globalState,
  routeState,
  userState,
} from '../state/state.js';
import { initUserInfo } from '../../src/utils/initUser.js';

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
  routes['/'] = routes['/profile']; // navbar에 경로 추가가 되지 않도록 함

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

let previousPath = '';

export function route(
  routes,
  path = window.location.pathname,
  updateHistory = true,
  callListeners = true
) {
  // 이전 경로와 동일한지 확인하여 중복 네비게이션 방지
  if (path === previousPath) return;
  previousPath = path;

  // 경로에 해당하는 라우트 객체 가져오기. 없으면 404
  const target = routes[path] || routes['/404'];

  // 히스토리 업데이트가 필요한 경우에만 pushState 호출
  if (updateHistory) {
    window.history.pushState({}, '', path);
  }
  // 페이지 컴포넌트 렌더링
  renderAll(target);

  routeState.setState({ currentRoute: target }, callListeners);
  gameState.setState({ currentGameStatus: 'idle' });
  userState.ping(); // userBox 업데이트

  // 라우트 객체에 onRender 콜백이 있으면 호출
  if (target.onRender) {
    target.onRender.forEach((func) => {
      func();
    });
  }
}

export function firstRoute(routes, path) {
  const target = navigate(routes, path, false);
  renderAll(target);

  routeState.setState({ currentRoute: target }, false);

  if (globalState.getState().isLoggedIn) {
    initUserInfo().then(() => {
      userState.ping(); // userBox 업데이트
      if (target.onRender) {
        target.onRender.forEach((func) => {
          func();
        });
      }
    });
  } else {
    if (target.onRender) {
      target.onRender.forEach((func) => {
        func();
      });
    }
  }
}
