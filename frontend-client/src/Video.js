import { Label } from "@mui/icons-material";
import { useEffect } from "react";
import { useName } from './providers/UsernameProvider';

export default function Video(props) {
  const { id, videoFeed, audioFeed, selfDisconnect } = props;
  const name = useName();
  useEffect(() => {
    // if user's webcam is streaming video
    if (videoFeed) {
      document.getElementById(id).appendChild(videoFeed).classList.add(`${id}--element`, 'video');
    }
    // if user's mic is streaming audio
    if (audioFeed) {
      document.getElementById(id).appendChild(audioFeed);
    }
  }, [id, videoFeed, audioFeed]);

  useEffect(() => {
    if (selfDisconnect) {
      const selfVideoNode = document.getElementsByClassName(`self-video--element`)[0]
      console.log({selfVideoNode})
      document.getElementById(id).removeChild(selfVideoNode);
    }
  }, [id, selfDisconnect]);
  


  return (
    <div id={id}>
      <Label text={name} />
    </div>
  );
}
