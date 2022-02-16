import { useEffect, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';
import Transcription from './Transcription';

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
  
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        to: "es",
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": "538c8b93a1mshaefebc3f9e0d00ap14b70ejsn49bf6990464e",
      },
      data: [
        {
          Text: interimResult ? interimResult : " ",
        },
      ],
    };

    axios
      .request(options)
      .then((res) => {
        const result = res.data[0].translations[0].text;
        console.log('original: ' + JSON.parse(res.config.data)[0].Text)
        setTranslation(result)
      })
      .catch((error) => console.error(error));
  }, [interimResult])
  
  if (error) return <p>Web Speech API is not available in this browser :(</p>

  return (
    <div id={id}>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Transcribing' : 'Start Transcribing'}
      </button>
      {translation && <li>{translation}</li>}
      <Transcription />
    </div>
  );
}
