const store = {
  // state: 상태
  state: {
    profileImageUrl: '',
    windowSize: { width: window.innerWidth, height: window.innerHeight },
  },
  // listeners: 상태가 변경될 때마다 실행할 함수들을 담는 배열
  listeners: [],
  // setState: 상태를 변경하는 함수
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  },
  // subscribe: 상태가 변경될 때마다 실행할 함수를 등록하는 함수
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
};
