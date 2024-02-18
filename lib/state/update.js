import { userState } from './store.js';

const tempImages = [
  '../../images/profile/profile_01.jpg',
  '../../images/profile/profile_02.jpg',
  '../../images/profile/profile_03.jpg',
  '../../images/profile/profile_04.jpg',
];

export function updateUserBox() {
  if (!document.getElementsByClassName('user-box')[0]) {
    return;
  }

  const state = userState.getState();

  if (state.userImageUrl === '') {
    const tempIndex = Math.floor(Math.random() * tempImages.length);
    userState.setState({ userImageUrl: tempImages[tempIndex] });
    document.getElementsByClassName('user-image')[0].src =
      tempImages[tempIndex];
  } else {
    document.getElementsByClassName('user-image')[0].src = state.userImageUrl;
  }

  if (state.userName === '') {
    //
  }

  if (document.getElementsByClassName('user-nickname')[0].length > 0) {
    [...document.getElementsByClassName('user-nickname')[0]].forEach(
      (element) => {
        element.innerHTML = state.profileName;
      }
    );
  }
}
