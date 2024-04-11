import { route } from '../../../lib/router/router.js';
import { createLogoutModal } from './logoutModal.js';

function matchPath(str1, str2) {
  str1 = str1.startsWith('/') ? str1.slice(1) : str1;
  str2 = str2.charAt(0).toLowerCase() + str2.slice(1);
  return str1 === str2;
}

export function sidebar(routes) {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-dark navbar-expand-sm py-0 px-3 fixed-top';
  navbar.id = 'mainNavbar';

  const navbarBrand = document.createElement('a');
  navbarBrand.className = 'navbar-brand';
  navbarBrand.href = '#';
  navbarBrand.textContent = 'Bukdu7seong';
  navbar.appendChild(navbarBrand);

  navbarBrand.addEventListener('click', (e) => {
    e.preventDefault();
    const profileRoute = Object.keys(routes).find(
      (key) => routes[key].name === 'Profile'
    );
    if (profileRoute) {
      route(profileRoute);
    }
  });

  const toggleButton = document.createElement('button');
  toggleButton.className = 'navbar-toggler';
  toggleButton.dataset.bsToggle = 'collapse';
  toggleButton.dataset.bsTarget = '#navLinks';
  toggleButton.ariaLabel = 'Toggle navigation';
  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'navbar-toggler-icon';
  toggleButton.appendChild(toggleIcon);
  navbar.appendChild(toggleButton);

  const menuDiv = document.createElement('div');
  menuDiv.className = 'collapse navbar-collapse';
  menuDiv.id = 'navLinks';
  const menuList = document.createElement('ul');
  menuList.className = 'navbar-nav';

  const icons = {
    Profile: '/assets/images/icon/house-solid.png',
    Game: '/assets/images/icon/gamepad-solid.png',
    Tournament: '/assets/images/icon/trophy-solid.png',
    Logout: '/assets/images/icon/door-closed-fill.png',
  };

  routes['/logout'] = { name: 'Logout' };

  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name] && matchPath(route, name)) {
      const menuItem = document.createElement('li');
      menuItem.className = 'nav-item';

      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = '';
      link.setAttribute('route', route);

      const iconImg = document.createElement('img');
      iconImg.src = icons[name];
      iconImg.alt = name;
      iconImg.className = 'navbar-icon';

      link.appendChild(iconImg);
      menuItem.appendChild(link);
      menuList.appendChild(menuItem);
    }
  });

  menuDiv.appendChild(menuList);
  navbar.appendChild(menuDiv);

  navbar.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a[route]');
    if (targetLink) {
      e.preventDefault();

      const iconImg = targetLink.querySelector('img.navbar-icon');
      if (iconImg && iconImg.alt === 'Logout') {
        createLogoutModal();
        return;
      }

      route(targetLink.getAttribute('route'));
    }
  });

  return navbar;
}
