// 화면에 컴포넌트를 띄운다.
export function initComponent(routes, ...components) {
  for (const key in routes) {
    // 예외처리: 객체의 속성을 순회하면서, 객체의 속성이 없으면 return
    if (!Object.hasOwnProperty.call(routes, key)) {
      return;
    }
    // routes 객체에 component 속성 추가
    routes[key].component.push(...components);
  }
}
