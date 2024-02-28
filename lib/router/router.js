import { renderAll } from '../render/render.js';
import { globalState, routeState, userState } from '../state/state.js';

import { pageLogIn } from '../../src/pages/login/sign_in.js';
import { pageSignUp } from '../../src/pages/login/sign_up.js';
import { pageProfile } from '../../src/pages/profile.js';
import { pageGame, pageBoard } from '../../src/pages/game.js';
import { pageTournament } from '../../src/pages/tournament.js';
import { pageSwitch } from '../../src/pages/switch.js';
import { pageCode } from '../../src/pages/login/code.js';
import { PageNotFound } from '../../src/pages/404.js';

let previousPath = '';

// { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 component는 여러개일 수 있기에 배열로 설정
export const routes = {
  '/login': { name: 'Login', page: pageLogIn, component: [], onRender: null },
  '/signup': {
    name: 'Signup',
    page: pageSignUp,
    component: [],
    onRender: null,
  },
  '/signup': {
    name: 'Signup',
    page: pageSignUp,
    component: [],
    onRender: null,
  },
  '/profile': {
    name: 'Profile',
    page: pageProfile,
    component: [],
    onRender: null,
  },
  '/game': { name: 'Game', page: pageGame, component: [], onRender: null },
  '/tournament': {
    name: 'Tournament',
    page: pageTournament,
    component: [],
    onRender: null,
  },
  '/logout': {
    name: 'Logout',
    page: pageSwitch,
    component: [],
    onRender: null,
  },
  '/code': {
    name: 'Code',
    page: pageCode,
    component: [],
    onRender: null,
  },
};

// 기본 경로를 설정. (/ -> /profile)
export function getDefaultPath(href, routes) {
  routeState.ping();

  if (!globalState.getState().isLoggedIn) {
    return '/login';
  } else if (href === '/' || href === '/login') {
    routes['/'] = routes['/profile'];
    return '/';
  } else {
    return href;
  }
}

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
  const target = routes[path] || {
    name: '404',
    page: PageNotFound,
    component: [],
  };

  // 히스토리 업데이트가 필요한 경우에만 pushState 호출
  if (updateHistory) {
    window.history.pushState({}, '', path);
  }

  // 페이지 컴포넌트 렌더링
  renderAll(target);

  // 라우트 상태 업데이트
  routeState.setState({ currentRoute: target }, callListeners);

  // 사용자 상태 업데이트
  userState.ping();

  // 라우트 객체에 onRender 콜백이 있으면 호출
  if (target.onRender) {
    target.onRender();
  }
}
