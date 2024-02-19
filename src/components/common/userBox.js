// 이 함수는 프로필 박스를 만들어서 반환합니다.
export function userBox(name = 'Guest') {
  const userBox = document.createElement('div');
  userBox.setAttribute('class', 'user-box');

  const userImage = document.createElement('img');
  userImage.setAttribute('class', 'user-image');
  userImage.setAttribute('id', 'randomImage');
  userImage.alt = 'User Image';
  userBox.appendChild(userImage);

  const userName = document.createElement('div');
  userName.setAttribute('class', 'user-nickname');
  userName.innerText = `Welcome, ${name}`;
  userBox.appendChild(userName);

  return userBox;
}
