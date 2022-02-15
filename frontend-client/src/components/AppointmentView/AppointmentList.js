import AppointmentListItem from "./AppointmentListItem";
function AppointmentList (props) {
  return (
    <>
      <div className="convo-log">Appointment List Filler</div>
      {/* map function to create appointmentlistitems */}
      <AppointmentListItem/>
    </>
  );
}
export default AppointmentList;
