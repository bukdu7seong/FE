// // JavaScript
// function startGame(playerCount) {
// 	// 게임 시작 로직
// 	alert(playerCount + " player game start!");
// }

// var myBool = false;
// 이미지 경로를 배열로 저장합니다.
var images = [
  "images/profile/profile_01.jpg",
  "images/profile/profile_02.jpg",
  "images/profile/profile_03.jpg",
  "images/profile/profile_04.jpg",
];

// 문서가 로드될 때 실행되는 함수를 정의합니다.
window.onload = function () {
  // 랜덤 인덱스를 생성합니다.
  var index = Math.floor(Math.random() * images.length);
  // 이미지 요소의 src 속성을 랜덤 이미지로 설정합니다.
  document.getElementById("randomImage").src = images[index];
};

function loadData() {
  fetch("/api/data") // Django에서 설정한 API 엔드포인트를 사용합니다.
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerText = JSON.stringify(data);
    })
    .catch((error) => console.error("Error:", error));
}

// function toggleBool() {
//   myBool = !myBool;
//   console.log(myBool);
//   return myBool;
// }

// function getBoolValue() {
//   return myBool;
// }

window.addEventListener("resize", function () {
  var playerOption1 = document.getElementById("player1");
  var playerOption2 = document.getElementById("player2");
  if (window.innerWidth <= 1112) {
    playerOption1.textContent = "1";
    playerOption2.textContent = "2";
  } else {
    playerOption1.textContent = "1 PLAYER";
    playerOption2.textContent = "2 PLAYERS";
  }
});
