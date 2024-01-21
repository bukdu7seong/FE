import { PageNotFound } from "../src/pages/404.js";
import { Render } from "./render.js";

let routes = {};
let previousPath = "";

export function SetRoutes(routesObject) {
  routes = routesObject;
}

/*
 * @description: 라우터 객체를 받아서 라우터 경로를 처리한다. 만약 라우터 경로가 존재하지 않는다면 404 페이지를 렌더링한다.
 * @param: routes - 라우터 객체
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
    // 히스토리 업데이트 X - 뒤로 가기 버튼을 누른 경우
  }

  return (
    routes[currentPath] ||
    (currentPath === "/"
      ? routes["/index"]
      : { name: "404", component: PageNotFound })
  );
}

/*
 * @description: 라우터 객체를 받아서 라우팅을 처리한다.
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
