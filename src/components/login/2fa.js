function verifyCode() {
  var firstPart = document.getElementById('first-part').value;
  var secondPart = document.getElementById('second-part').value;
  var fullCode = firstPart + secondPart;

  //코드 검증 로직 추가
  alert('Entered code: ' + fullCode);
}

function twoFA() {}
