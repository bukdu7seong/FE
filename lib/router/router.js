import { renderAll } from '../render/render.js';
import { navigate } from './navigate.js';
import { globalState, routeState, userState } from '../state/state.js';

import { pageLogIn } from '../../src/pages/login/sign_in.js';
import { pageSignUp } from '../../src/pages/login/sign_up.js';
import { pageProfile } from '../../src/pages/profile.js';
import { pageGame, pageBoard } from '../../src/pages/game.js';
import { pageTournament } from '../../src/pages/tournament.js';
import { pageSwitch } from '../../src/pages/switch.js';

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
};

export function goToProfile() {
  const profileRoute = '/profile';
  const target = navigate(routes, profileRoute, true);
  renderAll(target);
}

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
  const target = navigate(routes, path, updateHistory);
  renderAll(target);

  routeState.setState({ currentRoute: target }, callListeners);
  userState.ping(); // userBox 업데이트

  if (target.onRender) {
    target.onRender();
  }
}
