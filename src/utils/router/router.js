import { Render } from './render.js';
import { setPageIconBackground } from '../icon_status.js';
import { Navigate } from './navigate.js';

/*
 * @description: 라우터를 설정한다.
 * @description: 라우터(네비게이터 -> 렌더링 -> 사이드바 아이콘 초록색)
 * @param: routeObject - 라우터 객체를 담은 객체
 * @return: void
 * 직접적인 URL 접근에서만 호출 되는 함수
 */
export function Route(routeObject) {
  const target = Navigate(routeObject, window.location.pathname);
  Render(target);
  setPageIconBackground(target.name);
}
