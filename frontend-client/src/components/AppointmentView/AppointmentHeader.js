import { useName } from "../../providers/UsernameProvider";

function AppointmentHeader () {
  let name = useName(); 

  return (
      <div className="appt-header">
        <p className="welcome-msg">Welcome{name && `, ${name}`}!</p>
         <p className="add-appt">+ New Call</p>
      </div>
  );

}
export default AppointmentHeader;
