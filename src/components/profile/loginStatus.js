import { userState } from '../../../lib/state/state.js';

export function listenFriendLogin() {
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
      userSocket.onmessage = (event) => {
        console.log(event);
        const loginStatusList = JSON.parse(event.data); // {}

        loginStatusList.forEach((loginStatus) => {
          for (let [key, value] of Object.entries(loginStatus)) {
            const friendItem = document.getElementById(key);
            const loginStatusDiv = friendItem.querySelector('.login-status');
            if (value) {
              loginStatusDiv.classList.remove('logout');
              loginStatusDiv.classList.add('login');
            } else {
              loginStatusDiv.classList.remove('login');
              loginStatusDiv.classList.add('logout');
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
