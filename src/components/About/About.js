import React from "react";
import NavBar from "../NavBar";
import "./About.scss";
import karenNgoPicture from "../../images/karen_profile_pic.png";
import sameerMohamedPicture from "../../images/sameer_profile_pic.jpg";
import lorençoProfilePicture from "../../images/lorenço_profile_pic.JPG";

export default function About() {
  return (
    <div className="homepage-view">
      <NavBar />
      <div className="homepage-container">
        <section className="home-banner">
          <div className="heading-home">
            <p className="heading-hello">Hello</p>
            <p className="heading-world">, World!</p>
          </div>
          <p className="brand-description">
            “Bridging communities around the world &amp; breaking language
            barriers.”
          </p>
        </section>
        <section className="hello-world-options">
          <p className="option-header">Meet the Team</p>
          <div className="options-container">
            <div className="profile-picture-container">
              <div className="profile-picture-circle">
                <img
                  className="team-member-picture"
                  src={karenNgoPicture}
                  alt="Karen Ngo"
                />
              </div>
              <div className="desc-about">
                <div className="designer-name karen">Karen Ngo</div>
                <br />
                <br />
                UX Designer → UX Engineer/Developer
                <br />
                <br />
                Not just the what, but how to make what I design and making
                things functional
                <br />
                <br />
                <a className="plug" href="mailto:to.karenngo@gmail.com">
                  to.karenngo@gmail.com
                </a>
                <br />
                <a className="plug" href="https://github.com/careuno">
                  github.com/careuno
                </a>
              </div>
            </div>
            <div className="profile-picture-container">
              <div className="profile-picture-circle">
                <img
                  className="team-member-picture"
                  src={sameerMohamedPicture}
                  alt="Sameer Mohamed"
                />
                <p className="option-title"></p>
              </div>
              <div className="desc-about">
                <div className="designer-name">Sameer Mohamed</div>
                <br />
                <br />
                Full-stack developer with a background in HR & Life Sciences,
                with interests in Digital Health and Wellness. Looking to
                leverage software to improve lives and help businesses grow.
                <br />
                <br />
                Favourite Tech Stack: React, Javascript, Express, PostgreSQL
                <br />
                <br />
                <a className="plug" href="mailto:sameer.mohamed1@outlook.com">
                  sameer.mohamed1@outlook.com
                </a>
                <br />
                <a className="plug" href="https://github.com/houseofsam">
                  github.com/houseofsam
                </a>
              </div>
            </div>
            <div className="profile-picture-container">
              <div className="profile-picture-circle">
                <img
                  className="team-member-picture"
                  src={lorençoProfilePicture}
                  alt="Lorenço Alvarez Navarrete"
                />
                <p className="option-title"></p>
              </div>
              <div className="desc-about">
                <div className="designer-name">Lorenço Alvarez Navarrete</div>
                <br />
                <br />
                Recent grad in Artificial Intelligence (focus: Linguistics)
                looking to create software that truly improves people's quality
                of life
                <br />
                <br />
                Web developer hoping to one day create mobile and other native
                applications
                <br />
                <br />
                <a className="plug" href="mailto:loralnav@student.ubc.ca">
                  loralnav@student.ubc.ca
                </a>
                <br />
                <a className="plug" href="https://github.com/ocnerol">
                  github.com/ocnerol
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
