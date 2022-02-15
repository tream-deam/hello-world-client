import Button from "../Button";

function AppointmentListItem (props) {
  return (
  
      <div className="appt-list-item">
        <div className="appt-info-container">
          <div className="appt-date">
            <p>DAY</p>
            <p>Month</p>
            <p>15th</p>
          </div>
          <div className="patient-name-notes">
            <p>3:00PM - Lisa Jansen</p>
            <p>Check up examination, shortness of breath.</p>
          </div>
        <Button> Join Call</Button>
        </div>
      </div>
    
  );
}
export default AppointmentListItem;
