/* import Label from "./components/CallView/Label"; */
import { useEffect } from "react";
/* import { useName } from './providers/UsernameProvider';  */

export default function Video(props) {
  const { id, videoFeed, audioFeed } = props;
/*   const name = useName();  */
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
  


  return (
    <div id={id}>
   {/*    <Label text={name}/> */}
    </div>
  );
}
