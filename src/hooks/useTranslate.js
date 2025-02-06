import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const translationCache = {}; // Cache translations

export const useTranslate = (text) => {
  const { i18n } = useTranslation(); // Get selected language
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    const targetLang = i18n.language;
    if (!text || targetLang === "en") {
      setTranslatedText(text); // No translation needed for English
      return;
    }

    const cacheKey = `${text}-${targetLang}`;
    if (translationCache[cacheKey]) {
      setTranslatedText(translationCache[cacheKey]); // Use cached translation
      return;
    }

    // Use Google Translate's public endpoint
    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          const translated = data[0].map((t) => t[0]).join("");
          translationCache[cacheKey] = translated;
          setTranslatedText(translated);
        }
      })
      .catch((error) => {
        console.error("❌ Translation error:", error);
        setTranslatedText(text); // Fallback to original text
      });
  }, [text, i18n.language]);

  return translatedText;
};
