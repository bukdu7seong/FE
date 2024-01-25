import { ReplaceElement } from './replace.js';

export function SetComponent(object, ...components) {
  for (const key in object) {
    if (!Object.hasOwnProperty.call(object, key)) {
      return;
    }
    object[key].component.push(...components);
  }
}

/*
 * @description: HTML의 태그에 page를 렌더링한다. component 요소가 있다면 같이 렌더링한다.
 * @param: target - 컴포넌트
 * @return: void
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
