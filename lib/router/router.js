import { Render } from './render.js';
import { setPageIconBackground } from '../../src/utils/icon_status.js';
import { Navigate } from './navigate.js';

// Render()
export function Route(routes) {
  // target: 렌더링될 페이지의 정보를 담은 객체
  const target = Navigate(routes, window.location.pathname, false);
  // 렌더링된 페이지를 화면에 표시
  Render(target);
  // 사이드바 아이콘의 배경색을 변경
  setPageIconBackground(target.name);
}