import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";

export default function VideoPanel() {
  return (
    <div id="video-panel">
      <Button className="call-button" id="volume" content={<FontAwesomeIcon icon="fa-solid fa-volume-high" />} />
      <Button className="call-button" id="mic-toggle" default={<FontAwesomeIcon icon="fa-solid fa-microphone-slash" />} />
      <Button className="call-button" id="call-toggle" content={<FontAwesomeIcon icon="fa-solid fa-phone-hangup" />} />
      <Button className="call-button" id="video-toggle" content={<FontAwesomeIcon icon="fa-solid fa-video" />} />
      <Button className="call-button" id="translate" content={<FontAwesomeIcon icon="fa-solid fa-language" />} />
    </div>
  );
}
