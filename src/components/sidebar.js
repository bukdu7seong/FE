import { Render } from '../utils/router/render.js';

// 이 함수는 라우터 객체를 받아서, 해당 객체의 페이지를 렌더링한다.
export function sidebar(routes, Navigate) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'side-bar');

  const menuTop = document.createElement('div');
  menuTop.setAttribute('class', 'menu-top');

  const icons = {
    Profile: 'house-solid',
    Game: 'gamepad-solid',
    Tournament: 'trophy-solid',
    Logout: 'arrow-right-from-bracket-solid',
  };

  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name]) {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item', name.toLowerCase());

      const icon = document.createElement('i');
      icon.classList.add(`icon-${name.toLowerCase()}`);

      const image = document.createElement('img');
      image.src = `../../images/icon/${icons[name]}.svg`;
      image.alt = name;
      //   image.setAttribute('href', route);
      image.setAttribute('route', route);

      icon.appendChild(image);
      menuItem.appendChild(icon);

      menuTop.appendChild(menuItem);
      if (name === 'Logout') {
        sidebar.appendChild(menuItem);
      } else {
        menuTop.appendChild(menuItem);
      }
    }
  });

  sidebar.appendChild(menuTop);

  sidebar.addEventListener('click', (e) => {
    e.preventDefault();
    const targetImg = e.target.closest('img');
    if (targetImg) {
      const target = Navigate(routes, targetImg.getAttribute('route'));
      Render(target);
    }
  });

  return sidebar;
}
