import { logout } from './logout.js';

export function createLogoutModal() {
  let modalHTML = `
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">로그아웃</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="logoutModalBody">
            로그아웃하시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="logout-no">아니오</button>
            <button type="button" class="btn btn-success" id="logout-confirm">예</button>
          </div>
        </div>
      </div>
    </div>
  `;

  let parser = new DOMParser();
  let doc = parser.parseFromString(modalHTML, 'text/html');
  document.body.appendChild(doc.body.firstChild);

  let logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
  updateMultilingualContent();
  logoutModal.show();

  logoutModal._element.addEventListener('hidden.bs.modal', () => {
    document.getElementById('logoutModal').remove();
  });

  document.getElementById('logout-confirm').addEventListener('click', () => {
    logoutModal.hide();
    logout();
  });
}

function updateMultilingualContent() {
  document.getElementById('logoutModalLabel').textContent =
    i18next.t('logoutModalLabel');
  document.getElementById('logoutModalBody').textContent =
    i18next.t('logoutModalBody');
  document.getElementById('logout-no').textContent = i18next.t('logout-no');
  document.getElementById('logout-confirm').textContent =
    i18next.t('logout-confirm');
}
