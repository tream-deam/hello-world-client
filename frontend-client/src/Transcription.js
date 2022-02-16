import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";

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
  });

  // Take the socket we initialize in page load useEffect and store it in state so we can reuse it in different useEffects
  const [socketState, setSocketState] = useState("");
  // Store interim results that come from socket listener 'interimListen' into state so that they can be displayed
  const [stateInterim, setStateInterim] = useState([]);
  // Store transcription results that come from socket listener 'transcriptionFinish' into state so that they can be displayed
  const [transcriptionResults, setTranscriptionResults] = useState([]);

  // Initialize socket and listeners to respond to whatever is emitted from the server
  useEffect(() => {
    // After initializing socket, save to state to be reused elsewhere
    const socket = io("https://hello-doc-lhl.herokuapp.com");
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
    const lastResult = results.slice(-1);

    // This condition prevents transcript from trying to read properties of undefined when there aren't any results
    if (lastResult[0]) {
      socket.emit("transcriptionFinish", { msg: lastResult[0].transcript });
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
