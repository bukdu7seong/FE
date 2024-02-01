function setProfileImage(imageUrl) {
  // 상태 업데이트 로직
  store.setState({ profileImageUrl: imageUrl });
}

function resizeWindow(width, height) {
  // 상태 업데이트 로직
  store.setState({ windowSize: { width, height } });
}
