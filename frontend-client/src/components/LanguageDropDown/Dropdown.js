import getSourceLanguages from "./helpers/getSourceLanguages";

export function Dropdown() {
  const languages = getSourceLanguages();
  const options = languages.map((language) => {
    const languageNameAndRegion = `${language.language} (${language.region})`;
    return (
      <option key={language["language-code"]} value={language["language-code"]}>{languageNameAndRegion}</option>
    );
  });

  return (
    <>
      <label htmlFor="languages"></label>
      <select name="languages" id="languages" class="modal-input">
        {options}
      </select>
    </>
  );
}
