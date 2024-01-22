import { navbar } from "./components/navbar.js";
import { Route, handleNavigation } from "../lib/router.js";
import { PageCounter } from "./pages/counter.js";
import { PageAbout } from "./pages/about.js";
import { PageContact } from "./pages/contact.js";
import { SetComponent } from "../lib/render.js";

// TOOD
// 1. 라우터 구현 - OK?
// 2. 페이지 분리 및 라우터 연결 - OK
// 3. 네비게이션 분리 및 라우터 연결 - OK
// 4. html 파일 말고 일반적인 라우팅 경로를 사용 가능하도록 수정 - OK
// 5. 페이지 고도화

const routes = {
  "/index": { name: "Home", page: PageCounter, component: [] },
  "/about": { name: "About", page: PageAbout, component: [] },
  "/contact": { name: "Contact", page: PageContact, component: [] },
};

// 지금은 모든 라우팅 경로의 페이지에 동일한 컴포넌트를 적용하지만...
// 굳이 이렇게 할 필요 없이 페이지 내에서 컴포넌트를 추가하는 방식으로 구현해도 될 듯.
SetComponent(routes, navbar(routes, handleNavigation));
Route(routes);
