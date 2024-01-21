/*
 * @description: page에 element를 주입한다.
 * @param: page - 페이지
 * @param: elements - 주입할 HTML element
 * @return: void
 */
export function InjectElement(tag, ...elements) {
  const target = document.querySelector(`#${tag}`);
  if (!target) {
    return;
  }

  elements.forEach((element) => {
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
  });
}
