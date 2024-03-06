// app.js는 브라우저가 새로고침 될 때마다 실행.
import { setDefaultPath, routeByState, route } from '../lib/router/router.js';
import { setComponent, renderPage, setOnRender } from '../lib/render/render.js';
// pages
import { pageLogIn } from './pages/login/sign_in.js';
import { pageSignUp } from './pages/login/sign_up.js';
import { pageProfile } from './pages/profile.js';
import { pageGame, pageBoard } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { pageSwitch } from './pages/switch.js';
// components
import { sidebar } from './components/common/sidebar.js';
import { userBox } from './components/common/userBox.js';
// state
import {
  gameState,
  globalState,
  routeState,
  userState,
} from '../lib/state/state.js';
// game
import PingPong, { setGameCondition } from './components/game/PingPong.js';
import Tournament from './components/game/Tournament.js';
import { checkLogin } from './utils/checkLogin.js';
// utils
import { updateUserBox } from '../lib/state/update.js';
import { profile } from './components/profile/profile.js';
import { login } from './components/login/sign_in.js';
import { signup } from './components/login/sign_up.js';

// { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 component는 여러개일 수 있기에 배열로 설정
export const routes = {
  '/login': { name: 'Login', page: pageLogIn, component: [], onRender: null },
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

// 상태 변경을 구독하고, 상태가 변경될 때마다 updateUI 함수를 실행
// 상태가 변경될 때마다 구독자(updateUI 함수를 뜻함)에게 알림을 보내는 역할
// store.subscribe(updateUI); -> access token 체크할 때 쓰면 좋을 듯!!

function checkWindowSize() {
  const gameBox = document.getElementsByClassName('game-box')[0];
  if (!gameBox) {
    return;
  }

  if (window.innerWidth <= 380 || window.innerHeight <= 280) {
    gameBox.style.pointerEvents = 'none';
  } else {
    gameBox.style.pointerEvents = 'auto';
  }

  // 뭔가 보드에서 키 입력을 받지 않도록 해야하는데... 아직 모르겠다.
  const gameBoard = document.getElementsByClassName('board')[0];
  if (!gameBoard) {
    return;
  }

  // if (window.innerWidth <= 940 || window.innerHeight <= 660) {
  //   console.log('small...');
  // } else {
  //   //
  // }
}

function hideModal() {
  const modalElement = document.getElementById('gameSettingModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

function init() {
  // 로그인 체크 로직
  // 1. local storage에 토큰이 있는지 확인
  // 2. 토큰이 있다면, 유효한 토큰인지 확인
  // 3. 유효한 토큰일 경우, store에 로그인 상태를 true로 변경
  // 3-1. 유효하지 않은 토큰일 경우, store에 로그인 상태를 false로 변경
  // 4. store의 로그인 상태에 따라 페이지 렌더링
  try {
    /* ****************** 최초 접속 시 설정 *******************************/
    window.onload = function () {
      // userBox에 들어갈 유저의 이름을 설정해야 한다.
      // userBox(login한 유저의 이름) 이런 식으로...
      setComponent(routes['/profile'], sidebar(routes), userBox());
      setComponent(routes['/game'], sidebar(routes), userBox());
      setComponent(routes['/tournament'], sidebar(routes), userBox());

      setOnRender(routes['/login'], login);
      setOnRender(routes['/signup'], signup);
      setOnRender(routes['/profile'], profile);

      userState.subscribe(updateUserBox); // 언제 호출하는게 좋을까?
      // routeState.subscribe(checkLogin);
      gameState.subscribe(setGameCondition);

      route(routes, setDefaultPath(window.location.pathname, routes), false);
    };
    /* *************************************************************** */

    /* ****************** resize 관련 코드 *******************************/
    // 페이지 리사이즈 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
    // window.addEventListener('resize', checkWindowSize);

    // navigation 시, window 크기가 일정 사이즈 이하라면, 클릭을 비활성화
    // 네비게이션 시 발생할 이벤트를 정의하므로, 단순 페이지 리사이즈 말고도 여러 방식으로 사용할 수 있을듯.
    // const observer = new MutationObserver(checkWindowSize);
    // const config = { attributes: true, childList: true, subtree: true };
    // observer.observe(document.body, config);

    /* *********************** 뒤로가기 **********************************/
    // window.addEventListener() -> 브라우저의 이벤트를 수신하는 함수
    window.addEventListener('popstate', () => {
      route(routes, routeByState(), false);
    });

    window.onclick = function (event) {
      const currentRoute = routeState.getState();
      const clickedElement = event.target;
      const className = clickedElement.className;
      const elementId = clickedElement.id;

      switch (currentRoute.currentRoute.name) {
        case 'Profile':
          console.log('profile');
          break;
        case 'Game':
          // if (className === 'player-option') {
          //   // modal을 클릭하는 것으로 변경해야 한다.
          //   renderPage(pageBoard(), 'game-box');
          //   // 현재 로그인한 사용자와 모달에서 상대방의 이름을 넘겨줘야 한다.
          //   const pongGame = new PingPong('object', 'salee2', 'gychoi');
          //   pongGame.startGame();
          // }
          if (elementId === 'startGameButton') {
            const player2Name = document.getElementById('player-name').value;
            const gameModes = document.getElementsByName('gameMode');
            let selectedMode;
            for (const mode of gameModes) {
              if (mode.checked) {
                selectedMode = mode.id; // This will be 'normalMode', 'speedMode', or 'objectMode'
                break;
              }
            }
            hideModal();
            renderPage(pageBoard(), 'game-box');
            const pongGame = new PingPong(selectedMode, 'salee2', player2Name);
            gameState.setState({ currentGame: pongGame }, false);
            gameState.setState({ currentGameStatus: 'start' }, false);
            pongGame.startGame();
          }
          break;
        case 'Tournament':
          if (elementId === 'startTournamentButton') {
            const player1Name = document.getElementById('player1-name').value;
            const player2Name = document.getElementById('player2-name').value;
            const player3Name = document.getElementById('player3-name').value;
            const player4Name = document.getElementById('player4-name').value;

            // 게임 모드 가져오기
            const gameModes = document.getElementsByName('gameMode');
            let selectedMode = '';
            for (const mode of gameModes) {
              if (mode.checked) {
                selectedMode = mode.id;
                break;
              }
            }

            renderPage(pageBoard(), 'game-box');
            const playerNames = [
              player1Name,
              player2Name,
              player3Name,
              player4Name,
            ];
            const tournament = new Tournament(selectedMode, playerNames);
            tournament.startTournament();
          }
          break;
        default:
          break;
      }
    };
  } catch (e) {
    console.log('app.js: ', e);
  }
}

init();
