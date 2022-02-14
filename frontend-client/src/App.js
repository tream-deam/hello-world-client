import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
const { connect, createLocalVideoTrack, createLocalAudioTrack } = require('twilio-video');

function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        const token = response.data;
        setTest(response.data);
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
          const divContainer = document.getElementById('video-feeds');
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
            divContainer.appendChild(videoElement)
          })
          .catch(err => console.error(err));

          getAudioTrack()
          .then(audioTrack => {
            const audioElement = audioTrack.attach();
            divContainer.appendChild(audioElement);
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
    <div>
      <h1>test data from backend: {test} </h1>
      <div id="video-feeds">
      </div>
    </div>
  );
}
export default App;
