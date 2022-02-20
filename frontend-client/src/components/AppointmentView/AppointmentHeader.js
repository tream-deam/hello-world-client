import { useName } from "../../providers/UsernameProvider";

function AppointmentHeader (props) {
  let name = useName(); 
  // if (name) `, ${useName()}` : "";

  return (
      <div className="appt-header">
        <p className="welcome-msg">Welcome{name && `, ${name}`}!</p>
              {/*STRETCH: conditional rendering of + Appointment button*/}
         <p className="add-appt">+ New Call</p>
      </div>
  );

}
export default AppointmentHeader;
