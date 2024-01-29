export function setPageIconBackground(page) {
  const icon = document.querySelector(`.${page}-icon`);
  if (icon) {
    icon.style.backgroundColor = 'green';
  }
}
