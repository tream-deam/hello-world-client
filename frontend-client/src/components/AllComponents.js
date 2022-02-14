//import React from "react";
//import DayListItem from './DayListItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faCalendarCheck, faBookMedical, faVideo } from '@fortawesome/free-solid-svg-icons'
export default function AllComponents () {
 // const { } = props

  return (
    <>

      {/*side nav */}
      <div className="Callview">
      <section className="side-nav">
        <h1 id="logo">Hello, Doc! </h1>
        <a href="#"><FontAwesomeIcon className="nav-icon" icon={faUserCircle} size="2x" /></a>
        <a href="#"><FontAwesomeIcon className="nav-icon" icon={faCalendarCheck} size="2x" /></a>
        <a href="#"><FontAwesomeIcon className="nav-icon" icon={faBookMedical} size="2x" /></a>
        <a href="#"><FontAwesomeIcon className="nav-icon" icon={faVideo} size="2x" /></a>
      </section>
      <div className="OtherVideo">blah</div>
      <div className="SelfVideo-log"></div>
      </div>
    </>
  );
}

