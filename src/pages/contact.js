export function PageContact() {
  const page = document.createElement("div");
  page.setAttribute("class", "container");
  const content = `
          <div id="navbar">
          </div>
          <div class="card">
            <h1>Contact</h1>
            <p>This is contact</p>
          </div>
        `;

  // document.getElementById("app").innerHTML = page;
  page.innerHTML = content;
  return page;
}
