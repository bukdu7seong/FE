import { Render } from '../../lib/router/render.js';
import { Navigate } from '../../lib/router/navigate.js';
/* 
  <div class="side-bar">
    <div class="menu-top">
      <div class="menu-item game">
        <i class="icon-game">
          <img src="../../images/icon/gamepad-solid.svg" alt="Game" route="game">
*/
// 이 함수는 라우터 객체를 받아서, 해당 객체의 페이지를 렌더링한다.
export function sidebar(routes) {
  const sidebar = document.createElement('div');
  sidebar.setAttribute('class', 'side-bar');

  const menuTop = document.createElement('div');
  menuTop.setAttribute('class', 'menu-top');

  const icons = {
    Profile: 'house-solid',
    Game: 'gamepad-solid',
    Tournament: 'trophy-solid',
    Logout: 'sign-out-solid',
  };

  let logoutItem = null; // logout 아이템을 저장할 변수

  /*
  <div class="menu-item game">
    <i class="icon-game">
      <img src="../../images/icon/gamepad-solid.svg" alt="Game" route="game">
  */
  function createIcon(name, route) {
    const menuItem = document.createElement('div');
    menuItem.className = `menu-item ${name.toLowerCase()}`;

    const icon = document.createElement('i');
    icon.className = `icon-${name.toLowerCase()}`;

    const image = document.createElement('img');
    image.src = `../../images/icon/${icons[name]}.svg`;
    image.alt = name;
    image.setAttribute('route', route);

    icon.appendChild(image);
    menuItem.appendChild(icon);
    return menuItem;
  }

  // routes 객체 순회 및 아이콘 생성
  // Object.entries()를 사용하면, 객체를 배열로 변환할 수 있다. forEach()를 사용하면, 배열을 순회할 수 있다. route, { name }으로 구조분해할당을 사용하면, 객체의 속성을 변수로 사용할 수 있다. name은 routes 객체의 name 속성을 가져온다.
  Object.entries(routes).forEach(([route, { name }]) => {
    if (icons[name]) {
      const menuItem = createIcon(name, route);
      if (name.toLowerCase() === 'logout') {
        logoutItem = menuItem; // logout 아이템 저장
      } else {
        menuTop.appendChild(menuItem); // 나머지는 menuTop에 추가
      }
    }
  });

  sidebar.appendChild(menuTop); // menuTop을 sidebar에 추가

  if (logoutItem) {
    sidebar.appendChild(logoutItem); // logout 아이템을 맨 아래에 추가
  }

  // 클릭 이벤트 리스너
  sidebar.addEventListener('click', (e) => {
    const targetImg = e.target.closest('img[route]');
    if (targetImg) {
      const target = Navigate(routes, targetImg.getAttribute('route'));
      Render(target);
    }
  });

  return sidebar;
}
