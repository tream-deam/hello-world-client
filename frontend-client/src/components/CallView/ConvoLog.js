// import Label from "./Label";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import TranslateIcon from '@material-ui/icons/Translate';
import Transcription from "../../Transcription";


function ConvoLog (props) {
  return (
<<<<<<< HEAD
      <div className="">
        <Label/> <h1> Transcription Log:</h1>
        <p> Comment vous sentez-vous aujourd'hui</p>
        <p> Je me sens très malade. Je continue d'avoir des migraines.</p>
     <TranslateIcon className="nav-icon"/>
      <FontAwesomeIcon
          className="nav-icon"
          icon={faCommentSlash}
          size="2x"
        />
=======
      <div className="convo-log">
        {/* <Label text="Translation Log"/>  */}
        {/* <Transcription/> */}
        <TranslateIcon className="nav-icon"/>
   {/*        <FontAwesomeIcon
              className="nav-icon translate"
              icon={faCommentSlash}
              size="2x"
            /> */}
>>>>>>> main
      </div>
  );
}
export default ConvoLog;