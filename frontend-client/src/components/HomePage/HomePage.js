import NavBar from "../NavBar";
import "./HomePage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse, 
  faBrain,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

function HomePage (props) {
  return (
    <div className="homepage-view">
      <NavBar/>
      <div className="homepage-container">
        <section className="home-banner"> 
            <div className="heading-home">
              <p className="heading-hello">
                Hello
              </p>
              <p className="heading-world">
                ,World!
              </p>
            </div>
            <p className="brand-description">
            “Bridging communities around the world &amp; breaking language barriers.”
            </p>
          </section>
        <section className="hello-world-options">
          <p className="option-header">
            What brings you in today?
          </p>
          <div className="options-container">
            <div className="health-container">
              <div className="health-circle">
                <p className="option-title">Health</p>
                <FontAwesomeIcon icon={faHeartPulse} size="3x" />
              </div>
              <p className="desc">Connect with doctors or patients to speak about health concerns. </p>
            </div>
            <div className="learning-container">
              <div className="learning-circle">
                <p className="option-title">Learning</p>
                <FontAwesomeIcon icon={faBrain} size="3x" />
              </div>
              <p className="desc">Expanding your learning network with others that speak another language. </p>
            </div>
            <div className="personal-container">
              <div className="personal-circle">
                <p className="option-title">Personal</p>
                <FontAwesomeIcon icon={faUserGroup} size="2x" />
              </div>
              <p className="desc">Connect with friends and family around the world. </p>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
}
export default HomePage;