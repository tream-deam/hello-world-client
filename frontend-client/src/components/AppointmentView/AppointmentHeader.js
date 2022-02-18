function AppointmentHeader (props) {

  return (
      <div className="appt-header">
        <p className="welcome-msg">Hello, Richard! </p>
              {/*STRETCH: conditional rendering of + Appointment button*/}
         <p className="add-appt">+ New Call</p>
      </div>
  );

}
export default AppointmentHeader;
