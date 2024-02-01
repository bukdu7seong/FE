import { PageNotFound } from '../../pages/404.js';

let previousPath = '';

/*
 * @description: 앞, 뒤 버튼을 누르면, 해당 라우팅 경로의 객체를 반환한다.
 * @description: SPA 형태를 위해 객체를 갈아만 끼우는 것이지, 페이지를 새로 로딩하는 것은 아니다.
 * @param: routeObject - 라우터 경로를 담은 객체
 * @param: href - 경로
 * @param: updateHistory - 히스토리 업데이트 여부
 * @return: routeObject[currentPath] - 경로에 해당하는 객체
 */
// export function Navigate(routeObject, href, updateHistory = true) {
//   const currentPath = href || window.location.pathname;
//   if (currentPath === previousPath) {
//     return routeObject[currentPath];
//   } else {
//     previousPath = currentPath;
//   }

//   if (currentPath && updateHistory) {
//     window.history.pushState({}, '', currentPath);
//   } else {
//     // 히스토리 업데이트를 하지 않는다 - 뒤로가기 버튼을 누른 경우
//   }

//   return (
//     routeObject[currentPath] ||
//     (currentPath === '/'
//       ? routeObject['/Profile'] // index.html로 라우팅되도록 해야 함.
//       : { name: '404', page: PageNotFound, component: [] })
//   );
// }
export function Navigate(routeObject, href, updateHistory = true) {
  const currentPath = href || window.location.pathname;

  if (currentPath && updateHistory) {
    window.history.pushState({}, '', currentPath);
  }

  return routeObject[currentPath] || getDefaultRoute(currentPath, routeObject);
}

function getDefaultRoute(currentPath, routeObject) {
  if (currentPath === '/') {
    return routeObject['/']; // index.html로 라우팅되도록 해야 함.
  }
  return { name: '404', page: PageNotFound, component: [] };
}
