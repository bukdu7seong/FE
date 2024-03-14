// i18next 초기화 설정
i18next.init({
  resources: {
    en: {
      translation: {
        "recent-history": "Recent History"
      }
    },
    ko: {
      translation: {
        "recent-history": "최신 역사"
      }
    },
    fr: {
      translation: {
        "recent-history": "Bonjour le monde"
      }
    }
  },
  fallbackLng: "en",
  debug: true
});


// 언어 변경 함수
export function changeLanguage(language) {
  const languageCode = mapLanguageToCode(language);
  i18next.changeLanguage(languageCode, (err, t) => {
    if (err) return console.error(err);
    updateContent();
  });
}

// 언어명을 언어 코드로 변환하는 함수
function mapLanguageToCode(language) {
  const languageMap = {
    korean: 'ko',
    english: 'en',
    french: 'fr'
  };
  return languageMap[language.toLowerCase()] || 'en'; // 기본값으로 'en' 설정
}


// 페이지 콘텐츠 업데이트
export function updateContent() {
  document.getElementById("recent-history").innerHTML = i18next.t("recent-history");
}