// i18next 초기화 설정
i18next.init({
  resources: {
    en: {
      translation: {
        'recent-history': 'Recent History',
        'friend-request': 'Friend Request',
        friends: 'Friends',
        'choose-photo': 'Choose a photo for your profile',
        rate: 'Rate',
        win: 'Win',
        loss: 'Loss',
        '2fa-option': '2FA Authentication Options',
        language: 'Select Language',
        'change-password-guide': 'Change Password',
        'change-password': 'Change Password',
        'find-password-guide': 'Find Password',
        'find-password': 'Find Password',
        'unsubscribe-guide': 'Unsubscribe',
        unsubscribe: 'Unsubscribe',
        confirm2FAModalLabel: '2FA Authentication Confirmation',
        'confirm-2fa-modal-message':
          'Do you want to proceed with 2FA authentication?',
        'confirm-2fa-modal-cancel': 'Cancel',
        'confirm-2fa-modal-continue': 'Continue',
        codeInputModalLabel: 'Enter Authentication Code',
        'code-input-modal-label-code': 'Authentication Code',
        codeInput: 'Enter your code',
        timer: 'Remaining time: 05:00',
        'code-input-modal-label-confirm': 'Confirm Code',
        'code-input-modal-label-resend': 'Resend Code',
        'lang-kr': 'Korean',
        'lang-en': 'English',
        'lang-fr': 'French',
        changePasswordModalLabel: 'Change Password',
        'change-password-modal-current': 'Current Password',
        'change-password-modal-new': 'New Password',
        'change-password-modal-new-confirm': 'Confirm New Password',
        'change-password-modal-cancel': 'Cancel',
        'change-password-modal-change': 'Change',
        confirmDeletionModalLabel: 'Confirm Account Deletion',
        'confirm-deletion-modal-content':
          'Are you sure you want to delete your account? This action cannot be undone.',
        'confirm-deletion-modal-cancel': 'Cancel',
        'confirm-deletion-modal-confirm': 'Confirm',
        passwordConfirmModalLabel: 'Password Confirmation',
        'password-confirm-form-content': 'Please enter your password',
        'password-confirm-form-input': 'Password',
        'password-confirm-form-confirm': 'Confirm',
        pong: 'PONG',
        classic: 'CLASSIC',
        player1: 'PLAYER 1',
        player2: 'PLAYER 2',
        gameSettingModalLabel: 'Game Setting',
        'player2-label': 'Player 2',
        'player-name': 'Name',
        mode: 'mode',
        'normal-label': 'normal',
        'speed-label': 'speed',
        'object-label': 'object',
        startGameButton: 'START',
        scoreModalLabel: 'SCORE',
        'win-label': 'WIN',
        'lose-label': 'LOSE',
        'save-score': 'SAVE SCORE',
        email2faModalLabel: 'Email Verification',
        emailAddressLabel: 'Email Address',
        emailInput: 'Enter your email (e.g., name@example.com)',
        'send-email-code-button': 'Send Code',
        codeInputLabel: 'Verification Code',
        'send-verification-code-button': 'SAVE SCORE',
        'tournament-pong': 'PONG',
        'tournament-header': 'TOURNAMENT',
        'tournament-player1': 'PLAYER 1',
        'tournament-player2': 'PLAYER 2',
        tournamentSettingModalLabel: 'TOURNAMENT GAME SETTING',
        't-player1-label': 'player 1',
        'player1-name': 'name',
        't-player2-label': 'player 2',
        'player2-name': 'name',
        't-player3-label': 'player 3',
        'player3-name': 'name',
        't-player4-label': 'player 4',
        'player4-name': 'name',
        't-mode': 'mode',
        't-normal-label': 'normal',
        't-speed-label': 'speed',
        't-object-label': 'object',
        startTournamentButton: 'START',
        tournamentRoundModalLabel: 'TOURNAMENT ROUND {{round}}',
        'round-player1': 'PLAYER 1',
        'round-player2': 'PLAYER 2',
        'round-content': 'Are you ready?',
        startRoundButton: 'START',
        tournamentWinnerModalLabel: 'TOURNAMENT WINNER!',
        tournament_player: 'Player',
        restartGameButton: 'OK',
        'change-username': 'Change Username',
        newUsername: 'Enter new username (maximum length: 10)',
        changeUserNameModalCloseButton: 'Close',
        changeUserNameModalSaveButton: 'Save',
        changeUserImageModalh1: 'Change Profile Image',
        changeUserImageModalCloseButton: 'Close',
        changeUserImageModalSaveButton: 'Save',
        viewAllHistoryModalH2: 'Game History',
        viewAllHistoryModalNoData: 'No data',
        inviteFriendsModalTitle: 'Invite Friends',
        searchFriends: 'Search',
        searchButton: 'Search',
        onlyAlphanumeric: 'Only alphanumeric characters are allowed.',
        enterUsername: 'Please enter a username.',
        inviteFriendsModalNoData: 'No data',
        viewAllRequestsModalTitle: 'Friend Request',
        viewAllRequestsModalNoFriend: 'No Friend Request',
        viewAllFriendsModalTitle: 'Friends',
        viewAllFriendsModalNoData: 'No data',
        logoutModalLabel: 'LOGOUT',
        logoutModalBody: 'Do you want to log out?',
        'logout-no': 'NO',
        'logout-confirm': 'YES',
        historyItemNoData: 'No data',
        friendItemNoData: 'No data',
        requestItemNoData: 'No data',
        playerHistoryViewAll: 'View all',
        friendListViewAll: 'View all',
        friendRequestInvite: 'Invite friends',
        friendRequestViewAll: 'View all',
        invalidEmailFormat: 'Invalid email format',
        verificationFailed: 'Verification failed. Please try again.',
        connectSuccess: 'Connect Success',
        passwordChangeSuccess: 'Password changed successfully',
        passwordChangeFail: 'Password change failed',
        change2faSuccess: '2FA authentication changed successfully',
        changeUserNameSuccess: 'Successfully changed username',
        changeUserImageSuccess: 'Successfully changed image',
        invalidPasswordFormat: 'Invalid password format.',
        newPasswordNotMatch: 'New password does not match.',
        incorrectCurrentPassword: 'Incorrect current password.',
        unsubscribeSuccess: 'Account successfully unsubscribed.',
        unsubscribePassword: 'Password is required.',
        alphanumericUsername: 'Only alphanumeric characters are allowed.',
        emptyUsername: 'Please enter a username.',
        selectImage: 'Please select an image.',
        alreadyFriend: 'Already invited or already friends.',
        failedToInvite: 'Failed to invite friend',
        userNotFound: 'User not found',
        failedToSearch: 'Failed to search user',
        FailedFetchImage: 'Failed to fetch user image.',
        emailSuccess: 'Verification code sent successfully.',
        enterPlayerName: "Please enter the player's name.",
        enterUniqueName: "Please enter unique names for all players",
        cantFindFriends : 'Can\'t find your friends.'
      },
    },
    kr: {
      translation: {
        'recent-history': '최근 역사',
        'friend-request': '친구 요청',
        friends: '친구들',
        'choose-photo': '프로필 사진 선택',
        rate: '승률',
        win: '승리',
        loss: '패배',
        '2fa-option': '2단계 인증 옵션',
        language: '언어 선택',
        'change-password-guide': '비밀번호 변경',
        'change-password': '비밀번호 변경',
        'find-password-guide': '비밀번호 찾기',
        'find-password': '비밀번호 찾기',
        'unsubscribe-guide': '구독 취소',
        unsubscribe: '구독 취소',
        confirm2FAModalLabel: '2단계 인증 확인',
        'confirm-2fa-modal-message': '2단계 인증을 진행하시겠습니까?',
        'confirm-2fa-modal-cancel': '취소',
        'confirm-2fa-modal-continue': '계속',
        codeInputModalLabel: '인증 코드 입력',
        'code-input-modal-label-code': '인증 코드',
        codeInput: '코드를 입력하세요',
        timer: '남은 시간: 05:00',
        'code-input-modal-label-confirm': '코드 확인',
        'code-input-modal-label-resend': '코드 재전송',
        'lang-kr': '한국어',
        'lang-en': '영어',
        'lang-fr': '프랑스어',
        changePasswordModalLabel: '비밀번호 변경',
        'change-password-modal-current': '현재 비밀번호',
        'change-password-modal-new': '새 비밀번호',
        'change-password-modal-new-confirm': '새 비밀번호 확인',
        'change-password-modal-cancel': '취소',
        'change-password-modal-change': '변경하기',
        confirmDeletionModalLabel: '회원 탈퇴 확인',
        'confirm-deletion-modal-content':
          '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        'confirm-deletion-modal-cancel': '취소',
        'confirm-deletion-modal-confirm': '확인',
        passwordConfirmModalLabel: '비밀번호 확인',
        'password-confirm-form-content': '비밀번호를 입력하세요',
        'password-confirm-form-input': '비밀번호',
        'password-confirm-form-confirm': '확인',
        pong: '퐁',
        classic: '클래식',
        player1: '플레이어 1',
        player2: '플레이어 2',
        gameSettingModalLabel: '게임 설정',
        'player2-label': '플레이어 2',
        'player-name': '이름',
        mode: '모드',
        'normal-label': '일반',
        'speed-label': '스피드',
        'object-label': '오브젝트',
        startGameButton: '시작',
        scoreModalLabel: '점수',
        'win-label': '승리',
        'lose-label': '패배',
        'save-score': '점수 저장',
        email2faModalLabel: '이메일 인증',
        emailAddressLabel: '이메일 주소',
        emailInput: '이메일 입력 (예: name@example.com)',
        'send-email-code-button': '코드 보내기',
        codeInputLabel: '인증 코드',
        'send-verification-code-button': '점수 저장',
        'tournament-pong': '퐁',
        'tournament-header': '토너먼트',
        'tournament-player1': '플레이어 1',
        'tournament-player2': '플레이어 2',
        tournamentSettingModalLabel: '토너먼트 게임 설정',
        't-player1-label': '플레이어 1',
        'player1-name': '이름',
        't-player2-label': '플레이어 2',
        'player2-name': '이름',
        't-player3-label': '플레이어 3',
        'player3-name': '이름',
        't-player4-label': '플레이어 4',
        'player4-name': '이름',
        't-mode': '모드',
        't-normal-label': '일반',
        't-speed-label': '스피드',
        't-object-label': '오브젝트',
        startTournamentButton: '시작',
        tournamentRoundModalLabel: '토너먼트 라운드 {{round}}',
        'round-player1': '플레이어 1',
        'round-player2': '플레이어 2',
        'round-content': '준비되셨나요?',
        startRoundButton: '시작',
        tournamentWinnerModalLabel: '토너먼트 우승자!',
        tournament_player: '플레이어',
        restartGameButton: '확인',
        'change-username': '사용자 이름 변경',
        newUsername: '새 사용자 이름 입력 (최대 길이: 10)',
        changeUserNameModalCloseButton: '닫기',
        changeUserNameModalSaveButton: '저장',
        changeUserImageModalh1: '프로필 이미지 변경',
        changeUserImageModalCloseButton: '닫기',
        changeUserImageModalSaveButton: '저장',
        viewAllHistoryModalH2: '게임 기록',
        viewAllHistoryModalNoData: '데이터 없음',
        inviteFriendsModalTitle: '친구 초대하기',
        searchFriends: '검색',
        searchButton: '검색',
        onlyAlphanumeric: '알파벳과 숫자만 사용할 수 있습니다.',
        enterUsername: '사용자 이름을 입력해주세요.',
        inviteFriendsModalNoData: '데이터 없음',
        viewAllRequestsModalTitle: '친구 추가',
        viewAllRequestsModalNoFriend: '친구 요청 없음',
        viewAllFriendsModalTitle: '친구들',
        viewAllFriendsModalNoData: '데이터 없음',
        logoutModalLabel: '로그아웃',
        logoutModalBody: '로그아웃 하시겠습니까?',
        'logout-no': '아니오',
        'logout-confirm': '예',
        historyItemNoData: '데이터 없음',
        friendItemNoData: '데이터 없음',
        requestItemNoData: '데이터 없음',
        playerHistoryViewAll: '모두 보기',
        friendListViewAll: '모두 보기',
        friendRequestInvite: '친구 초대',
        friendRequestViewAll: '모두 보기',
        invalidEmailFormat: '잘못된 이메일 형식',
        verificationFailed: '인증에 실패했습니다. 다시 시도해주세요.',
        connectSuccess: '연결 성공',
        passwordChangeSuccess: '비밀번호가 성공적으로 변경되었습니다',
        passwordChangeFail: '비밀번호 변경 실패',
        change2faSuccess: '2단계 인증 변경 성공',
        changeUserNameSuccess: '사용자 이름 변경 성공',
        changeUserImageSuccess: '이미지 변경 성공',
        invalidPasswordFormat: '비밀번호 형식이 올바르지 않습니다.',
        newPasswordNotMatch: '새 비밀번호가 일치하지 않습니다.',
        incorrectCurrentPassword: '현재 비밀번호가 정확하지 않습니다.',
        unsubscribeSuccess: '계정이 성공적으로 삭제되었습니다.',
        unsubscribePassword: '비밀번호를 입력해야 합니다.',
        alphanumericUsername: '알파벳과 숫자만 허용됩니다.',
        emptyUsername: '사용자 이름을 입력해주세요.',
        selectImage: '이미지를 선택해주세요.',
        alreadyFriend: '이미 초대했거나 이미 친구입니다.',
        failedToInvite: '친구 초대 실패',
        userNotFound: '사용자를 찾을 수 없습니다.',
        failedToSearch: '사용자 검색 실패.',
        FailedFetchImage: '사용자 이미지를 불러오는 데 실패했습니다.',
        emailSuccess: '이메일 인증 코드가 성공적으로 전송되었습니다.',
        enterPlayerName : '플레이어의 이름을 입력해주세요.',
        enterUniqueName: "모든 플레이어의 고유한 이름을 입력하세요.",
        cantFindFriends: "친구를 찾을 수 없어요."
      },
    },
    fr: {
      translation: {
        'recent-history': 'Histoire Récente',
        'friend-request': "Demande d'Ami",
        friends: 'Amis',
        'choose-photo': 'Choisir une photo pour votre profil',
        rate: 'Taux',
        win: 'Gagner',
        loss: 'Perte',
        '2fa-option': "Options d'authentification 2FA",
        language: 'Choisir la Langue',
        'change-password-guide': 'Changer le Mot de Passe',
        'change-password': 'Changer le Mot de Passe',
        'find-password-guide': 'Trouver le Mot de Passe',
        'find-password': 'Trouver le Mot de Passe',
        'unsubscribe-guide': 'Se Désabonner',
        unsubscribe: 'Se Désabonner',
        confirm2FAModalLabel: "Confirmation d'authentification 2FA",
        'confirm-2fa-modal-message':
          "Voulez-vous procéder à l'authentification 2FA?",
        'confirm-2fa-modal-cancel': 'Annuler',
        'confirm-2fa-modal-continue': 'Continuer',
        codeInputModalLabel: "Entrez le code d'authentification",
        'code-input-modal-label-code': "Code d'authentification",
        codeInput: 'Entrez votre code',
        timer: 'Temps restant : 05:00',
        'code-input-modal-label-confirm': 'Confirmer le code',
        'code-input-modal-label-resend': 'Renvoyer le code',
        'lang-kr': 'Coréen',
        'lang-en': 'Anglais',
        'lang-fr': 'Français',
        changePasswordModalLabel: 'Changer le mot de passe',
        'change-password-modal-current': 'Mot de passe actuel',
        'change-password-modal-new': 'Nouveau mot de passe',
        'change-password-modal-new-confirm':
          'Confirmer le nouveau mot de passe',
        'change-password-modal-cancel': 'Annuler',
        'change-password-modal-change': 'Changer',
        confirmDeletionModalLabel: 'Confirmation de la suppression du compte',
        'confirm-deletion-modal-content':
          'Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.',
        'confirm-deletion-modal-cancel': 'Annuler',
        'confirm-deletion-modal-confirm': 'Confirmer',
        passwordConfirmModalLabel: 'Confirmation du mot de passe',
        'password-confirm-form-content': 'Veuillez entrer votre mot de passe',
        'password-confirm-form-input': 'Mot de passe',
        'password-confirm-form-confirm': 'Confirmer',
        pong: 'PONG',
        classic: 'CLASSIQUE',
        player1: 'JOUEUR 1',
        player2: 'JOUEUR 2',
        gameSettingModalLabel: 'Paramètres du jeu',
        'player2-label': 'Joueur 2',
        'player-name': 'Nom',
        mode: 'mode',
        'normal-label': 'normal',
        'speed-label': 'vitesse',
        'object-label': 'objet',
        startGameButton: 'COMMENCER',
        scoreModalLabel: 'SCORE',
        'win-label': 'GAGNER',
        'lose-label': 'PERDRE',
        'save-score': 'ENREGISTRER LE SCORE',
        email2faModalLabel: 'Vérification de l’Email',
        emailAddressLabel: 'Adresse Email',
        emailInput: 'Entrez votre email (par ex. name@example.com)',
        'send-email-code-button': 'Envoyer le Code',
        codeInputLabel: 'Code de Vérification',
        'send-verification-code-button': 'ENREGISTRER LE SCORE',
        'tournament-pong': 'PONG',
        'tournament-header': 'TOURNOI',
        'tournament-player1': 'JOUEUR 1',
        'tournament-player2': 'JOUEUR 2',
        tournamentSettingModalLabel: 'Configuration du jeu de tournoi',
        't-player1-label': 'joueur 1',
        'player1-name': 'nom',
        't-player2-label': 'joueur 2',
        'player2-name': 'nom',
        't-player3-label': 'joueur 3',
        'player3-name': 'nom',
        't-player4-label': 'joueur 4',
        'player4-name': 'nom',
        't-mode': 'mode',
        't-normal-label': 'normal',
        't-speed-label': 'vitesse',
        't-object-label': 'objet',
        startTournamentButton: 'DÉBUT',
        tournamentRoundModalLabel: 'TOURNOI ROUND {{round}}',
        'round-player1': 'JOUEUR 1',
        'round-player2': 'JOUEUR 2',
        'round-content': 'Êtes-vous prêt ?',
        startRoundButton: 'COMMENCER',
        tournamentWinnerModalLabel: 'VAINQUEUR DU TOURNOI !',
        tournament_player: 'Joueur',
        restartGameButton: 'OK',
        'change-username': 'Changer le nom d’utilisateur',
        newUsername:
          'Entrez le nouveau nom d’utilisateur (longueur maximale : 10)',
        changeUserNameModalCloseButton: 'Fermer',
        changeUserNameModalSaveButton: 'Enregistrer',
        changeUserImageModalh1: 'Changer l’image de profil',
        changeUserImageModalCloseButton: 'Fermer',
        changeUserImageModalSaveButton: 'Enregistrer',
        viewAllHistoryModalH2: 'Historique des jeux',
        viewAllHistoryModalNoData: 'Aucune donnée',
        inviteFriendsModalTitle: 'Inviter des amis',
        searchFriends: 'Recherche',
        searchButton: 'Rechercher',
        onlyAlphanumeric:
          'Seuls les caractères alphanumériques sont autorisés.',
        enterUsername: 'Veuillez entrer un nom d’utilisateur.',
        inviteFriendsModalNoData: 'Aucune donnée',
        viewAllRequestsModalTitle: 'Demande d’ami',
        viewAllRequestsModalNoFriend: 'Aucune demande d’ami',
        viewAllFriendsModalTitle: 'Amis',
        viewAllFriendsModalNoData: 'Aucune donnée',
        logoutModalLabel: 'DÉCONNEXION',
        logoutModalBody: 'Voulez-vous vous déconnecter ?',
        'logout-no': 'NON',
        'logout-confirm': 'OUI',
        historyItemNoData: 'Aucune donnée',
        friendItemNoData: 'Aucune donnée',
        requestItemNoData: 'Aucune donnée',
        playerHistoryViewAll: 'Voir tout',
        friendListViewAll: 'Voir tout',
        friendRequestInvite: 'Inviter des amis',
        friendRequestViewAll: 'Voir tout',
        invalidEmailFormat: "Format d'email invalide",
        verificationFailed: 'Échec de la vérification. Veuillez réessayer.',
        connectSuccess: 'Connexion réussie',
        passwordChangeSuccess: 'Le mot de passe a été changé avec succès',
        passwordChangeFail: 'Échec du changement de mot de passe',
        change2faSuccess: 'Authentification 2FA modifiée avec succès',
        changeUserNameSuccess: "Changement de nom d'utilisateur réussi",
        changeUserImageSuccess: "Changement d'image réussi",
        invalidPasswordFormat: 'Format de mot de passe invalide.',
        newPasswordNotMatch: 'Le nouveau mot de passe ne correspond pas.',
        incorrectCurrentPassword: 'Mot de passe actuel incorrect.',
        unsubscribeSuccess: 'Désinscription réussie.',
        unsubscribePassword: 'Le mot de passe est requis.',
        alphanumericUsername:
          'Seuls les caractères alphanumériques sont autorisés.',
        emptyUsername: "Veuillez entrer un nom d'utilisateur.",
        selectImage: 'Veuillez sélectionner une image.',
        alreadyFriend: 'Déjà invité ou déjà amis.',
        failedToInvite: "Échec de l'invitation d'ami",
        userNotFound: 'Utilisateur non trouvé',
        failedToSearch: "Échec de la recherche de l'utilisateur",
        FailedFetchImage: "Échec du chargement de l'image de l'utilisateur.",
        emailSuccess: 'Code de vérification envoyé avec succès.',
        enterPlayerName: "Veuillez entrer le nom du joueur.",
        enterUniqueName: 'Veuillez saisir des noms uniques pour tous les joueurs',
        cantFindFriends: "친구를 찾을 수 없어요."
      },
    },
  },
  fallbackLng: 'en',
  debug: false,
});

export function changeLanguage(languageCode) {
  if (i18next.language === languageCode) {
    return;
  }

  i18next.changeLanguage(languageCode, (err) => {
    if (err) return console.error(err);
  });
}

let updates = [];

export function applyLanguage() {
  function setUpdate({ id }) {
    updates.push({ id });
  }

  function applyUpdates() {
    updates.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = i18next.t(id);
      }
    });
  }

  return {
    set: setUpdate,
    call: applyUpdates,
  };
}
