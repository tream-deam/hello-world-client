import NavBar from "../NavBar";
import ConvoLog from "./ConvoLog";
import OtherVideo from "./OtherVideo";
import SelfVideo from "./SelfVideo";
import Call from "./Call";


function CallView(props) {
  return (
    <div className="call-view">
      <NavBar/>
      <OtherVideo/>
      <section className= "self-video-log-panel"> 
        <ConvoLog/>
        <SelfVideo/>
      </section>
    </div>

  );
}
export default CallView;
