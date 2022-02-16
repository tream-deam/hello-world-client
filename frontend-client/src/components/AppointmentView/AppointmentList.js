import AppointmentListItem from "./AppointmentListItem";

function AppointmentList (props) {
  return (
      <div className="appt-list">
        {/* map function to create appointmentlistitems */}
        <AppointmentListItem/>
      </div>
  );
}
export default AppointmentList;
