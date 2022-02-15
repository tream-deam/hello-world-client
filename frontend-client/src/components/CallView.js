import NavBar from "./NavBar";


function CallView(props) {
  return (
    <div className="call-view">
      <NavBar/>
      <div className="other-video">blah</div>
      <div className="self-video-log">
          <div className="self-video-container"></div>
          <div className="convo-log"></div>
      </div>
    </div>
  );
}
export default CallView;
