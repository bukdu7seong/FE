'use strict';

// router
import {
  setDefaultPath,
  routeByState,
  route,
  routes,
  firstRoute,
} from '../lib/router/router.js';
import { setComponent, renderPage, setOnRender } from '../lib/render/render.js';
// pages
import { pageBoard, updateGameBoxContent } from './pages/game.js';
import { updateTournamentBoxContent } from './pages/tournament.js';
// components
import { sidebar } from './components/common/sidebar.js';
import { userBox } from './components/common/userBox.js';
import { profile } from './components/profile/profile.js';
import { signIn } from './components/login/sign_in.js';
import { signUp } from './components/login/sign_up.js';
import { twoFA } from './components/login/twofa.js';
// state
import { gameState, routeState, userState } from '../lib/state/state.js';
// game
import PingPong, { setGameCondition } from './components/game/PingPong.js';
import Tournament from './components/game/Tournament.js';
// utils
import { updateUserBox } from './utils/updateUserBox.js';
import { checkLogin } from './utils/checkLogin.js';

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
  try {
    window.onload = function () {
      setComponent(routes['/profile'], sidebar(routes), userBox());
      setComponent(routes['/game'], sidebar(routes), userBox());
      setComponent(routes['/tournament'], sidebar(routes), userBox());

      setOnRender(routes['/login'], signIn);
      setOnRender(routes['/signup'], signUp);
      setOnRender(routes['/twofa'], twoFA);
      setOnRender(routes['/profile'], profile, updateUserBox);
      setOnRender(routes['/game'], updateGameBoxContent, updateUserBox);
      setOnRender(
        routes['/tournament'],
        updateTournamentBoxContent,
        updateUserBox
      );

      userState.subscribe(updateUserBox);
      routeState.subscribe(checkLogin);
      gameState.subscribe(setGameCondition);

      firstRoute(setDefaultPath(window.location.pathname));
    };

    window.addEventListener('popstate', () => {
      route(routeByState(), false);
    });

    window.onclick = function (event) {
      const currentRoute = routeState.getState();
      const clickedElement = event.target;
      const className = clickedElement.className;
      const elementId = clickedElement.id;

      switch (currentRoute.currentRoute.name) {
        case 'Profile':
          // console.log('profile');
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
            const pongGame = new PingPong(selectedMode, userState.getState().userName, player2Name);
            gameState.setState({ currentGame: pongGame }, false);
            gameState.setState({ currentGameStatus: 'start' }, false);
            gameState.setState({ gameType: 'classic' }, false);

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
