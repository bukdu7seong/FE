// 404
import { sidebar } from '../components/common/sidebar.js';
import { routes } from '../../lib/router/router.js';

export function PageNotFound() {
  const page = document.createElement('div');
  page.setAttribute('class', 'container');
  const navbar = sidebar(routes);
  const content = `
<!--            <div id="side-bar"></div>-->
            <div class="container">
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          `;
  page.innerHTML = content;
  page.appendChild(navbar);
  return page;
}
