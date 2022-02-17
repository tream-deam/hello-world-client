import Button from "../Button";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";


function AppointmentListItem (props) {

  return (
  <>
      <div className="appt-list-item-1">
        <div className="appt-info-container">
          <div className="appt-date">
            <div className="day">SUN</div>
            <div className="month">Feb</div>
            <div className="date">13th</div>
        
          </div>
          <div className="patient-name-notes">
            <p className="appt-text">3:00PM - Lisa Jansen</p>
            <p className="appt-notes">Check up examination, shortness of breath.</p>
          </div>
        </div>
        <Link to="/video-call">
          <Button> 
            {/* must fix this text and icon styling- not sure how things will work with props.children yet when passed to button component */}
            <div className="join-call-label">
              <FontAwesomeIcon className="join-video-icon" icon={faVideo} size="1x" />
              <div className="join-call-text">Join Call</div>
            </div>
          </Button>
        </Link>
      </div>
      <div className="appt-list-item">
        <div className="appt-info-container">
          <div className="appt-date">
            <div className="day">MON</div>
            <div className="month">Feb</div>
            <div className="date">14th</div>
        
          </div>
          <div className="patient-name-notes">
            <p className="appt-text">3:00PM - Lisa Jansen</p>
            <p className="appt-notes">Check up examination, shortness of breath.</p>
          </div>
        </div>
        <Link to="/video-call">
          <Button> 
            {/* must fix this text and icon styling- not sure how things will work with props.children yet when passed to button component */}
            <div className="join-call-label">
              <FontAwesomeIcon className="join-video-icon" icon={faVideo} size="1x" />
              <div className="join-call-text">Join Call</div>
            </div>
          </Button>
        </Link>
      </div>
      <div className="appt-list-item">
        <div className="appt-info-container">
          <div className="appt-date">
            <div className="day">TUES</div>
            <div className="month">Feb</div>
            <div className="date">15th</div>
        
          </div>
          <div className="patient-name-notes">
            <p className="appt-text">3:00PM - Lisa Jansen</p>
            <p className="appt-notes">Check up examination, shortness of breath.</p>
          </div>
        </div>
        <Link to="/video-call">
          <Button> 
            {/* must fix this text and icon styling- not sure how things will work with props.children yet when passed to button component */}
            <div className="join-call-label">
              <FontAwesomeIcon className="join-video-icon" icon={faVideo} size="1x" />
              <div className="join-call-text">Join Call</div>
            </div>
          </Button>
        </Link>
      </div>
    </>
  );
}
export default AppointmentListItem;
