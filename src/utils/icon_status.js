// 이 함수는 페이지의 아이콘을 녹색으로 변경.
export function setPageIconBackground(page) {
  console.log(page);
  const icon = document.querySelector(`.icon-${page.toLowerCase()}`);
  console.log(icon);
  if (icon) {
    icon.style.backgroundColor = 'green';
  }
}
