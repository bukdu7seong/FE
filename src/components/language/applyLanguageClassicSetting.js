export default function applyLanguageClassicSetting() {
  const elementsToUpdate = {
    'gameSettingModalLabel': i18next.t('gameSettingModalLabel'),
    'player2-label': i18next.t('player2-label'),
    'player-name': i18next.t('player-name'), // placeholder의 경우 추가 처리 필요
    'mode': i18next.t('mode'),
    'normal-label': i18next.t('normal-label'),
    'speed-label': i18next.t('speed-label'),
    'object-label': i18next.t('object-label'),
    'startGameButton': i18next.t('startGameButton')
  };

  for (const [id, text] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      if (id === 'player-name') {
        element.placeholder = text; // placeholder의 경우 별도 처리
      } else {
        element.innerHTML = text;
      }
    }
  }
}
