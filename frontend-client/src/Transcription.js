import React, { useEffect, useState } from "react";
import { useTranslation, useTranslationUpdate } from './providers/TranslationContext';
import io from "socket.io-client";
import useSpeechToText from "react-hook-speech-to-text";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSlash,faComment } from "@fortawesome/free-solid-svg-icons";
import { useCoparticipant, useCoparticipantUpdate } from './providers/CoparticipantContext';
import { useName } from './providers/UsernameProvider';
import NoLayerLabel from './components/CallView/NoLayerLabel';
import { useLanguage } from './providers/LanguageContext';
import TranscriptMessage from "./components/TranscriptMessage";


const Transcription = () => {
  const userSpokenLanguageCode = useLanguage();
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
      lang: userSpokenLanguageCode,
      interimResults: true // allows for displaying real-time speech results
    }
  });

  // Take the socket we initialize in page load useEffect and store it in state so we can reuse it in different useEffects
  const [socketState, setSocketState] = useState("");
  // Store interim results that come from socket listener 'interimListen' into state so that they can be displayed
  const [stateInterim, setStateInterim] = useState([]);
  // Store transcription results that come from socket listener 'transcriptionFinish' into state so that they can be displayed
  const [transcriptionResults, setTranscriptionResults] = useState([]);

  // store all transcribed messages (from self and other)
  const [transcript, setTranscript] = useState([]);

  const userName = useName();
  const setCoparticipant = useCoparticipantUpdate();
  const coparticipant = useCoparticipant();
  
  // Translation state and updater from context
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

    socket.on("connected_user", (roomCount) => {
      console.log(roomCount);
    })

    // Real time transcription (incoming)
    socket.on("interimListen", (msg) => {
      setStateInterim(msg);
    });

    // Transcription after a sentence is finished
    socket.on("transcriptionFinish", (msg) => {
      console.log('incoming message: ', msg)
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
  
  useEffect(() => {
    const socket = socketState;
    
    if (socket) {
      socket.emit("sendName", userName);
      
      socket.on("receiveNameInClient", (users) => {
        console.log(users); //object
        // set other user to coparticipant. Only accomodates 2 people as intended
        for (let user in users) {
          if (Object.keys(users).length <= 2 && users[user] !== userName) {
            setCoparticipant(users[user]);
          }
        }
      });

      socket.on("disconnected_user", (msg) => {
        // log user who left and room count
        console.log('user disconnected: ', msg);

        // only set coparticipant to null if the existing co-participant leaves
        if (msg.user === coparticipant) {
          setCoparticipant(null);
        }
      });
    }
  }, [socketState, userName, setCoparticipant, coparticipant]);
  
  // Whenever a new sentence is transcribed, send it to other client. Only grab the most recent (last) sentence/result
  useEffect(() => {
    const socket = socketState;
    const lastResult = results[results.length - 1];

    // This condition prevents transcript from trying to read properties of undefined when there aren't any results
    if (lastResult) {
      socket.emit("transcriptionFinish", { user: userName, msg: lastResult.transcript });
    }
  }, [socketState, results, userName]);

  // Whenever the interim updates, send data to other client so they can see live transcription as well
  useEffect(() => {
    const socket = socketState;

    // This condition prevents the emit method being ran on an undefined object (before socket is initialized)
    if (socket) {
      socket.emit("interimListen", { msg: interimResult });
    }
  }, [socketState, interimResult]);

  // whenever (self) transcripts or (other) transcripts change, update transcript array
  // by adding the new message to the transcript state

  useEffect(() => {
    // if there is at least one new transcribed message from self
    if (results.length > 0) {
      const newestTranscriptionFromSelf = results[results.length - 1];
      const newMessage = {
        userName,
        message: newestTranscriptionFromSelf.transcript,
        timestamp: newestTranscriptionFromSelf.timestamp
      };
      if (newestTranscriptionFromSelf) {
        setTranscript((prev) => [...prev, newMessage]);
      }
    }
  }, [results, userName]);

  useEffect(() => {
    // if there is at least one new transcribed message from other participant
    if (transcriptionResults.length > 0) {
      const newestTranscriptionFromOther = transcriptionResults[transcriptionResults.length - 1];
      const newMessage = {
        userName: newestTranscriptionFromOther.user,
        message: newestTranscriptionFromOther.msg,
        timestamp: newestTranscriptionFromOther.timestamp
      };
      if (newestTranscriptionFromOther) {
        setTranscript((prev) => [...prev, newMessage]);
      }
    }
  }, [transcriptionResults, userName]);

  // Translation
  useEffect(() => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        to: userSpokenLanguageCode,
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
  }, [updateTranslation, stateInterim.msg, userSpokenLanguageCode]);

  if (error) {
    return <p> Web Speech API is not available in this browser :( </p>;
  }

  const transcriptElements = transcript.map(messageObj => {
    const { userName, message, timestamp } = messageObj; 
    return <TranscriptMessage key={timestamp} sender={userName} message={message} />
  });

  return (
      <div className="convo-log">
        {stateInterim.msg}
        <div className="log-header">
          <NoLayerLabel text="Translation Log"/> 
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
          {transcriptElements}
        </div>
      </div>
  );
};

export default Transcription;
