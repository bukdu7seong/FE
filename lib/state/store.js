export const store = {
  state: {
    login: false,
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

export function updateUI(state) {
  if (document.getElementById('profileImage')) {
    document.getElementById('profileImage').src = state.profileImageUrl;
  }
  if (document.getElementsByClassName('profile-name').length > 0) {
    [...document.getElementsByClassName('profile-name')].forEach((element) => {
      element.innerHTML = state.profileName;
    });
  }
}
