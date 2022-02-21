import classNames from 'classnames';
import React from 'react';
import { useCoparticipant } from '../providers/CoparticipantContext';
import { useName } from '../providers/UsernameProvider';

export default function TranscriptMessage(props) {
  const { sender, message } = props;
  const userName = useName();
  const coparticipant = useCoparticipant();
  console.log('the sender prop: ', sender)
  console.log('the userName global state: ', userName)
  console.log('the coparticipant global state: ', coparticipant)


  const messageClass = classNames('message', {
    'self-message': userName === sender,
    'other-message': userName !== sender // ideally we use coparticipant here but right now its undefined
  })
  return (
    <div className={messageClass}>
      <p className="name">{sender}</p>
      <p className="message-text">{message}</p>
    </div>
  )
}