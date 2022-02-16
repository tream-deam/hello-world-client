import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentSlash
} from "@fortawesome/free-solid-svg-icons";



function ConvoLog (props) {
  return (
      <div className="convo-log">
        <Label/> <h1> Transcription Log:</h1>
        <p> Comment vous sentez-vous aujourd'hui</p>
        <p> Je me sens très malade. Je continue d'avoir des migraines.</p>
     {/*   need to find language icon <FontAwesomeIcon icon="fa-solid fa-language" /> */}
      <FontAwesomeIcon
          className="nav-icon"
          icon={faCommentSlash}
          size="2x"
        />
      </div>
  );
}
export default ConvoLog;