import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json'
import en from './en.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_KEY } from '../shared/constants/key';

const resources = {
  ru: { translation: ru },
  en: { translation: en}
};

const getStoredLanguage = async () => {
  const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
  return lang || 'ru';
};


getStoredLanguage().then((lang) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: lang,
      fallbackLng: 'ru',
      interpolation: { escapeValue: false },
    });
});

export default i18n;
