import { route } from '../../../lib/router/router.js';
import { createLogoutModal } from './logoutModal.js';

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
    Profile: 'assets/images/icon/house-solid.svg',
    Game: 'assets/images/icon/gamepad-solid.svg',
    Tournament: 'assets/images/icon/trophy-solid.svg',
    Logout: 'assets/images/icon/door-closed-fill.svg',
  };

  // Logout을 위한 임시 객체 생성
  routes.Logout = { name: 'Logout' };

  // 라우트 및 메뉴 아이템 생성
  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name]) {
      const menuItem = document.createElement('li');
      menuItem.className = 'nav-item';

      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = ''; // 실제 링크 입력 또는 자바스크립트 라우터 기능 사용
      link.setAttribute('route', route);

      // 아이콘 이미지 추가
      const iconImg = document.createElement('img');
      iconImg.src = icons[name]; // 이미지 경로
      iconImg.alt = name; // 대체 텍스트
      iconImg.className = 'navbar-icon'; // 필요한 경우 추가 클래스 설정

      // 링크에 아이콘 이미지 추가
      link.appendChild(iconImg);

      // 선택적으로 텍스트 라벨 추가 (필요하지 않다면 이 부분은 제거 가능)
      // const textNode = document.createTextNode(' ' + name);
      // link.appendChild(textNode);

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

      // 이미지 아이콘에 대한 대체 텍스트를 기반으로 'Logout' 버튼 식별
      const iconImg = targetLink.querySelector('img.navbar-icon');
      if (iconImg && iconImg.alt === 'Logout') {
        createLogoutModal();
        return;
      }

      // 다른 라우트로 이동
      route(targetLink.getAttribute('route'));
    }
  });

  return navbar;
}
