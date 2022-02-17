import Call from "./components/CallView/Call";
import "./App.css";
import AllComponents from "./components/AllComponents";
//import CallView from "./components/CallView/CallView";
import "./components/AllComponents.scss";
import "normalize.css"
import AppointmentView from "./components/AppointmentView/AppointmentView"
import AppRouter from './routers/AppRouter';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import NavBar from "./components/NavBar";

function App() {
  return (
  <AppRouter />
  );
}
export default App;
