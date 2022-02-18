import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CallEnd, Translate } from '@mui/icons-material';
import {
  faVolumeHigh,
  faMicrophoneSlash,
  faVideo,
  faLanguage
} from '@fortawesome/free-solid-svg-icons';
import Button from "../Button";

export default function VideoPanel() {
  return (
    <div id="video-panel">
      <button className="call-button" id="volume"><FontAwesomeIcon icon={faVolumeHigh} /></button>
      <button className="call-button" id="mic-toggle"><FontAwesomeIcon icon={faMicrophoneSlash}/></button>
      <button className="call-button" id="call-toggle"><CallEnd sx={{ fontSize: 40 }}/></button>
      <button className="call-button" id="video-toggle"><FontAwesomeIcon icon={faVideo}/></button>
      <button className="call-button" id="translate"><Translate fontSize="large"/></button>
    </div>
  );
}
