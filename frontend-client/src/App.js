//import Call from "./Call";
import "./App.css";
import AllComponents from "./components/AllComponents";
import CallView from "./components/CallView/CallView";
import "./components/AllComponents.scss";
import "normalize.css"

function App() {
  return (
    <div>
 {/*      <Call /> */}
      {/* Conditional rendering if logged in*/}

      <CallView/>
      <AllComponents/>
    </div>
  );
}
export default App;
