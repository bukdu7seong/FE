/*
// 컴포넌트에서 PubSub 사용 예시
import PubSub from './lib/pubsub.js';

const pubsub = new PubSub();

// 예를 들어, 'itemAdded' 이벤트에 대한 구독을 생성
pubsub.subscribe('itemAdded', (data) => {
  console.log('아이템이 추가됐어!', data);
});

// 'itemAdded' 이벤트를 발행하고, 데이터를 전달
pubsub.publish('itemAdded', { id: 1, name: '새 아이템' });

// 이렇게 하면, 'itemAdded' 이벤트를 구독하는 모든 콜백 함수가 호출되고, 콘솔에는 '아이템이 추가됐어!'와 데이터가 출력됨.

// 상태가 변경될 때마다 UI를 업데이트하는 함수를 구독
// 이 코드는 Store 클래스 내부에서 상태(state)가 변경될 때마다 실행될 콜백 함수를 정의한다.
// 'stateChange' 이벤트가 발생하면, 콘솔에 '상태가 변경됐어!'와 변경된 상태를 출력한다.
this.events.subscribe('stateChange', (state) => {
  console.log('상태가 변경됐어!', state);
});

// 'itemRemoved' 이벤트에 대한 구독을 생성
pubsub.subscribe('itemRemoved', (data) => {
  console.log('아이템이 제거됐어!', data);
});

// 'itemRemoved' 이벤트를 발행하고, 데이터를 전달
pubsub.publish('itemRemoved', { id: 2, name: '제거된 아이템' });

// 이렇게 하면, 'itemRemoved' 이벤트를 구독하는 모든 콜백 함수가 호출되고, 콘솔에는 '아이템이 제거됐어!'와 데이터가 출력됨.

// 'userLoggedIn' 이벤트에 대한 구독을 생성
pubsub.subscribe('userLoggedIn', (user) => {
  console.log('사용자가 로그인했어!', user);
});

// 'userLoggedIn' 이벤트를 발행하고, 사용자 정보를 전달
pubsub.publish('userLoggedIn', { id: 3, name: '새 사용자' });

// 이렇게 하면, 'userLoggedIn' 이벤트를 구독하는 모든 콜백 함수가 호출되고, 콘솔에는 '사용자가 로그인했어!'와 사용자 정보가 출력됨.
// 로그인 상태 관리를 위한 예시 코드
// 로그인 상태를 변경하는 액션
this.actions.login = (state, payload) => {
  // 로그인 상태를 true로 변경
  this.mutations.setLoginState(state, true);
  // 사용자 정보를 업데이트
  this.mutations.setUserInfo(state, payload);
};

// 로그아웃 상태를 변경하는 액션
this.actions.logout = (state) => {
  // 로그인 상태를 false로 변경
  this.mutations.setLoginState(state, false);
  // 사용자 정보를 초기화
  this.mutations.setUserInfo(state, {});
};

// 로그인 상태를 변경하는 변이
this.mutations.setLoginState = (state, isLoggedIn) => {
  this.state.isLoggedIn = isLoggedIn;
  console.log(`로그인 상태가 변경됐어: ${isLoggedIn}`);
};

// 사용자 정보를 업데이트하는 변이
this.mutations.setUserInfo = (state, userInfo) => {
  this.state.userInfo = userInfo;
  console.log(`사용자 정보가 업데이트됐어:`, userInfo);
};

// 로그인 상태와 사용자 정보를 저장하는 초기 상태
this.state.isLoggedIn = false;
this.state.userInfo = {};

// 로그인 상태 변경을 구독하는 예시
this.events.subscribe('loginStateChange', (state) => {
  console.log('로그인 상태가 변경됐어!', state.isLoggedIn);
});

// 사용자 정보 변경을 구독하는 예시
this.events.subscribe('userInfoChange', (state) => {
  console.log('사용자 정보가 업데이트됐어!', state.userInfo);
});






*/
import PubSub from './pubsub/pubsub.js';

export default class Store {
  constructor(params) {
    let self = this; // Store 인스턴스를 가리키는 변수

    self.actions = {}; // 액션을 저장하는 객체
    self.mutations = {}; // 변이를 저장하는 객체 (변이: 상태를 변경하는 함수)
    self.state = {}; // 상태를 저장하는 객체
    self.status = 'resting'; // 상태를 저장하는 변수
    self.events = new PubSub(); // PubSub 인스턴스를 가리키는 변수
    if (params.hasOwnProperty('actions')) {
      // actions 속성이 params 객체에 있는 경우
      self.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      // mutations 속성이 params 객체에 있는 경우
      self.mutations = params.mutations;
    }

    // 상태가 변경될 때마다 콜백 함수를 실행하는 함수
    self.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value; // state 객체에 key와 value를 설정

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state); // 'stateChange' 이벤트를 발행

        if (self.status !== 'mutation') {
          // 상태가 변경될 때마다 상태를 출력
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting'; // 상태를 'resting'으로 변경

        return true; // true를 반환
      },
    });
  }

  // dispatch -> 액션을 실행하는 함수
  dispatch(actionKey, payload) {
    // actionKey: 액션의 이름, payload: 액션에 전달할 데이터
    let self = this;

    // 액션이 존재하지 않으면 에러 메시지를 출력하고 false를 반환
    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = 'action';

    self.actions[actionKey](self, payload); // 액션을 실행

    console.groupEnd();

    return true;
  }
  // commit -> 상태를 변경하는 함수
  commit(mutationKey, payload) {
    // mutationKey: 변이의 이름, payload: 변이에 전달할 데이터
    let self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[mutationKey](self.state, payload); // 변이를 실행하고, 변이에 전달할 데이터를 전달

    self.state = Object.assign(self.state, newState); // 상태 변경

    return true;
  }
}
