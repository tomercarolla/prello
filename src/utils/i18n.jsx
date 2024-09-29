import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en.json';

export const i18n = createInstance({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.use(initReactI18next).init();
