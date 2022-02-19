import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CallEnd, Translate } from '@mui/icons-material';
import {
  faVolumeHigh,
  faMicrophoneSlash,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

export default function VideoPanel() {
  return (
    <>
      <button className="call-button" id="volume"><FontAwesomeIcon icon={faVolumeHigh} /></button>
      <button className="call-button" id="mic-toggle"><FontAwesomeIcon icon={faMicrophoneSlash}/></button>
      <button className="call-button" id="call-toggle"><CallEnd sx={{ fontSize: 40 }}/></button>
      <button className="call-button" id="video-toggle"><FontAwesomeIcon icon={faVideo}/></button>
      <button className="call-button" id="translate"><Translate fontSize="large"/></button>
    </>
  );
}
