export function pageGame() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
        <div class="side-bar"></div>
        <div class="main-box">
          <div class="user-box"></div>
          <div class="game-box" id='game'>
            <p class="header-pong">PONG</p>
            <p class="header-classic">CLASSIC</p>
            <div class="player-container">
              <div class="player-option" id="player1">PLAYER 1</div>
              <div class="divider"></div>
              <div class="player-option" id="player2">PLAYER 2</div>
            </div>
            
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#gameSettingModal"></button>
<div class="modal fade" id="gameSettingModal" tabindex="-1" aria-labelledby="gameSettingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h2 class="modal-title" id="gameSettingModalLabel">Game Setting</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-white">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-4">
                            <label for="player-name" class="form-label">Player 2</label>
                        </div>
                        <div class="col">
                            <input type="text" class="form-control bg-dark text-white" id="player-name"
                                   placeholder="Name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="form-label d-block">Mode</label>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="normal" checked>
                                <label class="form-check-label" for="normal">
                                    Normal Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="speed">
                                <label class="form-check-label" for="speed">
                                    Speed Mode
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gameMode" id="object">
                                <label class="form-check-label" for="object">
                                    Object Mode
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-0">
      <button type="button" id="startGameButton" class="btn btn-md btn-success w-100">START</button>

            </div>
        </div>
    </div>
</div>




          </div>
          
        </div>
      `;
  page.innerHTML = content;

  let gameBox = page.querySelector('#game');
  let gameSettingModalButton = page.querySelector('button[data-bs-toggle="modal"]');

  gameBox.addEventListener('click', function() {
    gameSettingModalButton.click(); // 내부 버튼의 클릭 이벤트를 트리거합니다.
  });

  // 이벤트 리스너 제거?
  return page;
}

export function pageBoard() {
  const page = document.createElement('div');
  page.setAttribute('class', 'board');
  const content = `
      <div class="ball">
        <div class="ball_effect"></div>
      </div>
      <div class="paddle paddle_1"></div>
      <div class="paddle paddle_2"></div>
      <div class="player_1_score">0</div>
      <div class="player_2_score">0</div>
      <div class="message">Press Enter to Play Pong</div>
      
<!-- Score Modal -->
<div class="modal fade" id="scoreModal" tabindex="-1" aria-labelledby="scoreModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content bg-dark text-white">
            <div class="modal-header border-0">
                <h1 class="modal-title fs-1 w-100 text-center" id="scoreModalLabel">SCORE</h1>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <!-- Winner section -->
                <div class="winner-loser mb-3 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-success rounded-pill px-3 me-2">WIN</span>
                    <img src="1.jpg" class="rounded-circle me-2" alt="Anna Clarke" style="width: 50px; height: 50px;">
                    <span class="fw-bold flex-grow-1">Anna Clarke</span>
                    <span class="time-score rounded-pill bg-secondary px-3">13: 42.1</span>
                </div>
                <!-- Loser section -->
                <div class="winner-loser mb-4 p-2 rounded d-flex align-items-center justify-content-between">
                    <span class="badge bg-secondary rounded-pill px-3 me-2">LOSE</span>
                    <div class="bg-light rounded-circle me-2" style="width: 50px; height: 50px;"></div>
                    <span class="fw-bold flex-grow-1">Player 2</span>
                    <span class="time-score rounded-pill bg-secondary px-3">13: 42.1</span>
                </div>
            </div>

            <div class="modal-footer border-0">
                <button type="button" class="btn btn-lg btn-success w-100 mb-2 rounded-pill" data-bs-target="#email2faModal" data-bs-toggle="modal">SAVE SCORE</button>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="email2faModal" aria-hidden="true" aria-labelledby="email2faModalLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="email2faModalLabel">Email Verification</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="emailVerificationForm">
                    <!-- Email address input -->
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="name@example.com" required>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-primary" onclick="sendVerificationEmail()">Send Verification Code</button>
                    </div>
                    <!-- Verification code input -->
                    <div class="mb-3 mt-3">
                        <label for="verificationCodeInput" class="form-label">Verification Code</label>
                        <input type="text" class="form-control" id="verificationCodeInput" placeholder="Enter your code" required>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-success">Submit Verification Code</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    `;

  page.innerHTML = content;


  function loadScript() {
    let script = document.createElement('script');
    script.src = 'src/pages/sendVerificationEmail.js'; // 스크립트 파일 경로
    document.body.appendChild(script); // <head>에 스크립트 추가
  }

  loadScript(); // 스크립트 로드 함수 호출


  return page;
}

async function verifyCodeWithServer(code) {
  try {
    const response = await fetch('YOUR_SERVER_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });

    if (!response.ok) {
      throw new Error('Server response was not ok.');
    }

    const data = await response.json();
    // 검증 결과에 따라 추가 작업 수행
    // 예: 사용자에게 성공 또는 실패 메시지 표시
  } catch (error) {
    console.error('Error verifying code:', error);
    // 오류 처리
  }
}
