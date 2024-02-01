import { Route } from './utils/router/router.js';
import { SetComponent } from './utils/router/setcomponent.js';
import { Navigate } from './utils/router/navigate.js';
// pages
import { pageProfile } from './pages/profile.js';
import { pageGame } from './pages/game.js';
import { pageTournament } from './pages/tournament.js';
import { pageSwitch } from './pages/switch.js';
// components
import { sidebar } from './components/sidebar.js';
import { profile } from './components/profile.js';
import { getBoard, setBoard } from './components/pong.js';

// 라우팅 경로를 설정. { 경로: { 이름, 페이지, 컴포넌트 } } 렌더링 될 컴포넌트는 배열로 설정.
const routes = {
  '/profile': { name: 'Profile', page: pageProfile, component: [] },
  '/game': { name: 'Game', page: pageGame, component: [] },
  '/tournament': { name: 'Tournament', page: pageTournament, component: [] },
  '/logout': { name: 'Logout', page: pageSwitch, component: [] },
};

// router -> sidebar, profile 제외 화면 Render, navigater()
// SetComponent -> sidebar, profile 컴포넌트를 화면에 세팅 해둠.
SetComponent(routes, sidebar(routes, Navigate), profile('junyojeo'));
// 나머지 화면은 라우터를 통해 세팅.
Route(routes);

// 상태 변경에 따른 UI 업데이트를 수행하는 함수
function updateUI(state) {
  // 예: 프로필 이미지 URL이 변경된 경우, 이미지를 업데이트.
  if (document.getElementById('profileImage')) {
    document.getElementById('profileImage').src = state.profileImageUrl;
  }
  // 예: 프로필 이름이 변경된 경우, 이름을 업데이트.
  if (document.getElementsByClassName('profile-name').length > 0) {
    [...document.getElementsByClassName('profile-name')].forEach((element) => {
      element.innerHTML = state.profileName;
    });
  }
}

// 스토어의 상태 변경을 구독합니다.
store.subscribe(updateUI);

// 애플리케이션 초기화 로직
function init() {
  // 랜덤 이미지를 프로필 사진으로 설정
  window.onload = function () {
    // 이미지 경로를 담은 배열을 생성합니다.
    const images = [
      '../images/profile/profile_01.jpg',
      '../images/profile/profile_02.jpg',
      '../images/profile/profile_03.jpg',
      '../images/profile/profile_04.jpg',
    ];
    // 랜덤 숫자를 생성.
    var index = Math.floor(Math.random() * images.length);
    // 랜덤 이미지를 출력합니다.
    document.getElementById('randomImage').src = images[index];
  };

  // 앞, 뒤 버튼을 누르면, 해당 라우팅 경로의 객체를 반환.
  window.addEventListener('popstate', () => {
    const target = Navigate(routeObject, window.location.pathname, false);
    Render(target);
  }); // Todo. 중복 이벤트 처리 방지

  // 브라우저의 창 크가 변경될 때마다 이벤트를 발생시키고 지웁니다. 중복 이벤트 처리 방지를 위해 사용.
  window.addEventListener('resize', moveWindow);
  window.removeEventListener('resize', moveWindow);

  // 게임 시작 버튼을 누르면 게임이 시작되도록 설정
  window.onclick = function () {
    if (document.getElementById('player1')) {
    }
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
}

init();
