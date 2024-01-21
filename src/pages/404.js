export function PageNotFound() {
  const page = document.createElement("div");
  page.setAttribute("class", "container");
  const content = `
          <div id="navbar">
          </div>
          <div class="card">
            <h1>404</h1>
            <p>Page not found</p>
          </div>
        `;

  // document.getElementById("app").innerHTML = page;
  page.innerHTML = content;
  return page;
}
