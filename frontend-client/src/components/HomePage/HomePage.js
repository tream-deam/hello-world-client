import NavBar from "../NavBar";
import "./HomePage.scss";

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
            “Bridging communities around the world [and &amp;] breaking language barriers.”
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
                {/* Heart Icon */}
              </div>
              <p>Connect with doctors or patients to speak about health concerns. </p>>
            </div>
            <div className="learning-container">
              <div className="learning-circle">
                <p className="option-title">Learning</p>
                {/* Learning/Brain Icon */}
              </div>
              <p>Expanding your learning network with others that speak another language. </p>
            </div>
            <div className="personal-container">
              <div className="personal-circle">
                <p className="option-title">Personal</p>
                {/* 2 people icon */}
              </div>
              <p>Connect with friends and family around the world. </p>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
}
export default HomePage;
