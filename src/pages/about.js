export function PageAbout() {
  const page = document.createElement("div");
  page.setAttribute("class", "container");
  const content = `
          <div id="navbar">
          </div>
          <div class="card">
            <h1>About</h1>
            <p>This is about</p>
          </div>
        `;

  page.innerHTML = content;
  // document.getElementById("app").innerHTML = page;
  return page;
}
