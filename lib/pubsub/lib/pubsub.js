export default class PubSub {
  constructor() {
    this.events = {};
  }
  subscribe(event, callback) {
    // callback : 이벤트 감지시 호출될 함수
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    // 이벤트에 해당하는 callback 함수를 배열에 추가
    return this.events[event].push(callback);
  }
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    // event에 해당하는 callback 함수에 data를 넣어서 실행
    return this.events[event].map((callback) => callback(data)); // callback 함수에 data를 넣어서 실행
  }
}
