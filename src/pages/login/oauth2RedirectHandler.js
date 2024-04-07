export function pageOauth2RedirectHandler() {
  const page = document.createElement('div');
  page.setAttribute('class', 'container');
  const content = `
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  `;
  page.innerHTML = content;
  return page;
}
