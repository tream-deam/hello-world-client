//This is the grey/black rounded labels used for users name layered ontop of video as well as 'Translation Log' (we may need to change that name)
import classNames from 'classnames'

function Label (props) {
  const labelClass = classNames("label", {
    "label__other": props.otherVid,
  });

  return (
    // passing it either the name of self or other OR 'Translation Log' 
    <div className={labelClass}>{props.text}</div>
  );
}
export default Label;