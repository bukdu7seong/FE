import Store from '../../store.js';

export default class Component {
  constructor(props = {}) {
    let self = this;

    this.render = this.render || function () {}; // 렌더링 함수가 없으면 빈 함수로 설정

    if (props.store instanceof Store) {
      // store가 전달되었는지 확인
      props.store.events.subscribe('stateChange', () => self.render()); // 상태 변경 이벤트 구독
    }

    if (props.hasOwnProperty('element')) {
      // element가 전달되었는지 확인
      this.element = props.element;
    }
  }
}
