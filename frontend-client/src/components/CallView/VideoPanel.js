import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CallEnd, Translate } from '@mui/icons-material';
import {
  faVolumeHigh,
  faMicrophoneSlash,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useCoparticipant } from '../../providers/CoparticipantContext';


export default function VideoPanel(props) {
  const { userDisconnectHandler } = props;
  const coparticipant = useCoparticipant();

  const videoButtonsClass = classNames('call-button', {
    'show-all-video-buttons': !coparticipant
  });

  return (
    <>
      <button className={videoButtonsClass} id="volume"><FontAwesomeIcon icon={faVolumeHigh} /></button>
      <button className={videoButtonsClass} id="mic-toggle"><FontAwesomeIcon icon={faMicrophoneSlash}/></button>
      <button className={videoButtonsClass} id="call-toggle"><CallEnd sx={{ fontSize: 40 }} onClick={userDisconnectHandler}/></button>
      <button className={videoButtonsClass} id="video-toggle"><FontAwesomeIcon icon={faVideo}/></button>
      <button className={videoButtonsClass} id="translate"><Translate fontSize="large"/></button>
    </>
  );
}
