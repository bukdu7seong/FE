export default function applyLanguageClassic() {
  const elementsToUpdate = {
    'pong': i18next.t('pong'),
    'classic': i18next.t('classic'),
    'player1': i18next.t('player1'),
    'player2': i18next.t('player2')
  };

  for (const [id, text] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = text;
    }
  }
}