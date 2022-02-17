import { useEffect } from "react";

export default function Video(props) {
  const { id, videoFeed, audioFeed } = props;
  useEffect(() => {
    // if user's webcam is streaming video
    if (videoFeed) {
      document.getElementById(id).appendChild(videoFeed).classList.add(`${id}--element`);
    }
    // if user's mic is streaming audio
    if (audioFeed) {
      document.getElementById(id).appendChild(audioFeed);
    }
  }, [id, videoFeed, audioFeed]);
  


  return (
    <div id={id}>
    </div>
  );
}
