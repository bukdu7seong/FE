import { renderAll } from './render.js';
import { setPageIconBackground } from '../../src/utils/icon_status.js';
import { navigate } from './navigate.js';
import { PageNotFound } from '../../src/pages/404.js';
import { store, routeState } from '../state/store.js';

export function firstRoute(routes) {
  // target: 렌더링될 페이지의 정보를 담은 객체
  const target = navigate(routes, window.location.pathname, false);
  // 렌더링된 페이지를 화면에 표시
  renderAll(target);
  // 사이드바 아이콘의 배경색을 변경
  setPageIconBackground(target.name);
  // 음... 그런데 그냥 css 자체적으로 처리할 수도 있을 것 같습니다.
}

// 기본 경로를 설정. (/ -> /profile), 나머진 404page로 이동.
export function getDefaultRoute(href, routes) {
  // const isLogin = store.getState().isLoggedIn;
  const isLogin = true;
  if (href === '/' && isLogin === false && routes['/login']) {
    return routes['/login'];
  } else if (href === '/' && isLogin === true && routes['/profile']) {
    return routes['/profile'];
  } else {
    return { name: '404', page: PageNotFound, component: [] };
  }
}

export function route(
  routes,
  path = window.location.pathname,
  updateHistory = true
) {
  const target = navigate(routes, path, updateHistory);

  routeState.setState({ currentRoute: target });
  // subscribe로 구현할 수도 있을 것 같다.

  renderAll(target);
}
