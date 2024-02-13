export function updateProfile(state) {
  if (document.getElementById('profileImage')) {
    document.getElementById('profileImage').src = state.profileImageUrl;
  }
  if (document.getElementsByClassName('profile-name').length > 0) {
    [...document.getElementsByClassName('profile-name')].forEach((element) => {
      element.innerHTML = state.profileName;
    });
  }
}
