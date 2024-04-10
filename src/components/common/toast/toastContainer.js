export function toastContainer() {
  const container = document.createElement('div');
  container.classList.add('toast-container');
  container.classList.add('position-static');
  container.id = 'toast-container';
  return container;
}
