export function pageHome() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
      <h1>Home</h1>
      <p>Welcome to the home page.</p>
    `;
  page.innerHTML = content;
  return page;
}
