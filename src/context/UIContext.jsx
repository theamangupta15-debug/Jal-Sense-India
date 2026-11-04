import { createContext, useContext, useState, useEffect } from 'react';
import { translate } from '../utils/translator.js';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('jalsense_theme') || 'light';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('jalsense_lang') || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('jalsense_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('jalsense_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Global Translator Function
  const t = (phrase) => translate(phrase, language);

  return (
    <UIContext.Provider value={{ theme, toggleTheme, language, setLanguage, t }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}