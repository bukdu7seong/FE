/**
 * @description 화면에 띄울 컴포넌트를 설정한다.
 * @param {Object} element 화면에 띄울 컴포넌트를 설정할 객체
 * @param {Object} components 화면에 띄울 컴포넌트
 * @returns {void}
 */
export function initComponent(element, ...components) {
  element.component.push(...components);
}
