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
        <section className="side-nav">
          <h1 id="logo">
            Hello, <br></br>Doc!{" "}
          </h1>
          <section className="nav-icons">
            <a href="#">
              <FontAwesomeIcon
                className="nav-icon"
                icon={faCalendarCheck}
                size="2x"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="nav-icon"
                icon={faBookMedical}
                size="2x"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" />
            </a>
          </section>
          <a href="#">
              <FontAwesomeIcon
                className="nav-icon"
                icon={faUserCircle}
                size="2x"
              />
            </a>
        </section>
  );
}
export default NavBar;