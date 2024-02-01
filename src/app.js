import { sidebar } from './components/sidebar.js';
import { profile } from './components/profile.js';
import { pageToggle } from './pages/toggle.js';
import { Route, handleNavigation } from '../lib/router.js';
import { pageProfile } from './pages/profile.js';
import { pageGame } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { SetComponent } from '../lib/render.js';
import { getBoard, setBoard } from './components/pong.js';

const routes = {
  '/profile': { name: 'Profile', page: pageProfile, component: [] },
  '/game': { name: 'Game', page: pageGame, component: [] },
  '/tournament': { name: 'Tournament', page: pageTournament, component: [] },
  '/settings': { name: 'Settings', page: pageToggle, component: [] },
};

// 지금은 모든 라우팅 경로의 페이지에 동일한 sidebar 컴포넌트를 적용하지만...
// 굳이 이렇게 할 필요 없이 별도로 컴포넌트를 추가하는 방식으로 구현해도 될 듯.
SetComponent(routes, sidebar(routes, handleNavigation), profile('junyojeo'));
Route(routes);

// 문서가 로드될 때 실행되는 함수를 정의합니다.
window.onload = function () {
  // 이미지 경로를 배열로 저장합니다.
  const images = [
    '../images/profile/profile_01.jpg',
    '../images/profile/profile_02.jpg',
    '../images/profile/profile_03.jpg',
    '../images/profile/profile_04.jpg',
  ];
  // 랜덤 인덱스를 생성합니다.
  var index = Math.floor(Math.random() * images.length);
  // 이미지 요소의 src 속성을 랜덤 이미지로 설정합니다.
  // console.log(document.getElementById('randomImage'));
  document.getElementById('randomImage').src = images[index];
};

/*
  이렇게 페이지마다 로딩해야 하는 이벤트가 있어서
  상태 관리 요소를 하나 추가해야 할 것 같다.
*/
// game에서만 적용되게 해야 함

window.removeEventListener('resize', moveWindow);

window.addEventListener('resize', moveWindow);

// 임시로 Player2 div를 누르면 게임이 시작되게 설정
// 페이지가 바뀔 때 로딩되면서 이벤트가 설정되어야 하는데... 임시로 일단 window 클릭 이벤트로 체크
window.onclick = function () {
  if (document.getElementById('player2')) {
    document.getElementById('player2').addEventListener('click', function () {
      const gameBox = document.getElementsByClassName('game-box')[0]; // game-box div를 호출
      while (gameBox.firstChild) {
        gameBox.removeChild(gameBox.firstChild);
      } // game-box div의 자식 요소들을 모두 삭제
      gameBox.appendChild(getBoard()); // game-box div에 board div를 추가
      setBoard(); // 게임에 필요한 요소들을 설정
    });
  }
};
