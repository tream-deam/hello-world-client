import { NavLink, useNavigate } from 'react-router-dom';
import { useName } from '../providers/UsernameProvider';  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCalendarCheck,
  faBookMedical,
  faVideo,
  faEarthAmericas
} from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss'


function NavBar() {
  const name = useName(); 
  const navigate = useNavigate();
  return (
    <div className="nav-container">
        <section className="side-nav">
          <NavLink to="/" className={(navData) => navData.isActive ? "nav-link is-active" : "nav-link" }>
            <div id="logo">
            <h1 id="logo-hello">
              Hello,  </h1>
              <h1 id="logo-world"> 
              <FontAwesomeIcon icon={faEarthAmericas} size="1x"/></h1>
            </div>
          </NavLink>
     
          <section className="nav-icons">

            <NavLink 
              to="/schedule"
              className={(navData) => navData.isActive ? "nav-link is-active" : "nav-link"}
            >
              <FontAwesomeIcon
              className="nav-icon"
              icon={faCalendarCheck}
              size="3x"
              />
            </NavLink>

            <NavLink 
              to="/video-call" 
              className={(navData) => navData.isActive ? "nav-link is-active" : "nav-link" }
            >
              <FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" />
            </NavLink>

            
              <FontAwesomeIcon
                className="nav-icon"
                icon={faBookMedical}
                size="3x"
              />
          
          </section>
            <div className="user-profile-nav-container">
              <NavLink 
                to="/about"
                className={(navData) => navData.isActive ? "nav-link is-active" : "nav-link"}
              >
              <FontAwesomeIcon
                className="nav-icon"
                icon={faUserCircle}
                size="3x"
              />
              </NavLink>
              <h4 id="username"> {name}</h4>
            </div>
        </section>
    </div>
  );
}
export default NavBar;