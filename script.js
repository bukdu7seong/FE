import { getBoard, setBoard } from './index.js';

// // JavaScript
// function startGame(playerCount) {
// 	// 게임 시작 로직
// 	alert(playerCount + " player game start!");
// }

// var myBool = false;
// 이미지 경로를 배열로 저장합니다.
var images = [
  'images/profile/profile_01.jpg',
  'images/profile/profile_02.jpg',
  'images/profile/profile_03.jpg',
  'images/profile/profile_04.jpg',
];

// 문서가 로드될 때 실행되는 함수를 정의합니다.
window.onload = function () {
  // 랜덤 인덱스를 생성합니다.
  var index = Math.floor(Math.random() * images.length);
  // 이미지 요소의 src 속성을 랜덤 이미지로 설정합니다.
  document.getElementById('randomImage').src = images[index];
};

function loadData() {
  fetch('/api/data') // Django에서 설정한 API 엔드포인트를 사용합니다.
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('result').innerText = JSON.stringify(data);
    })
    .catch((error) => console.error('Error:', error));
}

// function toggleBool() {
//   myBool = !myBool;
//   console.log(myBool);
//   return myBool;
// }

// function getBoolValue() {
//   return myBool;
// }

window.addEventListener('resize', function () {
  var playerOption1 = document.getElementById('player1');
  var playerOption2 = document.getElementById('player2');
  if (window.innerWidth <= 1112) {
    playerOption1.textContent = '1';
    playerOption2.textContent = '2';
  } else {
    playerOption1.textContent = '1 PLAYER';
    playerOption2.textContent = '2 PLAYERS';
  }
});

// 모달 요소를 가져옵니다
var modal = document.getElementById('playerModal');

// 모달을 여는 버튼 요소를 가져옵니다
var btn1 = document.getElementById('player1');

// 모달을 닫는 <span> 요소 (닫기 버튼)를 가져옵니다
var closeBtn = document.getElementsByClassName('close-button')[0];

// 1 Player 버튼을 클릭하면 모달을 엽니다
btn1.onclick = function () {
  modal.style.display = 'block';
};

// 닫기 버튼을 클릭하면 모달을 닫습니다
closeBtn.onclick = function () {
  modal.style.display = 'none';
};

// 모달 외부를 클릭하면 모달을 닫습니다
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// 임시로 Player2 div를 누르면 게임이 시작되게 설정
document.getElementById('player2').addEventListener('click', function () {
  const gameBox = document.getElementsByClassName('game-box')[0]; // game-box div를 호출
  while (gameBox.firstChild) {
    gameBox.removeChild(gameBox.firstChild);
  } // game-box div의 자식 요소들을 모두 삭제
  gameBox.appendChild(getBoard()); // game-box div에 board div를 추가
  setBoard(); // 게임에 필요한 요소들을 설정
});
