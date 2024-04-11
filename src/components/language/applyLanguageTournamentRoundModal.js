export default function applyLanguageTournamentRoundModal(round) {
  const elementsToUpdate = {
    'tournamentRoundModalLabel': {
      text: i18next.t('tournamentRoundModalLabel', { round: round }),
      type: 'textContent'
    },
    'round-player1': { text: i18next.t('round-player1'), type: 'innerHTML' },
    'round-player2': { text: i18next.t('round-player2'), type: 'innerHTML' },
    'round-content': { text: i18next.t('round-content'), type: 'innerHTML' },
    'startRoundButton': { text: i18next.t('startRoundButton'), type: 'innerHTML' }
  };

  for (const [id, { text, type }] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element[type] = text;
    }
  }
};