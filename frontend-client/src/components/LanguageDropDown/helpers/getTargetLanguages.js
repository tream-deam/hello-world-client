import axios from "axios";

export default function getTargetLanguages() {
  const options = {
    method: "GET",
    url: "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
  };

  axios
    .request(options)
    .then((res) => {
      const translatableLanguages = res.data.translation;
      const translatableLanguagesWithCodes = [];

      // make array of objects where each element is:
      // key = language code
      // value = language name (region if included)

      for (const languageCode in translatableLanguages) {
        const languageInfo = {
          "language-code": languageCode,
          language: translatableLanguages[languageCode].name,
        };
        translatableLanguagesWithCodes.push(languageInfo);
      }
      return translatableLanguagesWithCodes;
    })
    .catch((err) => console.log(err));
}
