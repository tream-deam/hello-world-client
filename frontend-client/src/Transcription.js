import React, { useEffect, useState } from "react";
import { useTranslation, useTranslationUpdate } from './providers/TranslationContext';
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash,faComment } from "@fortawesome/free-solid-svg-icons";
import Label from './components/CallView/Label';
import { useCoparticipant, useCoparticipantUpdate } from './providers/CoparticipantContext';
import { useName } from './providers/UsernameProvider';


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
      lang: 'en-US',
      interimResults: true // allows for displaying real-time speech results
    }
  });

  // Take the socket we initialize in page load useEffect and store it in state so we can reuse it in different useEffects
  const [socketState, setSocketState] = useState("");
  // Store interim results that come from socket listener 'interimListen' into state so that they can be displayed
  const [stateInterim, setStateInterim] = useState([]);
  // Store transcription results that come from socket listener 'transcriptionFinish' into state so that they can be displayed
  const [transcriptionResults, setTranscriptionResults] = useState([]);

  const userName = useName();
  const setCoparticipant = useCoparticipantUpdate();
  const coparticipant = useCoparticipant();
  // console.log(coparticipant);
  
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

    // Real time transcription (incoming)
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

    socket.on("disconnected_user", (msg) => {
      console.log('user disconnected:', msg);
    })
    
    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });
    
    // Ensures we disconnect to avoid memory leaks
    return () => socket.disconnect();
  }, []);
  
  useEffect(() => {
    const socket = socketState;
    
    if (socket) {
      socket.emit("sendName", userName);
      
      socket.on("receiveNameInClient", (users) => {
        console.log(users); //object all users from beginning of server time
        if (users.user2 !== userName) {
          // there's a 2nd user and 2nd user is not me (im 1st user)
          setCoparticipant(users.user2);
        } else if (users.user1 !== userName) {
          // 1st user is not me!
          setCoparticipant(users.user1);
        }
        // setCoparticipant(users[users.length-1]);
        // filter thru array, keep that don't name own user name, take name either immediately before or after to coparticipant
      });
    }
  }, [socketState, userName, setCoparticipant]);
  
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
        to: "es",
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_MICROSOFT_API_KEY}`,
      },
      data: [
        {
          Text: stateInterim.msg ? stateInterim.msg : " ",
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
  }, [updateTranslation, stateInterim.msg]);

  if (error) {
    return <p> Web Speech API is not available in this browser :( </p>;
  }
  
  const remoteTranscriptions = transcriptionResults.map((result, idx) => {
    return <li key={idx}>{result.msg}</li>;
  });

  return (
      <div className="convo-log">
        {stateInterim.msg}
        <div className="log-header">
          <Label text="Translation Log"/> 
          <button className="convo-log-toggle" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          
            {isRecording ?  
              <FontAwesomeIcon
              className="translate"
              icon={faComment}
              size="2x"
              />
              :     
              <FontAwesomeIcon
              className="translate"
              icon={faCommentSlash}
              size="2x"
              />}
          </button>
        </div>
        <div id="transcription">
          {translation && <li>{translation}</li>}
          {interimResult && <li>{interimResult}</li>}
          {results && <h2>My Transcription log:</h2>}
          {results.map((result) => {
            return <li key={result.timestamp}> {result.transcript}</li>;
          })}
          <h1>Remote Transcription Log</h1>
          {remoteTranscriptions}
        </div>
      </div>
  );
};

export default Transcription;
