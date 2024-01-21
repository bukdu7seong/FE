import { InjectElement } from "./inject.js";

let additionalElements = [];

/*
 * @description: 화면에 렌더링할 추가 요소를 미리 설정한다.
 * @param: elements - HTML element
 * @return: void
 */
export function SetRender(...elements) {
  additionalElements = elements;
}

/*
 * @description: 렌더링을 하는 함수. HTML의 app 태그에 컴포넌트를 렌더링한다.
 * @param: component - 컴포넌트
 * @return: void
 */
export function Render(component) {
  const target = document.getElementById("app");
  if (!target) {
    return;
  }

  target.innerHTML = "";
  target.appendChild(component);

  additionalElements.forEach((element) => {
    InjectElement(element.id, element);
  });
}
