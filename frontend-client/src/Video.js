import { useEffect, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';

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

  const [translation, setTranslation] = useState("");

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
