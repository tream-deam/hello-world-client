import getSourceLanguages from "./helpers/getSourceLanguages";

export function Dropdown() {
  const languages = getSourceLanguages();
  const options = languages.map((language) => {
    const languageNameAndRegion = `${language.language} (${language.region})`;
    return (
      <option value={language["language-code"]}>{languageNameAndRegion}</option>
    );
  });

  return (
    <>
      <label for="languages"></label>
      <select name="languages" id="languages">
        {options}
      </select>
    </>
  );
}
