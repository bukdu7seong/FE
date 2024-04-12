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
import { pageBoard } from './pages/game.js';
// components
import { sidebar } from './components/common/sidebar.js';
import { profile } from './components/profile/profile.js';
import { signIn } from './components/login/signIn.js';
import { signUp } from './components/login/signUp.js';
import { twoFA } from './components/login/twofa.js';
// state
import { gameState, routeState, userState } from '../lib/state/state.js';
// game
import PingPong, { setGameCondition } from './components/game/PingPong.js';
import Tournament from './components/game/Tournament.js';
// utils
import { checkLogin } from './components/common/checkLogin.js';
import { handleOAuth2Redirect } from './components/login/oauth2/oauth2RedirectHandler.js';
import applyLanguageClassic from './components/language/applyLanguageClassic.js';
import applyLanguageTournamentBox from './components/language/applyLanguageTournamentBox.js';

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
    window.onload = async function () {
      setOnRender(routes['/login'], signIn);
      setOnRender(routes['/signup'], signUp);
      setOnRender(routes['/twofa'], twoFA);
      setOnRender(routes['/profile'], profile);
      setOnRender(routes['/game'], applyLanguageClassic);
      setOnRender(routes['/tournament'], applyLanguageTournamentBox);
      setOnRender(routes['/oauth2-redirect'], handleOAuth2Redirect);

      const sidebarComponent = sidebar(routes);
      setComponent(routes['/profile'], sidebarComponent);
      setComponent(routes['/game'], sidebarComponent);
      setComponent(routes['/tournament'], sidebarComponent);

      routeState.subscribe(checkLogin);
      gameState.subscribe(setGameCondition);

      const firstPath = await setDefaultPath(window.location.href);

      firstRoute(firstPath);
    };

    window.addEventListener('popstate', () => {
      route(routeByState(window.location.pathname), false);
    });

    window.onclick = function (event) {
      const currentRoute = routeState.getState();
      const clickedElement = event.target;
      const className = clickedElement.className;
      const elementId = clickedElement.id;

      switch (currentRoute.currentRoute.name) {
        case 'Profile':
          break;
        case 'Game':
          if (elementId === 'startGameButton') {
            const player2Name = document.getElementById('player-name').value;
            const gameModes = document.getElementsByName('gameMode');
            let selectedMode;
            for (const mode of gameModes) {
              if (mode.checked) {
                selectedMode = mode.id;
                break;
              }
            }
            if (gameState.getState().currentGameStatus === 'playing') {
              hideModal();
              renderPage(pageBoard(), 'game-box');
              const pongGame = new PingPong(
                selectedMode,
                userState.getState().userName,
                player2Name
              );
              gameState.setState({ currentGame: pongGame }, false);
              gameState.setState({ currentGameStatus: 'start' }, false);
              gameState.setState({ gameType: 'classic' }, false);

              pongGame.startGame();
            }
          }
          break;
        case 'Tournament':
          if (elementId === 'startTournamentButton') {
            const player1Name = document.getElementById('player1-name').value;
            const player2Name = document.getElementById('player2-name').value;
            const player3Name = document.getElementById('player3-name').value;
            const player4Name = document.getElementById('player4-name').value;

            const gameModes = document.getElementsByName('gameMode');
            let selectedMode = '';
            for (const mode of gameModes) {
              if (mode.checked) {
                selectedMode = mode.id;
                break;
              }
            }

            if (gameState.getState().currentGameStatus === 'playing') {
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
          }
          break;
        default:
          break;
      }
    };
  } catch (e) {
    console.log(e);
  }
}

init();
