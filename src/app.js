import { navbar } from "./components/navbar.js";
import { SetRoutes, Route, handleNavigation } from "../lib/router.js";
import { PageCounter } from "./pages/counter.js";
import { PageAbout } from "./pages/about.js";
import { PageContact } from "./pages/contact.js";
import { SetRender } from "../lib/render.js";

// TOOD
// 1. 라우터 구현 - OK?
// 2. 페이지 분리 및 라우터 연결 - OK
// 3. 네비게이션 분리 및 라우터 연결 - OK
// 4. html 파일 말고 일반적인 라우팅 경로를 사용 가능하도록 수정 - OK
// 5. 페이지 고도화

const routes = {
  "/index": { name: "Home", component: PageCounter },
  "/about": { name: "About", component: PageAbout },
  "/contact": { name: "Contact", component: PageContact },
};

SetRender(navbar(routes, handleNavigation));
SetRoutes(routes);
Route();
