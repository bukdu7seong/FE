import { PageNotFound } from "../src/pages/404.js";
import { Render } from "./render.js";

let routes = {};
let previousPath = "";

export function SetRoutes(routesObject) {
  routes = routesObject;
}

/*
 * @description: 라우팅 경로에 해당하는 라우터 객체를 반환한다.
 * @param: routes - 라우터 객체를 담은 객체
 * @param: href - 라우터 경로
 * @param: updateHistory - 히스토리 업데이트 여부
 * @return: routes[currentPath] - 라우터 객체
 */
export function handleNavigation(routes, href, updateHistory = true) {
  const currentPath = href || window.location.pathname;
  if (currentPath === previousPath) {
    return routes[currentPath];
  } else {
    previousPath = currentPath;
  }

  if (currentPath && updateHistory) {
    window.history.pushState({}, "", currentPath);
  } else {
    // 히스토리 업데이트를 하지 않는다 - 뒤로가기 버튼을 누른 경우
  }

  return (
    routes[currentPath] ||
    (currentPath === "/"
      ? routes["/index"]
      : { name: "404", component: PageNotFound })
  );
}

/*
 * @description: 현재 경로에 해당하는 라우터 객체의 컴포넌트를 렌더링한다.
 * @param: void
 * @return: void
 */
export function Route() {
  window.addEventListener("popstate", () => {
    const component = handleNavigation(
      routes,
      window.location.pathname,
      false
    ).component();
    Render(component);
  }); // 중복 이벤트 처리 필요?

  const component = handleNavigation(
    routes,
    window.location.pathname
  ).component();
  Render(component);
}
