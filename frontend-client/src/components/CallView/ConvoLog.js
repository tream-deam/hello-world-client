// import Label from "./Label";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import TranslateIcon from '@material-ui/icons/Translate';
import Transcription from "../../Transcription";


function ConvoLog (props) {
  return (
      <div className="convo-log">
        {/* <Label text="Translation Log"/>  */}
        {/* <Transcription/> */}
        <TranslateIcon className="nav-icon"/>
   {/*        <FontAwesomeIcon
              className="nav-icon translate"
              icon={faCommentSlash}
              size="2x"
            /> */}
      </div>
  );
}
export default ConvoLog;