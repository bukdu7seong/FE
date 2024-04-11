export default function applyLanguageTournamentWinnerModal() {
  const elementsToUpdate = {
    'tournamentWinnerModalLabel': { text: i18next.t('tournamentWinnerModalLabel'), type: 'innerHTML' },
    'tournament_player': { text: i18next.t('tournament_player'), type: 'innerHTML' },
    'restartGameButton': { text: i18next.t('restartGameButton'), type: 'innerHTML' }
  };

  for (const [id, { text, type }] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element[type] = text;
    }
  }
}