import { replaceElement } from '../../src/utils/replace.js';

/**
 * @description: object의 component에 components를 추가
 * @param {*} object
 * @param  {...any} components
 * @returns
 */
export function renderPage(target, tag = 'app') {
  // app이라는 id를 가진 요소를 찾아서 elem에 할당
  const elem =
    document.getElementById(tag) || document.getElementsByClassName(tag)[0];
  if (!elem) {
    return;
  }

  // elem의 자식을 모두 지움
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }

  // target의 결과(≒ page: PageNotFound)를 app에 추가
  elem.appendChild(target);
}

/**
 * @description: 만들어진 HTML에 component를 추가. HTML에 component를 위한 컨테이너 elem이 있어야 함.
 * @param {*} target
 * @returns
 */
export function renderComponent(target) {
  target.forEach((element) => {
    if (element.id) {
      replaceElement(element.id, element); // id가 있는 경우
    } else if (element.className) {
      replaceElement(element.className, element); // class가 있는 경우
    } else {
      // skip
    }
  });
}

/**
 * @description: 라우터 객체를 받아서 페이지와 컴포넌트를 렌더링한다.
 * @param {*} target
 * @param {string} tag
 * @returns
 */
export function renderAll(target, tag = 'app') {
  renderPage(target.page(), tag);
  renderComponent(target.component);
}
