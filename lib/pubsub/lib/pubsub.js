export default class PubSub {
  constructor() {
    this.events = {};
  }
  subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    return this.events[event].push(callback);
  }
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map((callback) => callback(data));
  }
}
/*
구독 -> 이벤트 감지 -> 발행 -> 콜백 함수(각 이벤트 감지시 호출될 함수)

1. Pub/Sub 모듈
  src/js/lib/pubsub.js : 이벤트 구독 및 발행

2. Store 객체
  src/js/store/store.js : 애플리케이션 상태 관리

3. 상태(State), 동작(Actions), 변이(Mutations) 설정
  src/js/store/state.js : 애플리케이션 상태
  src/js/store/actions.js : 상태를 변경하는 동작
  src/js/store/mutations.js : 상태 변화를 실행

5. 기본 컴포넌트 클래스
  src/js/lib/component.js : 컴포넌트들이 상속받을 기본 클래스

6. UI 컴포넌트
  src/js/components/list.js : 목록 UI
  src/js/components/count.js : 카운트 UI
  src/js/components/status.js : 상태 UI

7. main.js로 연결
  src/js/main.js : 애플리케이션 초기화 및 구성 요소 연결
*/
