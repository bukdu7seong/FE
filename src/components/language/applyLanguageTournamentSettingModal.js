export default function applyLanguageTournamentSettingModal() {
  const elementsToUpdate = {
    'tournamentSettingModalLabel': { text: i18next.t('tournamentSettingModalLabel'), type: 'textContent' },
    't-player1-label': { text: i18next.t('t-player1-label'), type: 'textContent' },
    'player1-name': { text: i18next.t('player1-name'), type: 'placeholder' },
    't-player2-label': { text: i18next.t('t-player2-label'), type: 'textContent' },
    'player2-name': { text: i18next.t('player2-name'), type: 'placeholder' },
    't-player3-label': { text: i18next.t('t-player3-label'), type: 'textContent' },
    'player3-name': { text: i18next.t('player3-name'), type: 'placeholder' },
    't-player4-label': { text: i18next.t('t-player4-label'), type: 'textContent' },
    'player4-name': { text: i18next.t('player4-name'), type: 'placeholder' },
    't-mode': { text: i18next.t('t-mode'), type: 'textContent' },
    't-normal-label': { text: i18next.t('t-normal-label'), type: 'textContent' },
    't-speed-label': { text: i18next.t('t-speed-label'), type: 'textContent' },
    't-object-label': { text: i18next.t('t-object-label'), type: 'textContent' },
    'startTournamentButton': { text: i18next.t('startTournamentButton'), type: 'textContent' }
  };

  for (const [id, { text, type }] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element[type] = text;
    }
  }
}