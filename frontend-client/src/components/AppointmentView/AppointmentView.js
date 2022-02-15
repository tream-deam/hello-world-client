import NavBar from "../NavBar";
import AppointmentList from "./AppointmentList";
import AppointmentHeader from "./AppointmentHeader";


function AppointmentView(props) {
  return (
    <div className="appt-view">
      <NavBar/>
      <div className="appt-section">
        <AppointmentHeader/>
        <AppointmentList/>
      </div>
    </div>
  );
}
export default AppointmentView;
