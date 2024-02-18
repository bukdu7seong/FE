export function defaultProfile() {
  // 프로필 이미지로 사용될 이미지 목록
  const images = [
    '../../images/profile/profile_01.jpg',
    '../../images/profile/profile_02.jpg',
    '../../images/profile/profile_03.jpg',
    '../../images/profile/profile_04.jpg',
  ];
  // 랜덤 숫자 생성
  var index = Math.floor(Math.random() * images.length);
  // 선택된 이미지로 randomImage의 src 속성을 업데이트
  if (!document.getElementById('randomImage')) {
    return;
  }
  document.getElementById('randomImage').src = images[index];
}
