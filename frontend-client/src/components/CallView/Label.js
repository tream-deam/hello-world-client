
function Label (props) {
  return (
    // passing it either the name of self or other OR 'Translation Log' 
    <div className="label">{props.children}</div>
  );
}
export default Label;