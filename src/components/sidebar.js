import { Render } from '../../lib/render.js';

export function sidebar(routes, handleNavigation) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'side-bar');

  const menuTop = document.createElement('div');
  menuTop.setAttribute('class', 'menu-top');

  const icons = {
    Profile: 'house-solid',
    Game: 'gamepad-solid',
    Tournament: 'trophy-solid',
    Settings: 'gear-solid',
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
      image.setAttribute('route', route); // 수정된 부분

      icon.appendChild(image);
      menuItem.appendChild(icon);

      menuTop.appendChild(menuItem); // 이 부분을 추가합니다.
      if (name === 'Settings') {
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
      const target = handleNavigation(routes, targetImg.getAttribute('href'));
      Render(target);
    }
  });

  return sidebar;
}
