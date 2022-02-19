import React, { useEffect, useState } from 'react';
import { useTranslation, useTranslationUpdate } from './providers/TranslationContext';
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";

const Transcription = () => {
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
    speechRecognitionProperties: {
      lang: 'es-CO',
      interimResults: true // allows for displaying real-time speech results
    }
  });

  // Take the socket we initialize in page load useEffect and store it in state so we can reuse it in different useEffects
  const [socketState, setSocketState] = useState("");
  // Store interim results that come from socket listener 'interimListen' into state so that they can be displayed
  const [stateInterim, setStateInterim] = useState([]);
  // Store transcription results that come from socket listener 'transcriptionFinish' into state so that they can be displayed
  const [transcriptionResults, setTranscriptionResults] = useState([]);

  // Translation state and updater from context
  const translation = useTranslation();
  const updateTranslation = useTranslationUpdate();

  // Initialize socket and listeners to respond to whatever is emitted from the server
  useEffect(() => {
    // check if in development or production so appropriate socket url is used
    const socketURL = process.env.NODE_ENV === "development" ? "/" : "https://hello-doc-lhl.herokuapp.com";

    // After initializing socket, save to state to be reused elsewhere
    const socket = io(socketURL);
    setSocketState(socket);

    socket.on("connect", () => {
      console.log("Connected to socket!");
    });

    // Real time transcription
    socket.on("interimListen", (msg) => {
      setStateInterim(msg);
    });

    // Transcription after a sentence is finished
    socket.on("transcriptionFinish", (msg) => {
      setTranscriptionResults((prevTranscriptionResults) => [
        ...prevTranscriptionResults,
        msg,
      ]);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });

    // Ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);

  // Whenever a new sentence is transcribed, send it to other client. Only grab the most recent (last) sentence/result
  useEffect(() => {
    const socket = socketState;
    const lastResult = results[results.length - 1];

    // This condition prevents transcript from trying to read properties of undefined when there aren't any results
    if (lastResult) {
      socket.emit("transcriptionFinish", { msg: lastResult.transcript });
    }
  }, [socketState, results]);

  // Whenever the interim updates, send data to other client so they can see live transcription as well
  useEffect(() => {
    const socket = socketState;

    // This condition prevents the emit method being ran on an undefined object (before socket is initialized)
    if (socket) {
      socket.emit("interimListen", { msg: interimResult });
    }
  }, [socketState, interimResult]);

  // Translation
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        to: "en",
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
        // use context to update translation instead of setTranslation
        updateTranslation(result);
      })
      .catch((error) => console.error(error));
  }, [interimResult, updateTranslation]);

  if (error) {
    return <p> Web Speech API is not available in this browser :( </p>;
  }
  
  const remoteTranscriptions = transcriptionResults.map((result, idx) => {
    return <li key={idx}>{result.msg}</li>;
  });

  return (
      <div>
        {stateInterim.msg}
        <h1>Remote Transcription Log</h1>
        {remoteTranscriptions}

        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop Transcribing" : "Start Transcribing"}
        </button>

        <div id="transcription">
          {translation && <li>{translation}</li>}
          {interimResult && <li>{interimResult}</li>}
          {results && <h2>My Transcription log:</h2>}
          {results.map((result) => {
            return <li key={result.timestamp}> {result.transcript}</li>;
          })}
        </div>
      </div>
  );
};

export default Transcription;
