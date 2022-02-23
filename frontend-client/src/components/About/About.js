import React, { useState } from "react";
import NavBar from "../NavBar";
import "../HomePage/HomePage.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse, 
  faBrain,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

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
                  <p className="option-title">Health</p>
                  <FontAwesomeIcon icon={faHeartPulse} size="3x" />
                </div>
                <p className="desc">Karen Ngo</p>
              </div>
              <div className="learning-container">
                <div className="learning-circle">
                  <p className="option-title">Learning</p>
                  <FontAwesomeIcon icon={faBrain} size="3x" />
                </div>
                <p className="desc">Sameer Mohamed</p>
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
