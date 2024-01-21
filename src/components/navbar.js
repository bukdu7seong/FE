import { Render } from "../../lib/render.js";

/*
 * @description: 라우터 객체를 받아서 네비게이션 바를 생성한다. 만약 네비게이션 바가 존재한다면 초기화한다.
 * @param: routes - 라우터 객체
 * @param: handleNavigation - 라우터 함수
 * @return: navbar - 네비게이션 바
 */
export function navbar(routes, handleNavigation) {
  let navbar = document.getElementById("navbar");
  if (!navbar) {
    navbar = document.createElement("div");
    navbar.setAttribute("id", "navbar");
  } else {
    navbar.innerHTML = ""; // navbar 초기화
  }

  for (const route in routes) {
    const link = document.createElement("a");
    link.setAttribute("href", route);
    link.innerText = routes[route].name;
    navbar.appendChild(link);
  }

  navbar.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const component = handleNavigation(
        routes,
        e.target.getAttribute("href")
      ).component();
      Render(component);
    }
  });

  return navbar;
}
