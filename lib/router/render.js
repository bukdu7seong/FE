import { ReplaceElement } from '../replace.js';

/**
 * @description: object의 component에 components를 추가
 * @param {*} object
 * @param  {...any} components
 * @returns
 */
export function Render(target, tag = 'app') {
  // app이라는 id를 가진 요소를 찾아서, 해당 요소의 자식을 모두 지움
  const app =
    document.getElementById(tag) || document.getElementsByClassName(tag)[0];
  if (!app) {
    return;
  } else {
    app.innerHTML = '';
  }

  // target.page()의 결과(≒ page: PageNotFound)를 app에 추가
  app.appendChild(target.page());

  // target.component에 있는 모든 요소를 찾아서, 해당 요소를 app에 추가
  target.component.forEach((element) => {
    if (element.id) {
      ReplaceElement(element.id, element); // id가 있는 경우
    } else if (element.className) {
      ReplaceElement(element.className, element); // class가 있는 경우
    } else {
      // skip
    }
  });
}
