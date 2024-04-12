export default function applyLanguageTournamentBox() {
  const elementsToUpdate = {
    'tournament-pong': i18next.t('tournament-pong'),
    'tournament-header': i18next.t('tournament-header'),
    'tournament-player1': i18next.t('tournament-player1'),
    'tournament-player2': i18next.t('tournament-player2')
  };

  for (const [id, text] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }
}