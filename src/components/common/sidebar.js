import { route } from '../../../lib/router/router.js';
import { createLogoutModal } from '../../pages/logoutModal.js';

export function sidebar(routes) {
  // 네비게이션 바를 위한 <nav> 태그 생성
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-dark navbar-expand-md py-0 px-3 fixed-top';
  navbar.id = 'mainNavbar';

  // 로고나 브랜드 이름을 위한 <a> 태그
  const navbarBrand = document.createElement('a');
  navbarBrand.className = 'navbar-brand';
  navbarBrand.href = '#';
  navbarBrand.textContent = 'Bukdu7seong'; // 브랜드 이름을 여기에 입력
  navbar.appendChild(navbarBrand);

  navbarBrand.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 동작 방지
    const profileRoute = Object.keys(routes).find(
      (key) => routes[key].name === 'Profile'
    );
    if (profileRoute) {
      route(profileRoute); // 프로필 페이지로 라우팅
    }
  });

  // 토글 버튼 생성
  const toggleButton = document.createElement('button');
  toggleButton.className = 'navbar-toggler';
  toggleButton.dataset.bsToggle = 'collapse';
  toggleButton.dataset.bsTarget = '#navLinks';
  toggleButton.ariaLabel = 'Toggle navigation';
  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'navbar-toggler-icon';
  toggleButton.appendChild(toggleIcon);
  navbar.appendChild(toggleButton);

  // 메뉴 아이템을 위한 <div> 및 <ul> 태그 생성
  const menuDiv = document.createElement('div');
  menuDiv.className = 'collapse navbar-collapse';
  menuDiv.id = 'navLinks';
  const menuList = document.createElement('ul');
  menuList.className = 'navbar-nav';

  // 아이콘 및 라우트 매핑
  const icons = {
    Profile: 'house-solid',
    Game: 'gamepad-solid',
    Tournament: 'trophy-solid',
    Logout: 'sign-out-solid',
  };

  // 라우트 및 메뉴 아이템 생성
  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name]) {
      const menuItem = document.createElement('li');
      menuItem.className = 'nav-item';

      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = ''; // 여기에 실제 링크를 입력하거나, 자바스크립트 라우터 기능을 사용
      link.textContent = name; // 메뉴 이름
      link.setAttribute('route', route);

      menuItem.appendChild(link);
      menuList.appendChild(menuItem);
    }
  });

  menuDiv.appendChild(menuList);
  navbar.appendChild(menuDiv);

  // 클릭 이벤트 리스너
  navbar.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a[route]');
    if (targetLink) {
      e.preventDefault();
      if (targetLink.textContent === 'Logout') {
        createLogoutModal();
        return;
      }

      route(targetLink.getAttribute('route'));
    }
  });

  return navbar;
}
