import Video from "../../Video";
import axios from "axios";
import { useState, useEffect } from "react";
import Transcription from "../../Transcription";
import NavBar from "../NavBar";
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
    remoteAudio: null,
  });

  const [userName, setUserName] = useState("");
  const [roomState, setRoomState] = useState({});
  // const [remoteParticipant, setRemoteParticipant] = useState(null);

  useEffect(() => {
    // console.log(roomState.participants);
  }, [roomState]);

  const videoPlaceholder = <div className="video placeholder"></div>;
  const otherVideoPlaceholder = <div className="video placeholder"></div>;
  const transcriptPlaceholder = <div className="transcript-placeholder"></div>

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
                setState((prevState) => ({
                  ...prevState,
                  selfVideo: videoElement,
                }));
              })
              .catch((err) => console.error(err));

            getAudioTrack()
              .then((audioTrack) => {
                const audioElement = audioTrack.attach();
                setState((prevState) => ({
                  ...prevState,
                  selfAudio: audioElement,
                }));
              })
              .catch((err) => console.error(err));

            room.on("participantConnected", (participant) => {
              console.log(`A remote Participant connected: ${participant}`);
              // setRemoteParticipant(participant);

              // if participant has already published any content that is subscribed to in room
              participant.tracks.forEach((publication) => {
                if (publication.isSubscribed) {
                  const track = publication.track;
                  track.attach();
                  setState((prevState) => ({
                    ...prevState,
                    remoteVideo: track,
                  }));
                }
              });

              // add remote participant user media that will eventually be streamed
              participant.on("trackSubscribed", (track) => {
                // depending on incoming track type (video or audio)
                // store them in variables
                const videoTrack =
                  track.kind === "video" ? track.attach() : null;
                const audioTrack =
                  track.kind === "audio" ? track.attach() : null;
                // add remote video and audio to state
                setState((prevState) => ({
                  ...prevState,
                  remoteVideo: videoTrack,
                  remoteAudio: audioTrack,
                }));
              });
            });

            // for all participants already in call, attach their remote tracks to DOM
            room.participants.forEach((participant) => {
              // the following commented out code was in twilio tutorial but the app
              // works as expected with it commented out so it may not be necessary

              // add remote participants tracks that are already subscribed to
              // participant.tracks.forEach((publication) => {
              //   if (publication.track && publication.kind === "audio") {
              //     console.log('this ran!')
              //     const audioTrack = publication.track.attach();
              //     setState((prevState) => ({
              //       ...prevState,
              //       remoteAudio: audioTrack,
              //     }));
              //   }
              //   if (publication.track && publication.kind === "video") {
              //     console.log('this ran!')
              //     const videoTrack = publication.track.attach();
              //     setState((prevState) => ({
              //       ...prevState,
              //       remoteAudio: videoTrack,
              //     }));
              //   }
              // });

              participant.on("trackSubscribed", (track) => {
                if (track.kind === "audio") {
                  const audioTrack = track.attach();
                  setState((prevState) => ({
                    ...prevState,
                    remoteAudio: audioTrack,
                  }));
                }
                if (track.kind === "video") {
                  const videoTrack = track.attach();
                  setState((prevState) => ({
                    ...prevState,
                    remoteAudio: videoTrack,
                  }));
                }
              });
            });
          },
          (error) => {
            console.log(token);
            console.error(`Unable to connect to Room: ${error.message}`);
          }
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="call-view">
      <NavBar />
      {/* <form onSubmit={joinRoom}>
        Enter Your Name:
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button>Join Room</button>
      </form> */}
      <div id="videos">
        {state.remoteVideo ? (
          <div className="other-video-container">
            <Video
              id="remote-video"
              videoFeed={state.remoteVideo}
              audioFeed={state.remoteAudio}
            />
          </div>
        ) : (
          <div className="other-video-container">{otherVideoPlaceholder}</div>
        )}
        <section className="self-video-log-panel">
          {state.selfVideo ? (
            <>
              <div className="self-video-container">
                <Video
                  id="self-video"
                  videoFeed={state.selfVideo}
                  audioFeed={state.selfAudio}
                />
              </div>
              <Transcription />
            </>
          ) : (
            videoPlaceholder
          )}
        </section>
      </div>
    </div>
  );
}
