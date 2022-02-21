import classNames from 'classnames';
import React from 'react';
import { useCoparticipant } from '../providers/CoparticipantContext';
import { useName } from '../providers/UsernameProvider';

export default function TranscriptMessage(props) {
  const { sender, message } = props;
  const userName = useName();
  const coparticipant = useCoparticipant();

  const messageClass = classNames('message', {
    'self-message': userName === sender,
    'other-message': userName === coparticipant
  })
  return (
    <div className={messageClass}>
      <p className="name">{sender}</p>
      <p className="message-text">{message}</p>
    </div>
  )
}