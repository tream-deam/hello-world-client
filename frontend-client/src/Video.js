import { useEffect, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';
import TranscriptionBroadcast from './TranscriptionBroadcast';
import io from 'socket.io-client';

export default function Video(props) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  
  const [socketState, setSocketState] = useState("");
  const [transcriptions, setTranscriptions] = useState([]);
  const [stateInterim, setStateInterim] = useState([]);
  const [transcriptionResults, setTranscriptionResults] = useState([]);

  useEffect(() => {
    console.log("testing socket");
    const socket = io('/');
    setSocketState(socket);

    socket.on('connect', () => {
      console.log("connected!");
    });

    socket.on('transcriptionFinish', (msg) => {
      console.log(msg);
      setTranscriptionResults(msg);
    });
    
    socket.on('disconnect', () => {
      console.log("user disconnected!");
    });
    
    // ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const socket = socketState;

    const lastResult = results.slice(-1);
    console.log(lastResult[0]);
    if (lastResult[0]) {
      socket.emit('transcriptionFinish', {msg: lastResult[0].transcript} )
    }
  }, [socketState, results])
  
  // useEffect(() => {
  //   const socket = socketState;
  //   setStateInterim(interimResult)
  //   socket.emit('transcriptionFinish', {msg: interimResult} )
    
  // }, [interimResult])



  
  

  const { id, videoFeed, audioFeed } = props;
  useEffect(() => {
    // if user's webcam is streaming video
    if (videoFeed) {
      document.getElementById(id).appendChild(videoFeed);
    }
    // if user's mic is streaming audio
    if (audioFeed) {
      document.getElementById(id).appendChild(audioFeed);
    }
  }, [id, videoFeed, audioFeed]);
  
  if (error) return <p>Web Speech API is not available in this browser :(</p>

  return (
    <div id={id}>
       <TranscriptionBroadcast participantTranscription={transcriptionResults}/>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Transcribing' : 'Start Transcribing'}
      </button>
      <div id="transcription">
        {interimResult && <li>{interimResult}</li>}
        {results && <h2>Transcription log:</h2>}
        {results.map((result) => {
          return <li key={result.timestamp}> {result.transcript}</li>
        })}
      </div>
    </div>
  );
}
