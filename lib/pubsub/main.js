//테스트 파일임!
//전체적인 구조는 아래와 같다!
/*
구독 -> 이벤트 감지 -> 발행 -> 콜백 함수(각 이벤트 감지시 호출될 함수)
subscribe -> event -> publish -> callback function

사용법은
pubsub.subscribe('이벤트', 콜백함수) // subscribe를 통해 이벤트를 감지하고, 콜백함수를 실행
pubsub.publish('이벤트', 데이터) // publish를 통해 이벤트를 발생시키면 구독자에게 알림을 보냄. 데이터는 선택사항

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

import store from './store/index.js';

import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';

const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  store.dispatch('addItem', { item: inputElement.value });

  inputElement.value = '';
  inputElement.focus();
});

const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

countInstance.render();
listInstance.render();
statusInstance.render();
