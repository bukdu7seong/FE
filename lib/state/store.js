export const store = {
  state: {
    isLoggedIn: false, // 로그인 상태 추가
    profileImageUrl: '',
    windowSize: { width: window.innerWidth, height: window.innerHeight },
  },
  listeners: [],
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  },
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },
};
