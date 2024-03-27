//get, set, ping, subscribe
//get: 상태를 가져오는 함수
//set: 상태를 변경하는 함수
//ping: 상태를 변경했을 때 구독자에게 알려주는 함수
//subscribe: 구독자를 추가하는 함수

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
    userImage: '',
    userId: 0,
    userName: '',
    userID: '',
    userEmail: '',
    userLanguage: '',
    user2fa: false,
    userSocket: null,
    socketStatus: 'connecting',
    WinRate: 0,
    Wins: 0,
    Losses: 0,
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
  state: {
    status: 'ready',
    gameType: '',
    currentGame: null,
    currentGameStatus: 'idle',
  },
  listeners: [], // 구독자 목록
  getState() {
    return this.state;
  }, // getter
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
