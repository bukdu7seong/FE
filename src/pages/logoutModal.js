// logoutModal.js
import { logout } from '../utils/logout.js';

export function createLogoutModal() {
  // Bootstrap 모달 HTML 구조
  let modalHTML = `
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">로그아웃</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            로그아웃하시겠습니까?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">아니오</button>
            <button type="button" class="btn btn-primary" id="logout-confirm">예</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 모달을 DOM에 추가하고 Bootstrap 모달 인스턴스 생성
  let parser = new DOMParser();
  let doc = parser.parseFromString(modalHTML, 'text/html');
  document.body.appendChild(doc.body.firstChild);

  let logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
  logoutModal.show();

  logoutModal._element.addEventListener('hidden.bs.modal', () => {
    document.getElementById('logoutModal').remove();
  });

  // '예' 버튼 클릭 이벤트 리스너
  document.getElementById('logout-confirm').addEventListener('click', () => {
    logoutModal.hide();
    logout();
  });
}
