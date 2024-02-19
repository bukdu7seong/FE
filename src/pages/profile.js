/* 
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="user-box"></div>
          <div class="profile-box">
            <div class="player-profile">
              <div class="player-avatar"></div>
              <div class="player-info">
                <p class="player-name">Player Name</p>
                <button class="upload-photo">Choose a photo for your profile</button>
                <div class="player-stats">
                  <div class="player-stats-box">
                    <p>RATE</p>
                    <p>0</p>
                  </div>
                  <div class="player-stats-box">
                    <p>WIN</p>
                    <p>0</p>
                  </div>
                  <div class="player-stats-box">
                    <p>LOSS</p>
                    <p>0</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="player-history">
              <p class="history-title">Recent History</p>
              <div class="history-box"></div>
              <button class="history-view-all">View all</button>
            </div>      
            <div class="friend-list">
              <p class="friend-title">Friends</p>
              <div class="friend-box"></div>
              <button class="friend-view-all">View all</button>
            </div>
            <div class="friend-request">
              <p class="request-title">Friend Requests</p>
              <div class="request-box"></div>
              <button class="request-invite">Invite Friends</button>
              <button class="request-view-all">View all</button>
            </div>
            <div class="setting">
              <div class="setting-2fa"></div>
              <div class="setting-language"></div>
              <div class="setting-unsubscribe"></div>
            </div>
          </div>
        </div>
*/

export function pageProfile() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="user-box"></div>
          <div class="profile-box">
            <div class="player-profile">
            </div>
            <div class="player-history">
            </div>      
            <div class="friend-list">
            </div>
            <div class="blank-div"></div>
            <div class="friend-request">
            </div>
            <div class="setting">
            </div>
          </div>
        </div>
      `;
  page.innerHTML = content;
  return page;
}
