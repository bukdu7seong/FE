export function PageNotFound() {
  const page = document.createElement('div');
  page.setAttribute('class', 'container');
  const content = `
            <div id="side-bar"></div>
            <div class="container">
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          `;
  page.innerHTML = content;
  return page;
}
