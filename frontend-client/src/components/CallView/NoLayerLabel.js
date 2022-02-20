//This is the grey/black rounded labels used for users name layered ontop of video as well as 'Translation Log' (we may need to change that name)

function Label (props) {
  return (
    // passing it either the name of self or other OR 'Translation Log' 
    <div className="no-layer-label">{props.text}</div>
  );
}
export default Label;