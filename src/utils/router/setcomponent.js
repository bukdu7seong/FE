// 화면에 컴포넌트를 띄운다.
export function SetComponent(object, ...components) {
  for (const key in object) {
    if (!Object.hasOwnProperty.call(object, key)) {
      return;
    }
    object[key].component.push(...components);
  }
}
