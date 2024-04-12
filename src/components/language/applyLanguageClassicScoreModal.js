export default function applyLanguageClassicScoreModal() {
  const elementsToUpdate = {
    'scoreModalLabel': i18next.t('scoreModalLabel'),
    'win-label': i18next.t('win-label'),
    'lose-label': i18next.t('lose-label'),
    'save-score': i18next.t('save-score'),
    'email2faModalLabel': i18next.t('email2faModalLabel'),
    'emailAddressLabel': i18next.t('emailAddressLabel'),
    'emailInput': i18next.t('emailInput'),
    'send-email-code-button': i18next.t('send-email-code-button'),
    'codeInputLabel': i18next.t('codeInputLabel'),
    'send-verification-code-button': i18next.t('send-verification-code-button')
  };

  for (const [id, text] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      if (id === 'emailInput') {
        element.placeholder = text;
      } else {
        element.textContent = text;
      }
    }
  }
};
