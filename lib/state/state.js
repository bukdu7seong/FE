export const globalState = {
  state: {
    isLoggedIn: false, // 로그인 상태 추가
    windowSize: { width: window.innerWidth, height: window.innerHeight },
  }, // 상태들
  listeners: [], // 구독자 목록
  getState() {
    return this.state;
  }, // getter
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }, // setter
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }, // 구독
};

export const userState = {
  state: {
    userImageUrl: '',
    userName: '',
    userID: '',
    userEmail: '',
  }, // 상태들
  listeners: [], // 구독자 목록
  getState() {
    return this.state;
  }, // getter
  ping() {
    this.listeners.forEach((listener) => listener(this.state));
  }, // send signal to listeners
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }, // setter
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }, // 구독
};

export const routeState = {
  state: {
    currentRoute: {},
  }, // 상태들
  listeners: [], // 구독자 목록
  getState() {
    return this.state;
  }, // getter
  ping() {
    this.listeners.forEach((listener) => listener(this.state));
  }, // send signal to listeners
  setState(newState, callListeners = true) {
    this.state = { ...this.state, ...newState };
    if (callListeners) {
      this.listeners.forEach((listener) => listener(this.state));
    }
  }, // setter
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }, // 구독
};

export const gameState = {
  state: 'ready',
  listeners: [], // 구독자 목록
  getState() {
    return this.state;
  }, // getter
  setState(newState) {
    this.state = newState;
    this.listeners.forEach((listener) => listener(this.state));
  }, // setter
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }, // 구독
};
