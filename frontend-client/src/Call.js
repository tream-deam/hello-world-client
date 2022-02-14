import Video from './Video';
import axios from 'axios';
import { useState, useEffect } from "react";
const { connect, createLocalVideoTrack, createLocalAudioTrack } = require('twilio-video');

export default function Call() {
  const [state, setState] = useState({
    selfVideo: null,
    selfAudio: null,
  })

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        const token = response.data;
        return token;
      })
      .then(token => {
        connect(token, { 
          name: 'dream-team',
          audio: true,
          video: { width: 640 }
        })
        .then(room => {
          console.log(`Successfully joined a Room: ${room}`);
          const getVideoTrack = async () => {
            const videoTrack = await createLocalVideoTrack();
            return videoTrack;
          };
          const getAudioTrack = async () => {
            const audioTrack = await createLocalAudioTrack();
            return audioTrack;
          };

          getVideoTrack()
          .then((videoTrack) => {
            const videoElement = videoTrack.attach();
            setState({ ...state, selfVideo: videoElement})
          })
          .catch(err => console.error(err));
          
          getAudioTrack()
          .then(audioTrack => {
            const audioElement = audioTrack.attach();
            setState({ ...state, selfAudio: audioElement});
          })
          .catch(err => console.error(err));

          room.on('participantConnected', participant => {
            console.log(`A remote Participant connected: ${participant}`);
          });
        }, error => {
          console.error(`Unable to connect to Room: ${error.message}`);
        });
      })
      .catch((err) => console.log(err));
    
  }, []);

  return (
    <div id="video-container">
    <Video id="self-video" videoFeed={state.selfVideo} audioFeed={state.selfAudio} />
    </div>
  )
}