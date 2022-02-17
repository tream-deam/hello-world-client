import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCalendarCheck,
  faBookMedical,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";


function NavBar() {
  // const { } = props

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

              <FontAwesomeIcon
                className="nav-icon"
                icon={faCalendarCheck}
                size="2x"
              />
                    	       
              <FontAwesomeIcon
                className="nav-icon"
                icon={faBookMedical}
                size="2x"
              />
     
              <FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" />
  
          </section>
              <FontAwesomeIcon
                className="nav-icon"
                icon={faUserCircle}
                size="2x"
              />
              <h4 id="username"> User Name</h4>
      
        </section>
    </div>
  );
}
export default NavBar;