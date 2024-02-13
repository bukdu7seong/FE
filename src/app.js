// app.js는 브라우저가 새로고침 될 때마다 실행.
import { Route } from '../lib/router/router.js';
import { SetComponent } from '../lib/router/setcomponent.js';
import { Navigate } from '../lib/router/navigate.js';
// pages
import { pageLogIn } from './pages/login.js';
import { pageProfile } from './pages/profile.js';
import { pageGame } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { pageSwitch } from './pages/switch.js';
// components
import { sidebar } from './components/sidebar.js';
import { profile } from './components/profile.js';
import { getBoard, setBoard } from './components/pong.js';
// state
import { store } from '../lib/state/store.js';
import { updateProfile } from '../lib/state/update.js';
import { checkLogin } from '../lib/state/check_login.js';
import { defaultProfile } from '../lib/state/default_profile.js';

// { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 component는 여러개일 수 있기에 배열로 설정
const routes = {
  '/login': { name: 'Login', page: pageLogIn, component: [] },
  '/profile': { name: 'Profile', page: pageProfile, component: [] },
  '/game': { name: 'Game', page: pageGame, component: [] },
  '/tournament': { name: 'Tournament', page: pageTournament, component: [] },
  '/logout': { name: 'Logout', page: pageSwitch, component: [] },
};

function init() {
  window.onload = function () {
    // window.onload -> 브라우저가 새로고침 될 때마다 실행
    // SetComponent -> routes 객체의 모든 속성에 component 속성을 추가
    Route(routes);
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/login'
    ) {
      SetComponent(routes);
    } else {
      SetComponent(routes, sidebar(routes), profile('junyojeo'));
      // defaultProfile -> 프로필 정보가 없을 때 기본 프로필을 생성
      defaultProfile();
    }
    // store.subscribe() -> 상태가 변경될 때마다 실행
    store.subscribe(updateProfile);
    // checkLogin -> 로그인 상태 확인
    checkLogin(routes);
  };

  // window.addEventListener() -> 브라우저의 이벤트를 수신하는 함수
  window.addEventListener('popstate', () => {
    const target = Navigate(routes, window.location.pathname, false);
    Render(target);
  });

  // 게임 시작 버튼을 클릭하면 게임을 시작
  window.onclick = function () {
    if (document.getElementById('player2')) {
      document.getElementById('player2').addEventListener('click', function () {
        const gameBox = document.getElementsByClassName('game-box')[0];
        while (gameBox.firstChild) {
          gameBox.removeChild(gameBox.firstChild);
        }
        gameBox.appendChild(getBoard());
        setBoard();
      });
    }
  };
}

init();
