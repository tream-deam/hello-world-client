import axios from 'axios';
import { useState, useEffect } from "react";
const { connect, createLocalVideoTrack, createLocalAudioTrack } = require('twilio-video');

function Call() {

  return (
    <Video id="self-video"/>
  )
}