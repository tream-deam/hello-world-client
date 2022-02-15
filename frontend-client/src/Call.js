import Video from "./Video";
import axios from "axios";
import { useState, useEffect } from "react";
const {
  connect,
  createLocalVideoTrack,
  createLocalAudioTrack,
} = require("twilio-video");

export default function Call() {
  const [state, setState] = useState({
    selfVideo: null,
    selfAudio: null,
    remoteVideo: null,
    remoteAudio: null
  });

  const [userName, setUserName] = useState("");
  const [roomState, setRoomState] = useState({});
  // const [remoteParticipant, setRemoteParticipant] = useState(null);
  
  useEffect(() => {
    // console.log(roomState.participants);

  }, [roomState])
  
  
  const joinRoom = (e) => {
    e.preventDefault();
    
    axios
      .get(`/token/${userName}`)
      .then((response) => {
        // console.log(response.data);
        const token = response.data.myToken;
        return token;
      })
      .then((token) => {
        connect(token, {
          name: "dream-team",
          audio: true,
          video: { width: 640 },
        }).then(
          (room) => {
            console.log(`Successfully joined a Room: ${room}`);
            setRoomState(room);
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
                setState((prevState) => ({ ...prevState, selfVideo: videoElement }));
              })
              .catch((err) => console.error(err));
              
              getAudioTrack()
              .then((audioTrack) => {
                const audioElement = audioTrack.attach();
                setState((prevState) => ({ ...prevState, selfAudio: audioElement }));
              })
              .catch((err) => console.error(err));
              
              room.on("participantConnected", (participant) => {
                console.log(`A remote Participant connected: ${participant}`);
                // setRemoteParticipant(participant);

                // if participant has already published any content in room
                participant.tracks.forEach(publication => {
                  if (publication.isSubscribed) {
                    console.log('remote participant already in room!');
                    console.log('track before calling .attach():');
                    const track = publication.track;
                    console.log({track});
                    track.attach();
                    console.log('track after calling .attach():');
                    console.log({track});
                    setState((prevState) => ({ ...prevState, remoteVideo: track }));
                  }
                });

                // add remote participant user media that will eventually be streamed
                participant.on('trackSubscribed', track => {
                  // depending on incoming track type (video or audio)
                  // store them in a variable and attach them to dom
                  const videoTrack = track.kind === 'video' ? track.attach() : null;
                  const audioTrack = track.kind === 'audio' ? track.attach() : null;
                  // add remote video and audio to state
                  setState((prevState) => ({ ...prevState, remoteVideo: videoTrack, remoteAudio: audioTrack }));
                });
              });
              
              // for all participants already in call, attach their remote tracks to DOM
              console.log('room participants: ', room.participants)
              room.participants.forEach(participant => {
                participant.tracks.forEach(publication => {
                  if (publication.track && publication.track.kind === 'audio') {
                    const audioTrack = publication.track.attach();
                    console.log({audioTrack});
                    console.log('found previous participant audio track, adding to DOM!');
                    setState((prevState) => ({ ...prevState, remoteAudio: audioTrack }));
                  }
                  if (publication.track && publication.track.kind === 'video') {
                    const videoTrack = publication.track.attach();
                    console.log({videoTrack});
                    console.log('found previous participant video track, adding to DOM!');
                    setState((prevState) => ({ ...prevState, remoteAudio: videoTrack }));
                }
              });

              participant.on('trackSubscribed', track => {
                if (track.kind === 'audio') {
                  const audioTrack = track.attach();
                  console.log({audioTrack});
                  console.log('in trackSubscribed handler: found previous participant audio track, adding to DOM!');
                  setState((prevState) => ({ ...prevState, remoteAudio: audioTrack }));
                }
                if (track.kind === 'video') {
                  const videoTrack = track.attach();
                  console.log({videoTrack});
                  console.log('in trackSubscribed handler: found previous participant video track, adding to DOM!');
                  setState((prevState) => ({ ...prevState, remoteAudio: videoTrack }));
              }
              });
            });
            },
          (error) => {
            console.log(token)
            console.error(`Unable to connect to Room: ${error.message}`);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="video-container">
      <form onSubmit={joinRoom}>
        Enter Your Name:
        <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <button>Join Room</button>
      </form>
      <Video
        id="self-video"
        videoFeed={state.selfVideo}
        audioFeed={state.selfAudio}
      />
      <Video 
        id="remote-video"
        videoFeed={state.remoteVideo}
        audioFeed={state.remoteAudio}
      />
    </div>
  );
}
