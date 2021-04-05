const env = {
  dev: "dev",
  test: "test",
  stg: "stg",
  product: "product",
  local: "local",
};
const API_URL = {
  local: "http://localhost:5000/v1",
  dev: "http://10.5.67.18:5000/v1",
  test: "http://195.229.192.170:3300",
  stg: "http://192.168.1.102:3300",
  product: "https://crowd-server.com/sbisialy/v1",
};
const currentEnv = env.product;

export const BASE_API_URL = API_URL[currentEnv];
export const BASE_API_URL_IMAEG_THUMB =
  API_URL[currentEnv] + "/uploads/thumbnail/";
export const BASE_API_URL_IMAEG = API_URL[currentEnv] + "/uploads/medium/";
export const BASE_API_URL_IMAEG_ORIGINAL =
  API_URL[currentEnv] + "/uploads/original/";
export const BASE_API_URL_VIDEOS = API_URL[currentEnv];
export const USER_TOKEN = "USER_TOKEN";
export const LOW_QUALITY = "?q=30";
export const MEDIUM_QUALITY = "?q=50";
export const HEIGHT_QUALITY = "?q=100";
export const PROGRESSIVE_QUALITY = "?q=2";

export const MARCHENT_KEY_TEST =
  "test_$2y$10$dRat0iZ.uvCm.SZVEyta2.ym1.Da9vz7oI5jFjkrsLMszwUe6QL22";
export const MARCHENT_KEY_LIVE =
  "live_$2y$10$tsEZX410Pm7p893ieoBlv.Q8qiG-8kUmAT0qOjZ0SnjWHXRIzbTHS";

export const FOLOOSI_URL_TEST =
  "https://foloosi.com/api/v1/api/initialize-setup";
export const FOLOOSI_URL_LIVE =
  "https://foloosi.com/api/v1/api/initialize-setup";
export const FONT_FAMILY = "EUROSTILE";

export const momentConf = {
  name: "ar",
  config: {
    months: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthsShort: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthsParseExact: true,
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[اليوم عند الساعة] LT",
      nextDay: "[غدًا عند الساعة] LT",
      nextWeek: "dddd [عند الساعة] LT",
      lastDay: "[أمس عند الساعة] LT",
      lastWeek: "dddd [عند الساعة] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "بعد %s",
      past: "منذ %s",
      s: "quelques secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function(number) {
      return number + (number === 1 ? "er" : "e");
    },
    meridiemParse: /ص|م/,
    isPM: function(input) {
      return "م" === input;
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function(hour, minute, isLower) {
      if (hour < 12) {
        return "ص";
      } else {
        return "م";
      }
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // Used to determine first week of the year.
    },
  },
};
