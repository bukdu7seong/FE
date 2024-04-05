// pages
import { pageLogIn } from '../../src/pages/login/sign_in.js';
import { pageSignUp } from '../../src/pages/login/sign_up.js';
import { pageProfile } from '../../src/pages/profile.js';
import { pageGame } from '../../src/pages/game.js';
import { pageTournament } from '../../src/pages/tournament.js';
import { pageTwoFA } from '../../src/pages/login/twofa.js';
import { PageNotFound } from '../../src/pages/404.js';
// state
import { gameState, globalState, routeState } from '../state/state.js';
// render
import { renderAll } from '../render/render.js';
// router
import { navigate } from './navigate.js';
// utils
import { initUserInfo } from '../../src/utils/initUser.js';

export const routes = {
  '/login': { name: 'Login', page: pageLogIn, component: [], onRender: [] },
  '/signup': {
    name: 'Signup',
    page: pageSignUp,
    component: [],
    onRender: [],
  },
  '/profile': {
    name: 'Profile',
    page: pageProfile,
    component: [],
    onRender: [],
  },
  '/game': { name: 'Game', page: pageGame, component: [], onRender: [] },
  '/tournament': {
    name: 'Tournament',
    page: pageTournament,
    component: [],
    onRender: [],
  },
  '/logout': {
    name: 'Logout',
    page: null,
    component: [],
    onRender: [],
  },
  '/twofa': { name: 'TwoFA', page: pageTwoFA, component: [], onRender: [] },
  '/oauth2-redirect': {
    name: 'OAuth2Redirect',
    page: null,
    component: [],
    onRender: [],
  },
  '/404': { name: '404', page: PageNotFound, component: [], onRender: [] },
};

export function routeByState(path) {
  routeState.ping();

  if (!globalState.getState().isLoggedIn) {
    return '/login';
  } else if (path === '/' || path === '/login') {
    return '/';
  } else {
    return path;
  }
}

export function setDefaultPath(href = window.location.href) {
  if (
    window.location.pathname === '/oauth2-redirect' &&
    window.location.search.includes('code')
  ) {
    localStorage.setItem('code', window.location.search);
    return '/oauth2-redirect';
  } else if (window.location.pathname !== '/signup') {
    localStorage.removeItem('code');
  }

  routes['/'] = routes['/profile'];

  const url = new URL(href);
  href = url.pathname;

  if (href === '/' || href === '/login') {
    return '/';
  } else {
    return href;
  }
}

// route와 다르게 checkLogin이 실행되지 않음.
export function redirectRoute(path, updateHistory = true) {
  const target = navigate(routes, path, updateHistory);
  if (!target) {
    return;
  }
  renderAll(target);

  routeState.setState({ currentRoute: target }, false);
  gameState.setState({ currentGameStatus: 'idle' });

  if (target.onRender) {
    target.onRender.forEach((func) => {
      func();
    });
  }
}

export function route(
  path = window.location.pathname,
  updateHistory = true,
  callListeners = true
) {
  const target = navigate(routes, path, updateHistory);
  if (!target) {
    return;
  }
  renderAll(target);

  routeState.setState({ currentRoute: target }, callListeners);
  gameState.setState({ currentGameStatus: 'idle' });

  // 라우트 객체에 onRender 콜백이 있으면 호출
  if (target.onRender) {
    target.onRender.forEach((func) => {
      func();
    });
  }
}

// profile로 향하는 첫 번째 라우트
export function firstRoute(path) {
  const target = navigate(routes, path, true);
  renderAll(target);

  routeState.setState({ currentRoute: target });
  gameState.setState({ currentGameStatus: 'idle' });

  if (globalState.getState().isLoggedIn) {
    initUserInfo().then(() => {
      if (target.onRender) {
        target.onRender.forEach((func) => {
          func();
        });
      }
    });
  }
}
