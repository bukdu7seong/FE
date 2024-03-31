import { route } from '../../../lib/router/router.js';
/* 
  <div class="side-bar">
    <div class="menu-top">
      <div class="menu-item game">
        <i class="icon-game">
          <img src="../../images/icon/gamepad-solid.svg" alt="Game" route="game">
*/
function createIcon(name, route, icons) {
  const menuItem = document.createElement('div');
  menuItem.className = `menu-item ${name.toLowerCase()}`;
  menuItem.setAttribute('route', route);

  const icon = document.createElement('i');
  icon.className = `icon-${name.toLowerCase()}`;

  const image = document.createElement('img');
  image.src = `../../assets/images/icon/${icons[name]}.svg`;
  image.alt = name;
  image.classList.add(`image-${name.toLowerCase()}`);

  icon.appendChild(image);
  menuItem.appendChild(icon);
  return menuItem;
}

export function sidebar(routes) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'side-bar');

  const menuTop = document.createElement('div');
  menuTop.setAttribute('class', 'menu-top');
  sidebar.appendChild(menuTop);

  const icons = {
    Profile: 'house-solid',
    Game: 'gamepad-solid',
    Tournament: 'trophy-solid',
    Logout: 'sign-out-solid',
  };

  let logoutItem = null;

  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name]) {
      const menuItem = createIcon(name, route, icons);
      if (name.toLowerCase() === 'logout') {
        logoutItem = menuItem;
      } else {
        menuTop.appendChild(menuItem);
        if (window.location.pathname === route) {
          menuItem.classList.add('active');
        }
      }
    }
  });

  sidebar.appendChild(logoutItem);

  sidebar.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    // console.log(menuItem);
    if (menuItem) {
      e.preventDefault();
      const routeValue = menuItem.getAttribute('route');
      if (routeValue) {
        route(routeValue);

        const menuItems = sidebar.querySelectorAll('.menu-item');
        menuItems.forEach((item) => item.classList.remove('active'));

        menuItem.classList.add('active');
      }
    }
  });

  return sidebar;
}
