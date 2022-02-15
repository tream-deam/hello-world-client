import Button from "../Button";
import { faVideo } from "@fortawesome/free-solid-svg-icons";


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
        <Button> 
          {/* must fix this text and icon styling- not sure how things will work with props.children yet when passed to button component */}
          Join Call
          <FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" />
        </Button>
        
        </div>
      </div>
    
  );
}
export default AppointmentListItem;
