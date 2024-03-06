import { replaceElement } from '../../src/utils/replace.js';

/**
 * @description 화면에 띄울 컴포넌트를 설정한다.
 * @param {Object} element 화면에 띄울 컴포넌트를 설정할 객체
 * @param {Object} components 화면에 띄울 컴포넌트
 * @returns {void}
 */
export function setComponent(element, ...components) {
  element.component.push(...components);
}

/**
 * @description: 페이지를 설정한다.
 * @param {*} element 페이지를 설정할 객체
 * @param {*} page 페이지
 * @returns {void}
 */
export function setPage(element, page) {
  element.page = page;
}

/**
 * @description: 렌더링할 때 사용할 함수를 설정한다.
 * @param {*} element 함수를 설정할 객체
 * @param {*} onRender 렌더링할 함수
 * @returns {void}
 */
export function setOnRender(element, ...onRender) {
  element.onRender.push(...onRender);
}

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
