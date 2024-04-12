export default function applyLanguageTournamentWinnerModal() {
  const elementsToUpdate = {
    'tournamentWinnerModalLabel': { text: i18next.t('tournamentWinnerModalLabel'), type: 'textContent' },
    'tournament_player': { text: i18next.t('tournament_player'), type: 'textContent' },
    'restartGameButton': { text: i18next.t('restartGameButton'), type: 'textContent' }
  };

  for (const [id, { text, type }] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element[type] = text;
    }
  }
}