import Video from "../../Video";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from '../../providers/TranslationContext';
import Transcription from "../../Transcription";
import NavBar from "../NavBar";
import VideoPanel from "./VideoPanel";
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
    userDisconnectHandler: () => {},
    selfDisconnect: null,
    remoteDisconnect: null,
  });

  // Translation state and updater from context
  const translation = useTranslation();

  // make initial userName state random. for demo purposes 
  // const [userName, setUserName] = useState("s");
  // const [roomState, setRoomState] = useState({});
  // const [remoteParticipant, setRemoteParticipant] = useState(null);

  useEffect(() => {
    // so that every client that enters a room is unique
    const timestamp = Date.now();

    axios
      .get(`/token/${timestamp}`)
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
            // setRoomState(room);
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
                console.log({track})
                // depending on incoming track type (video or audio)
                // store them in variables
                if (track.kind === 'video') {
                  const videoTrack = track.attach();
                  setState((prevState) => ({
                      ...prevState,
                      remoteVideo: videoTrack
                  }))
                } else if (track.kind === 'audio') {
                  const audioTrack = track.attach();
                  setState((prevState) => ({
                    ...prevState,
                    remoteAudio: audioTrack
                  }))
                }
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
                    remoteVideo: videoTrack,
                  }));
                }
              });
            });

            const userDisconnectHandler = (e) => {
              e.preventDefault()
              console.log('user disconnected!')
              room.disconnect();
            };

            setState(prev => ({...prev, userDisconnectHandler: userDisconnectHandler}))

            room.on('disconnected', room => {
              console.log('you disconnected!');
              room.localParticipant.tracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
              })

              const selfVideoContainerElements =
              document.getElementById("self-video").children;

              for (let element of selfVideoContainerElements) {
                document.getElementById("self-video").removeChild(element);
              }

              console.log('removed your tracks!');
              setState(prev => ({ ...prev, selfVideo: null }));
            })

            // listen for when remote participant disconnects
            room.on('participantDisconnected', participant => {
              const remoteVideoContainerElements =
                document.getElementById("other-video").children;

              for (let element of remoteVideoContainerElements) {
                document.getElementById("other-video").removeChild(element);
              }
              setState(prev => ({ ...prev, remoteVideo: null }));
            })
          },
          (error) => {
            console.log(token);
            console.error(`Unable to connect to Room: ${error.message}`);
          }
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const videoPlaceholder = <div className="video placeholder"></div>;
  const otherVideoPlaceholder = <div className="video placeholder"></div>;
  const transcriptPlaceholder = <div className="convo-log placeholder"></div>;

  return (
    <div className="call-view">
      <NavBar />
      <section className="call-view-container">
        <div id="videos">
          <div className="other-video-container">
            {state.remoteVideo ? (
              <>
                <Video
                  id="other-video"
                  videoFeed={state.remoteVideo}
                  audioFeed={state.remoteAudio}
                />
                <div id="video-panel">
                  <VideoPanel userDisconnectHandler={state.userDisconnectHandler}/>
                  <p className="caption">{translation}</p>
                </div>
              </>
            ) : (
              <>
                { otherVideoPlaceholder } 
                <div id="video-panel">
                <VideoPanel userDisconnectHandler={state.userDisconnectHandler}/>
                <p className="caption">{translation}</p>
                </div>
              </>
            )}
          </div>
          <section className="self-video-log-panel">
            {state.selfVideo ? (
              <>
                <div className="self-video-container">
                  <Video
                    id="self-video"
                    videoFeed={state.selfVideo}
                    audioFeed={state.selfAudio}
                    selfDisconnect={state.selfDisconnect}
                    remoteDisconnect={state.remoteDisconnect}
                  />
                </div>
                  <Transcription />
              </>
            ) : (
              <>
                <div className="self-video-container">{videoPlaceholder}</div>
                {transcriptPlaceholder}
              </>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
