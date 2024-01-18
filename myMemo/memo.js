"use strict";

function h(tag, attrs, ...children) {
  const element = document.createElement(tag);
  if (attrs instanceof Object && !Array.isArray(attrs)) {
    for (const attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }
  } else {
    children.unshift(attrs);
  }
  children = children.flat();
  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
    } else {
      element.appendChild(document.createTextNode(child));
    }
  });

  return element;
}

const div = (...args) => h("div", ...args);
const h1 = (...args) => h("h1", ...args);
const p = (...args) => h("p", ...args);
const a = (...args) => h("a", ...args);
const button = (...args) => h("button", ...args);
const span = (...args) => h("span", ...args);

function PageCounter() {
  /*
  const page = `
      <div class="container">
        <div id="navbar">
        </div>
        <div class="card">
          <h1>Count <span id="count-view">0</span></h1>
          <div class="btn-box">
            <button class="btn btn-primary" id="btn-increase">Increase</button>
            <button class="btn btn-danger" id="btn-decrease">Decrease</button>
          </div>
        </div>
      </div>
    `;

  document.getElementById("app").innerHTML = page;
  */
  const page = div(
    { class: "container" },
    div({ id: "navbar" }),
    div(
      { class: "card" },
      h1("Count", span({ id: "count-view" }, 0)),
      div(
        { class: "btn-box" },
        button({ class: "btn btn-primary", id: "btn-increase" }, "Increase"),
        button({ class: "btn btn-danger", id: "btn-decrease" }, "Decrease")
      )
    )
  );

  document.getElementById("app").replaceChildren(page);

  const countView = document.getElementById("count-view");
  const btnIncrease = document.getElementById("btn-increase");
  const btnDecrease = document.getElementById("btn-decrease");

  let count = 0;

  btnIncrease.addEventListener("click", () => {
    count++;
    countView.innerText = count;
  });

  btnDecrease.addEventListener("click", () => {
    count--;
    countView.innerText = count;
  });
}

/* symlink로 변경 */
function PageAbout() {
  /*
  const page = `
      <div class="container">
        <div id="navbar">
        </div>
        <div class="card">
          <h1>About</h1>
          <p>This is about</p>
        </div>
      </div>
    `;

  document.getElementById("app").innerHTML = page;
  */

  const elems = `
  <div id="navbar"></div>
  <div class="card">
    <h1>About</h1>
    <p>This is about</p>
  </div>
  `;

  // const page = div(
  //   { class: "container" },
  //   div({ id: "navbar" }),
  //   div({ class: "card" }, h1("About"), p("This is about"))
  // );

  const page = document.createElement("div");
  page.classList.add("container");
  page.insertAdjacentHTML("afterbegin", elems);

  document.getElementById("app").replaceChildren(page);
}

function PageContact() {
  /*
  const page = `
      <div class="container">
        <div id="navbar">
        </div>
        <div class="card">
          <h1>Contact</h1>
          <p>This is contact</p>
        </div>
      </div>
    `;

    document.getElementById("app").innerHTML = page;
  */
  const page = document.createElement("div");
  page.classList.add("container");
  const navbar = document.createElement("div");
  navbar.setAttribute("id", "navbar");
  page.appendChild(navbar);
  const card = document.createElement("div");
  card.classList.add("card");
  page.appendChild(card);
  const h1 = document.createElement("h1");
  h1.innerText = "Contact";
  card.appendChild(h1);
  const p = document.createElement("p");
  p.innerText = "This is contact";
  card.appendChild(p);

  document.getElementById("app").replaceChildren(page);
}

const routes = {
  "/index.html": { name: "Home", component: PageCounter },
  "/about.html": { name: "About", component: PageAbout },
  "/contact.html": { name: "Contact", component: PageContact },
};

function handleLinks() {
  const navbar = document.getElementById("navbar");
  for (const route in routes) {
    const link = document.createElement("a");
    link.setAttribute("href", route);
    link.setAttribute("id", "nav");
    link.innerText = routes[route].name;
    navbar.appendChild(link);

    link.removeEventListener("click", handleNavigation);
    link.addEventListener("click", handleNavigation);
  }
}

function handleNavigation(e) {
  e.preventDefault(); // 새로운 페이지 로드를 막음
  const href = this.getAttribute("href");
  router(href); // router 호출로 DOM 요소 변경
}

function router(href, updateHistory = true) {
  if (href && updateHistory) {
    window.history.pushState({}, "", href);
  }
  const currentPath = href || window.location.pathname;
  const route = routes[currentPath] || routes["/index.html"];
  route.component();
  handleLinks();
}

window.addEventListener("popstate", () => {
  router(window.location.pathname, false);
});

router();
