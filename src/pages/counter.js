export function PageCounter() {
  const page = document.createElement("div");
  page.setAttribute("class", "container");
  const content = `
          <div id="navbar">
          </div>
          <div class="card">
            <h1>Count <span id="count-view">0</span></h1>
            <div class="btn-box">
              <button class="btn btn-primary" id="btn-increase">Increase</button>
              <button class="btn btn-danger" id="btn-decrease">Decrease</button>
            </div>
          </div>
        `;

  // document.getElementById("app").innerHTML = page;

  page.innerHTML = content;

  const countView = page.querySelector("#count-view");
  const btnIncrease = page.querySelector("#btn-increase");
  const btnDecrease = page.querySelector("#btn-decrease");

  let count = 0;

  btnIncrease.addEventListener("click", () => {
    count++;
    countView.innerText = count;
  });

  btnDecrease.addEventListener("click", () => {
    count--;
    countView.innerText = count;
  });

  return page;
}
