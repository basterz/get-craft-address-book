import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translationEng from "../i18n/locales/en/translation.json";
import translationInd from "../i18n/locales/id/translation.json";

i18n.use(XHR)
    .use(LanguageDetector)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: "en", // use en if detected lng is not available
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        resources: {
            en: {
                translations: translationEng
            },
            id: {
                translations: translationInd
            }
        },
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;
