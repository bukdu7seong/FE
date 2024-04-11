export default function applyLanguageTournamentSettingModal() {
  const elementsToUpdate = {
    'tournamentSettingModalLabel': { text: i18next.t('tournamentSettingModalLabel'), type: 'innerHTML' },
    't-player1-label': { text: i18next.t('t-player1-label'), type: 'innerHTML' },
    'player1-name': { text: i18next.t('player1-name'), type: 'placeholder' },
    't-player2-label': { text: i18next.t('t-player2-label'), type: 'innerHTML' },
    'player2-name': { text: i18next.t('player2-name'), type: 'placeholder' },
    't-player3-label': { text: i18next.t('t-player3-label'), type: 'innerHTML' },
    'player3-name': { text: i18next.t('player3-name'), type: 'placeholder' },
    't-player4-label': { text: i18next.t('t-player4-label'), type: 'innerHTML' },
    'player4-name': { text: i18next.t('player4-name'), type: 'placeholder' },
    't-mode': { text: i18next.t('t-mode'), type: 'innerHTML' },
    't-normal-label': { text: i18next.t('t-normal-label'), type: 'innerHTML' },
    't-speed-label': { text: i18next.t('t-speed-label'), type: 'innerHTML' },
    't-object-label': { text: i18next.t('t-object-label'), type: 'innerHTML' },
    'startTournamentButton': { text: i18next.t('startTournamentButton'), type: 'innerHTML' }
  };

  for (const [id, { text, type }] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element[type] = text;
    }
  }
}