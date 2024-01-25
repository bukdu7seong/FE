/*
 * @description: document의 특정 tag의 요소를 element로 변경한다.
 * @param: tag - 변경할 HTML 요소의 tag
 * @param: elements - tag의 요소에 새로 덮어쓸 HTML element
 * @return: void
 * @memo: 만약 id와 class가 같은 요소가 있다면 id를 우선으로 변경한다.
 */

// 정리가 필요하다.
export function ReplaceElement(tag, element) {
  let target =
    document.getElementById(tag) || document.getElementsByClassName(tag)[0];
  if (!target || !tag || !element) {
    return;
  }

  if (typeof element === 'string') {
    console.log('string');
    target.insertAdjacentHTML('beforeend', element);
  } else if (element instanceof HTMLElement && document.getElementById(tag)) {
    const idTarget = document.getElementById(tag);
    if (idTarget) {
      idTarget.replaceWith(element);
    }
  } else if (
    element instanceof HTMLElement &&
    document.getElementsByClassName(tag)
  ) {
    const classTarget = document.getElementsByClassName(tag)[0];
    if (classTarget) {
      classTarget.replaceWith(element);
    }
  } else {
    target.replaceChildren(element);
  }
}
