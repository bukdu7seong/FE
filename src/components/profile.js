// 이 함수는 프로필 박스를 만들어서 반환합니다.
export function profile(name = 'Guest') {
  const profileBox = document.createElement('div');
  profileBox.setAttribute('class', 'profile-box');

  const profileImage = document.createElement('img');
  profileImage.setAttribute('class', 'profile-image');
  profileImage.setAttribute('id', 'randomImage');
  profileImage.alt = 'Profile Image';
  profileBox.appendChild(profileImage);

  const profileName = document.createElement('div');
  profileName.setAttribute('class', 'profile-nickname');
  profileName.innerText = `Welcome, ${name}`;
  profileBox.appendChild(profileName);

  return profileBox;
}
