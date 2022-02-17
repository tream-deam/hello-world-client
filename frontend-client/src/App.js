import Call from "./components/CallView/Call";
import "./App.css";
import AllComponents from "./components/AllComponents";
//import CallView from "./components/CallView/CallView";
import "./components/AllComponents.scss";
import "normalize.css"
import AppointmentView from "./components/AppointmentView/AppointmentView"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Call />
      {/* Conditional rendering if logged in*/}

   {/*    <CallView/> */}
      {/* <AllComponents/>
      <AppointmentView/> */}
    </>
  );
}
export default App;
