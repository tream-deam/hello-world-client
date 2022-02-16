import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const TranscriptionBroadcast = (props) => {
  
  // console.log(props.participantTranscription.msg);
  return (
    <div>
      <h1>TranscriptionBroadcast</h1>
      {props.participantTranscription.msg}

    </div>
  )
}

export default TranscriptionBroadcast