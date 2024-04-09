import { applyLanguage } from './language.js';

export default function applyLanguageProfile() {
  const elementsToUpdate = {
    'recent-history': i18next.t('recent-history'),
    'friend-request': i18next.t('friend-request'),
    'friends': i18next.t('friends'),
    'rate': i18next.t('rate'),
    'win': i18next.t('win'),
    'loss': i18next.t('loss'),
    'choose-photo': i18next.t('choose-photo'),
    '2fa-option': i18next.t('2fa-option'),
    'language': i18next.t('language'),
    'change-password-guide': i18next.t('change-password-guide'),
    'change-password': i18next.t('change-password'),
    'unsubscribe-guide': i18next.t('unsubscribe-guide'),
    'unsubscribe': i18next.t('unsubscribe'),
    'lang-kr': i18next.t('lang-kr'),
    'lang-en': i18next.t('lang-en'),
    'lang-fr': i18next.t('lang-fr'),
    'playerHistoryViewAll': i18next.t('playerHistoryViewAll'),
    'friendListViewAll': i18next.t('friendListViewAll'),
    'friendRequestInvite': i18next.t('friendRequestInvite'),
    'friendRequestViewAll': i18next.t('friendRequestViewAll')
  };

  for (const [id, text] of Object.entries(elementsToUpdate)) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = text;
      applyLanguage().set({
        id: id
      });
    }
  }
};
