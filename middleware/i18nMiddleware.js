// Simple language middleware
const messages = {
  en: {
    unauthorized: "Not authorized",
    forbidden: "Access denied",
  },
  fr: {
    unauthorized: "Non autorisé",
    forbidden: "Accès refusé",
  },
};

const i18nMiddleware = (req, res, next) => {
  const lang = req.headers["accept-language"] || "en";
  req.t = (key) => {
    return messages[lang] && messages[lang][key]
      ? messages[lang][key]
      : messages["en"][key] || key;
  };
  next();
};

export default i18nMiddleware;
