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

  const endCallButtonClass = classNames('call-button', {
    'show-end-call': !coparticipant
  });

  return (
    <>
      <button className={endCallButtonClass} id="volume"><FontAwesomeIcon icon={faVolumeHigh} /></button>
      <button className={endCallButtonClass} id="mic-toggle"><FontAwesomeIcon icon={faMicrophoneSlash}/></button>
      <button className={endCallButtonClass} id="call-toggle"><CallEnd sx={{ fontSize: 40 }} onClick={userDisconnectHandler}/></button>
      <button className={endCallButtonClass} id="video-toggle"><FontAwesomeIcon icon={faVideo}/></button>
      <button className={endCallButtonClass} id="translate"><Translate fontSize="large"/></button>
    </>
  );
}
