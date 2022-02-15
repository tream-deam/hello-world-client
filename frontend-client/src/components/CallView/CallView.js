import NavBar from "../NavBar";
import ConvoLog from "./ConvoLog";
import OtherVideo from "./OtherVideo";
import SelfVideo from "./SelfVideo";


function CallView(props) {
  return (
    <div className="call-view">
      <NavBar/>
      <OtherVideo/>
      <div className="self-video-log">
          <ConvoLog/>
          <SelfVideo/>
        </div>
      </div>
  );
}
export default CallView;
