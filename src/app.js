// app.js는 브라우저가 새로고침 될 때마다 실행.
import { Route } from '../lib/router/router.js';
import { SetComponent } from '../lib/router/setcomponent.js';
import { Navigate } from '../lib/router/navigate.js';
// pages
import { pageLogin } from './pages/login.js';
import { pageProfile } from './pages/profile.js';
import { pageGame } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { pageSwitch } from './pages/switch.js';
// components
import { sidebar } from './components/sidebar.js';
import { profile } from './components/profile.js';
import { getBoard, setBoard } from './components/pong.js';
// state
import { store, updateUI } from '../lib/state/store.js';
import { checkLogin } from '../lib/state/check_login.js';
import { defaultProfile } from '../lib/state/default_profile.js';

// { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 component는 여러개일 수 있기에 배열로 설정
const routes = {
  '/login': { name: 'Login', page: pageLogin, component: [] },
  '/profile': { name: 'Profile', page: pageProfile, component: [] },
  '/game': { name: 'Game', page: pageGame, component: [] },
  '/tournament': { name: 'Tournament', page: pageTournament, component: [] },
  '/logout': { name: 'Logout', page: pageSwitch, component: [] },
};

// SetComponent -> routes 객체의 component 배열에 속성 추가
SetComponent(routes, sidebar(routes, Navigate), profile('junyojeo'));
// 나머지 페이지에도 컴포넌트 추가
Route(routes);

// 상태 변경을 구독하고, 상태가 변경될 때마다 updateUI 함수를 실행
// 상태가 변경될 때마다 구독자(updateUI 함수를 뜻함)에게 알림을 보내는 역할
store.subscribe(updateUI);

function checkWindowSize() {
  const gameBox = document.getElementsByClassName('game-box')[0];
  if (!gameBox) {
    return;
  }

  if (window.innerWidth <= 940 || window.innerHeight <= 660) {
    gameBox.style.pointerEvents = 'none';
  } else {
    gameBox.style.pointerEvents = 'auto';
  }

  // 뭔가 보드에서 키 입력을 받지 않도록 해야하는데... 아직 모르겠다.
  const gameBoard = document.getElementsByClassName('board')[0];
  if (!gameBoard) {
    return;
  }

  if (window.innerWidth <= 940 || window.innerHeight <= 660) {
    console.log('small...');
  } else {
    //
  }
}

function init() {
  window.onload = function () {
    // window.onload -> 브라우저가 새로고침 될 때마다 실행
    checkLogin(store, routes, Navigate);
    checkWindowSize(); // 페이지 로드 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
    defaultProfile();
  };

  // 페이지 리사이즈 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
  window.addEventListener('resize', checkWindowSize);

  // navigation 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
  const observer = new MutationObserver(checkWindowSize);
  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(document.body, config);

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
