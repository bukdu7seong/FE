import { ReplaceElement } from '../replace.js';

/**
 * @description: object의 component에 components를 추가한다.
 * @param {*} object
 * @param  {...any} components
 * @returns
 */
export function Render(target, tag = 'app') {
  const app =
    document.getElementById(tag) || document.getElementsByClassName(tag)[0];
  if (!app) {
    return;
  } else {
    app.innerHTML = '';
  }

  app.appendChild(target.page());

  target.component.forEach((element) => {
    if (element.id) {
      ReplaceElement(element.id, element);
    } else if (element.className) {
      ReplaceElement(element.className, element);
    } else {
      // skip
    }
  });
}
