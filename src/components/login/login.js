// Code: 로그인 상태와 사용자 정보를 관리하는 컴포넌트
export default function Login() {
  // 로그인 상태를 변경하는 액션
  this.actions.login = (state, payload) => {
    // 로그인 상태를 true로 변경하고 사용자 정보 업데이트
    this.mutations.setLoginState(state, true);
    this.mutations.setUserInfo(state, payload);
    // 로그인 상태 변경 이벤트 발행
    this.events.publish('loginStateChange', state);
    this.events.publish('userInfoChange', state);
  };

  // 로그아웃 상태를 변경하는 액션
  this.actions.logout = (state) => {
    // 로그인 상태를 false로 변경하고 사용자 정보 초기화
    this.mutations.setLoginState(state, false);
    this.mutations.setUserInfo(state, {});
    // 로그아웃 상태 변경 이벤트 발행
    this.events.publish('loginStateChange', state);
    this.events.publish('userInfoChange', state);
  };

  // 로그인 상태를 변경하는 변이
  this.mutations.setLoginState = (state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn;
    console.log(`로그인 상태가 변경됐어: ${isLoggedIn}`);
  };

  // 사용자 정보를 업데이트하는 변이
  this.mutations.setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo;
    console.log(`사용자 정보가 업데이트됐어:`, userInfo);
  };

  // 로그인 상태와 사용자 정보를 저장하는 초기 상태
  this.state = {
    isLoggedIn: false,
    userInfo: {},
  };

  // 로그인 상태 변경을 구독하는 예시
  this.events.subscribe('loginStateChange', (state) => {
    console.log('로그인 상태가 변경됐어!', state.isLoggedIn);
  });

  // 사용자 정보 변경을 구독하는 예시
  this.events.subscribe('userInfoChange', (state) => {
    console.log('사용자 정보가 업데이트됐어!', state.userInfo);
  });
}
