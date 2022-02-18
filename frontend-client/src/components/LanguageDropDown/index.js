export function Dropdown(props) {
  const { label, type } = props;
  const languages = type === 'source-language' ? getSourceLanguages() : getTargetLanguages();
  return (
    <form>
      <label for="languages">{label}</label>
      {options}
    </form>
  )
}