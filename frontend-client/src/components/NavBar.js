import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCalendarCheck,
  faBookMedical,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";


function NavBar() {
  // const { } = props

  //modes for nav buttons
  // const SELECTED = "SELECTED";
  // const DESELECTED= "DESELECTED";


  return (
    <div className="nav-container">
        <section className="side-nav">
          <div id="logo">
          <h1 id="logo-hello">
            Hello,  </h1>
            <h1 id="logo-doc"> 
            Doc!{" "}</h1>
          </div>
          <section className="nav-icons">

            <NavLink 
              to="/appointments"
              className={(navData) => navData.isActive ? "is-active" : ""
            }>
              <FontAwesomeIcon
                className="nav-icon"
                icon={faCalendarCheck}
                size="3x"
              />
            </NavLink>

            <NavLink 
              to="" 
              className={(navData) => navData.isActive ? "is-active" : "" 
            }>
              <FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" />
            </NavLink>

            <NavLink to="" className={(navData) => navData.isActive ? "is-active" : "" }>
              <FontAwesomeIcon
                className="nav-icon"
                icon={faBookMedical}
                size="3x"
              />
            </NavLink>
     
          </section>
            <div className="user-profile-nav-container">
              <FontAwesomeIcon
                className="nav-icon"
                icon={faUserCircle}
                size="3x"
              />
              <h4 id="username"> Richard Bob</h4>
            </div>
        </section>
    </div>
  );
}
export default NavBar;