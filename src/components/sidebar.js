import { Render } from '../../lib/render.js';
/*
 * @description: 라우터 객체를 받아서 사이드 바를 생성한다.
 * @param: routes - 라우터 객체 (라우터 객체의 객체)
 * @param: handleNavigation - 라우터 함수
 * @return: sidebar - HTML 형식의 네비게이션 바
 */
export function sidebar(routes, handleNavigation) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'side-bar');

  for (const route in routes) {
    // const link = document.createElement('a');
    // link.setAttribute('href', route);
    // link.innerText = routes[route].name;
    // sidebar.appendChild(link);

    const link = document.createElement('div');
    // 으악...
    if (routes[route].name === 'Profile') {
      link.classList.add('menu-item');
      link.classList.add('home');

      const homeIcon = document.createElement('i');
      homeIcon.classList.add('icon-home');

      const homeImage = document.createElement('img');
      homeImage.src = '../../images/icon/house-solid.svg';
      homeImage.alt = 'Home';
      homeImage.setAttribute('href', route);
      homeImage.classList.add('image-home');

      homeIcon.appendChild(homeImage);
      link.appendChild(homeIcon);
    } else if (routes[route].name === 'Game') {
      link.classList.add('menu-item');
      link.classList.add('game');

      const gameIcon = document.createElement('i');
      gameIcon.classList.add('icon-game');

      const gameImage = document.createElement('img');
      gameImage.src = '../../images/icon/gamepad-solid.svg';
      gameImage.alt = 'Game';
      gameImage.setAttribute('href', route);
      gameImage.classList.add('image-game');

      gameIcon.appendChild(gameImage);
      link.appendChild(gameIcon);
    } else if (routes[route].name === 'Tournament') {
      link.classList.add('menu-item');
      link.classList.add('tournament');

      const tournamentIcon = document.createElement('i');
      tournamentIcon.classList.add('icon-tournament');

      const tournamentImage = document.createElement('img');
      tournamentImage.src = '../../images/icon/trophy-solid.svg';
      tournamentImage.alt = 'Tournament';
      tournamentImage.setAttribute('href', route);
      tournamentImage.classList.add('image-tournament');

      tournamentIcon.appendChild(tournamentImage);
      link.appendChild(tournamentIcon);
    } else {
      // skip
    }

    sidebar.appendChild(link);
  }

  sidebar.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'IMG') {
      const target = handleNavigation(routes, e.target.getAttribute('href'));
      Render(target);
    }
  });

  return sidebar;
}
