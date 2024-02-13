// 이 함수는 페이지의 아이콘을 녹색으로 변경.
export function setPageIconBackground(page) {
  const icon = document.querySelector(`.${page}-icon`);
  if (icon) {
    icon.style.backgroundColor = 'green';
  }
}
