import React from "react";
import NavBar from "../NavBar";
import "../HomePage/HomePage.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse, 
  faBrain,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import karenNgoPicture from '../../images/karen_profile_pic.png';

export default function About() {

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
                  , World!
                </p>
              </div>
              <p className="brand-description">
              “Bridging communities around the world &amp; breaking language barriers.”
              </p>
            </section>
          <section className="hello-world-options">
            <p className="option-header">
              Meet the team
            </p>
            <div className="options-container">
              <div className="health-container">
                <div  className="health-circle">
                  {/* <img className="team-member-picture" src={karenNgoPicture} alt="Karen Ngo" /> */}
                  
                </div>
                <p className="desc">
                  Karen Ngo
                  <br/><br/>
                  Ux Designer → UX Engineer/Developer
                  <br/><br/>
                  Not just the what, but how to make what I design and making things functional
                  <br/><br/>
                  <a href="mailto:to.karenngo@gmail.com">to.karenngo@gmail.com</a>
                  <br/>
                  <a href="https://github.com/careuno">github.com/careuno</a>
                </p>
                {/* <p className="desc"></p> */}
              </div>
              <div className="learning-container">
                <div className="learning-circle">
                  <p className="option-title"></p>
                </div>
                <p className="desc">
                  Sameer Mohamed
                  <br/><br/>
                  Full-stack developer with a background in Life Sciences, looking to help businesses grow and make a difference in the Digital Health industry
                  <br/><br/>
                  Favourite Tech Stack: React, Javascript, Express, PostgreSQL
                  <br/><br/>
                  <a href="https://github.com/houseofsam">github.com/houseofsam</a>
                  </p>
              </div>
              <div className="personal-container">
                <div className="personal-circle">
                  <p className="option-title">Personal</p>
                  <FontAwesomeIcon icon={faUserGroup} size="2x" />
                </div>
                <p className="desc">Lorenço Alvarez Navarrete </p>
              </div>
            </div>
          </section>
        </div>
      </div>

    );
  
}
