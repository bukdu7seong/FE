import { globalState, userState } from '../../../lib/state/state.js';

export function listenFriendLogin(array) {
  const userData = userState.getState();
  const userSocket = userData.userSocket;

  const waitForSocketOpen = new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (userSocket && userSocket.readyState === WebSocket.OPEN) {
        console.log('socket open');

        clearInterval(checkInterval);
        resolve(userSocket);
      } else if (userState.getState().socketStatus === 'offline') {
        clearInterval(checkInterval);
        reject(new Error('Socket is offline'));
      }
    }, 1000);
  });

  waitForSocketOpen
    .then(() => {
      const checkLoginInterval = setInterval(() => {
        userSocket.send(JSON.stringify({ userid: array }));
      }, 1000);

      if (userState.getState().socketFunction) {
        const previousInterval = userState.getState().socketFunction;
        clearInterval(previousInterval);
      } else {
        userState.setState({ socketFunction: checkLoginInterval }, false);
      }

      userSocket.onmessage = (event) => {
        const loginStatusList = JSON.parse(event.data);
        // console.log('list: ', loginStatusList);

        Object.entries(loginStatusList).forEach(([userId, isLoggedIn]) => {
          const profileModal = globalState.getState().profileModal;
          const viewAllModal = globalState.getState().viewAllModal;

          if (!viewAllModal && !profileModal) {
            // friends
            const friendItem = document.getElementById(userId);
            if (!friendItem) return;

            const loginStatusDiv = friendItem.querySelector('.login-status');
            if (isLoggedIn) {
              loginStatusDiv.classList.remove('logout');
              loginStatusDiv.classList.add('login');
            } else {
              loginStatusDiv.classList.remove('login');
              loginStatusDiv.classList.add('logout');
            }
          }

          if (profileModal) {
            // profile modal
            const modalElement = profileModal.modalInstance._element;
            const modalUserId = profileModal.userId;

            if (modalElement && modalUserId === +userId) {
              const modalLoginStatusDiv =
                modalElement.querySelector('.login-status');
              if (isLoggedIn) {
                modalLoginStatusDiv.classList.remove('logout');
                modalLoginStatusDiv.classList.add('login');
              } else {
                modalLoginStatusDiv.classList.remove('login');
                modalLoginStatusDiv.classList.add('logout');
              }
            }
          }

          if (viewAllModal) {
            // view all modal
            const modalElement = viewAllModal.modalInstance._element;
            const modalItem = modalElement.querySelector(`[id="${userId}"]`);
            if (!modalItem) return;

            const modalLoginStatusDiv = modalItem.querySelector(
              '.modal-login-status'
            );
            if (isLoggedIn) {
              modalLoginStatusDiv.classList.remove('modal-logout');
              modalLoginStatusDiv.classList.add('modal-login');
            } else {
              modalLoginStatusDiv.classList.remove('modal-login');
              modalLoginStatusDiv.classList.add('modal-logout');
            }
          }
        });
      };
    })
    .catch(() => {
      const allLoginStatus = document.querySelectorAll('.login-status');
      allLoginStatus.forEach((loginStatus) => {
        loginStatus.classList.remove('logout');
        loginStatus.classList.add('offline');
      });
    });
}
