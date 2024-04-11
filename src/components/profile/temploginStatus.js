
export function listenFriendLogin(array) {
  const userData = userState.getState();
  const userSocket = userData.userSocket;

  const waitForSocketOpen = new Promise((resolve, reject) => {
    const checkInterval = setInterval(() => {
      if (userSocket && userSocket.readyState === WebSocket.OPEN) {
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
    })
    .catch(() => {
      const allLoginStatus = document.querySelectorAll('.login-status');
      allLoginStatus.forEach((loginStatus) => {
        loginStatus.classList.remove('logout');
        loginStatus.classList.add('offline');
      });
    });
}
