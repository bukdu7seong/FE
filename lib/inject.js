/*
 * @description: document의 특정 tag의 요소를 element로 변경한다.
 * @param: tag - 변경할 HTML 요소의 tag
 * @param: elements - tag의 요소에 새로 덮어쓸 HTML element
 * @return: void
 */
export function ReplaceElement(tag, element) {
  const target = document.querySelector(`#${tag}`);
  if (!target) {
    return;
  }

  if (typeof element === "string") {
    target.insertAdjacentHTML("beforeend", element);
  } else if (element instanceof HTMLElement && "id" in element) {
    const idTarget = document.querySelector(`#${element.id}`);
    if (idTarget) {
      idTarget.replaceChildren(element);
    }
  } else if (element instanceof HTMLElement && "class" in element) {
    const classTarget = document.querySelector(`.${element.class}`);
    if (classTarget) {
      classTarget.replaceChildren(element);
    }
  } else {
    target.replaceChildren(element);
  }
}
