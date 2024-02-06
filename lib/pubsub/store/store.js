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
      self.mutations = params.mutations;
    }
    self.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state);

        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting';

        return true;
      },
    });
  }
  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = 'action';

    self.actions[actionKey](self, payload);

    console.groupEnd();

    return true;
  }
  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    return true;
  }
}
