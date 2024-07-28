import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationNO from './locales/no/translation.json';
import translationBU from './locales/bu/translation.json';
import translationZO from './locales/zo/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    no: {
        translation: translationNO,
    },
    bu: {
        translation: translationBU,
    },
    zo: {
        translation: translationZO,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // default language
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;