import { createI18n } from 'vue-i18n'
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ch from './locales/ch.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';

export default createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    fr,
    es,
    ch,
    ar,
    ja,
    ko,
  },
});
