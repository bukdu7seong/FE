/**
 * @description: document의 특정 tag의 요소를 element로 변경한다.
 * @description: 예를 들어, <div id="test">는 document.getElementById('test')로 호출할 수 있다. - id
 * @description: <div class="test">는 document.getElementsByClassName('test')[0]로 호출할 수 있다. - class
 * @description: ctrl + enter, Option + [ , ] github copilot
 * @description: <div>는 document.getElementsByTagName('div')[0]로 호출할 수 있다. - tag
 * @description: 만약 id와 class가 같은 요소가 있다면 id를 우선으로 변경한다. 예를 들어, <div id="test" class="test">는 document.getElementById('test')로 class는 무시된다.
 * @param {@} tag
 * @param {*} element
 * @returns
 */
// tag를 찾아서 element로 변경
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
