// app.js는 브라우저가 새로고침 될 때마다 실행.
import { firstRoute, route } from '../lib/router/router.js';
import { initComponent } from '../lib/router/component.js';
import { navigate } from '../lib/router/navigate.js';
import {
  renderPage,
  renderComponent,
  renderAll,
} from '../lib/router/render.js';
// pages
import { pageLogIn } from './pages/login.js';
import { pageProfile } from './pages/profile.js';
import { pageGame } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { pageSwitch } from './pages/switch.js';
// components
import { sidebar } from './components/sidebar.js';
import { profile } from './components/profile.js';
// state
import { store, routeState, gameState } from '../lib/state/store.js';
import { updateProfile } from '../lib/state/update.js';
import { checkLogin } from '../lib/state/check_login.js';
import { defaultProfile } from './utils/default_profile.js';
import PingPong from './components/game/PingPong.js';
import { pageBoard } from './pages/pong.js';
import Tournament from './components/game/Tournament.js';

// { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 component는 여러개일 수 있기에 배열로 설정
const routes = {
  '/login': { name: 'Login', page: pageLogIn, component: [] },
  '/profile': { name: 'Profile', page: pageProfile, component: [] },
  '/game': { name: 'Game', page: pageGame, component: [] },
  '/tournament': { name: 'Tournament', page: pageTournament, component: [] },
  '/logout': { name: 'Logout', page: pageSwitch, component: [] },
};

// SetComponent -> routes 객체의 component 배열에 속성 추가
// SetComponent(routes, sidebar(routes, Navigate), profile('junyojeo'));
// 나머지 페이지에도 컴포넌트 추가
// Route(routes);

// 상태 변경을 구독하고, 상태가 변경될 때마다 updateUI 함수를 실행
// 상태가 변경될 때마다 구독자(updateUI 함수를 뜻함)에게 알림을 보내는 역할
// store.subscribe(updateUI); -> access token 체크할 때 쓰면 좋을 듯!!

// function checkWindowSize() {
//   const gameBox = document.getElementsByClassName('game-box')[0];
//   if (!gameBox) {
//     return;
//   }
//
//   if (window.innerWidth <= 940 || window.innerHeight <= 660) {
//     gameBox.style.pointerEvents = 'none';
//   } else {
//     gameBox.style.pointerEvents = 'auto';
//   }
//
//   // 뭔가 보드에서 키 입력을 받지 않도록 해야하는데... 아직 모르겠다.
//   const gameBoard = document.getElementsByClassName('board')[0];
//   if (!gameBoard) {
//     return;
//   }
//
//   if (window.innerWidth <= 940 || window.innerHeight <= 660) {
//     console.log('small...');
//   } else {
//     //
//   }
// }

function init() {
  // 로그인 체크 로직
  // 1. local storage에 토큰이 있는지 확인
  // 2. 토큰이 있다면, 유효한 토큰인지 확인
  // 3. 유효한 토큰일 경우, store에 로그인 상태를 true로 변경
  // 3-1. 유효하지 않은 토큰일 경우, store에 로그인 상태를 false로 변경
  // 4. store의 로그인 상태에 따라 페이지 렌더링
  store.setState({ isLoggedIn: false });

  // 뭔가... 깔끔하게 고칠 수 있을 것 같은데...
  // 만약 로그인 안했다면 로그인 페이지로 이동, 했다면 경로에 따라 이동
  // 즉 로그인 안했으면 로그인 페이지로 강제 리다이렉트 해야 함.
  // 또한 로그인 페이지에선 컴포넌트를 설정하지 않아야 함.
  // 음... 구상 중...
  // onload에서는 사용자가 페이지에 최초 접속했을 때, 로그인에 따라 페이지를 렌더링하는 역할을 해야 할 것 같다.
  window.onload = function () {
    // window.onload -> 브라우저가 새로고침 될 때마다 실행
    // SetComponent -> routes 객체의 모든 속성에 component 속성을 추가
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/login'
    ) {
      // initComponent(routes);
      // firstRoute(routes);
      route(routes, window.location.pathname, false);
    } else {
      initComponent(routes, sidebar(routes), profile());
      // defaultProfile -> 프로필 정보가 없을 때 기본 프로필을 생성
      // firstRoute(routes);
      route(routes, window.location.pathname, false);
      defaultProfile();
    }
    // store.subscribe() -> 상태가 변경될 때마다 실행
    store.subscribe(updateProfile);
    // checkLogin -> 로그인 상태 확인
    checkLogin(routes);
  };

  /* ****************** resize 관련 코드 *******************************/
  // 페이지 리사이즈 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
  // window.addEventListener('resize', checkWindowSize);

  // navigation 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
  const observer = new MutationObserver(checkWindowSize);
  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(document.body, config);
  /* *************************************************************** */

  /* ********************** 뒤로가기 코드 *******************************/
  // window.addEventListener() -> 브라우저의 이벤트를 수신하는 함수
  window.addEventListener('popstate', () => {
    route(routes, window.location.pathname, false);
  });
  /* *************************************************************** */

  // routeState.subscribe((state) => {
  //   gameState.setState('end');
  // });

  window.onclick = function (event) {
    const currentRoute = routeState.getState();
    const clickedElement = event.target;
    const className = clickedElement.className;

    if (currentRoute.currentRoute.name === 'Game') {
      if (className !== 'player-option') {
        return;
      } // 임시로...

      renderPage(pageBoard(), 'game-box');
      // 현재 로그인한 사용자와 상대방의 이름을 넘겨줘야 한다.
      const pongGame = new PingPong('object', 'salee2', 'gychoi');
      pongGame.startGame();
    } else if (currentRoute.currentRoute.name === 'Tournament') {
      if (className !== 'player-option') {
        return;
      } // 임시로...

      renderPage(pageBoard(), 'game-box');
      const playerNames = ['salee2', 'gychoi', 'jwee', 'junyo'];
      const tournament = new Tournament('object', playerNames);
      tournament.startTournament();
    }
  };
}

init();
