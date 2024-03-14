// i18next 초기화 설정
i18next.init({
  resources: {
    en: {
      translation: {
        "recent-history": "Recent History",
        "friend-request": "Friend Request",
        "friends": "Friends",
        "choose-photo": "Choose a photo for your profile",
        "rate": "Rate",
        "win": "Win",
        "loss": "Loss",
        "profile": "Profile",
        "view-all": "View All"
      }
    },
    ko: {
      translation: {
        "recent-history": "최근 역사",
        "friend-request": "친구 요청",
        "friends": "친구들",
        "choose-photo": "프로필 사진 선택",
        "rate": "승률",
        "win": "승리",
        "loss": "패배",
        "profile": "프로필",
        "view-all": "모두 보기"
      }
    },
    fr: {
      translation: {
        "recent-history": "Histoire Récente",
        "friend-request": "Demande d'ami",
        "friends": "Amis",
        "choose-photo": "Choisir une photo pour votre profil",
        "rate": "Taux",
        "win": "Gagner",
        "loss": "Perte",
        "profile": "Profil",
        "view-all": "Voir tout"
      }
    }
  },
  fallbackLng: "en",
  debug: true
});

// 기존의 함수들은 변경 없음

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
  document.getElementById("friend-request").innerHTML = i18next.t("friend-request");
  document.getElementById("friends").innerHTML = i18next.t("friends");
  document.getElementById("rate").innerHTML = i18next.t("rate");
  document.getElementById("win").innerHTML = i18next.t("win");
  document.getElementById("loss").innerHTML = i18next.t("loss");
  document.getElementById("choose-photo").innerHTML = i18next.t("choose-photo");
  document.getElementById("profile").innerHTML = i18next.t("profile");
  document.getElementById("view-all").innerHTML = i18next.t("view-all");
}