import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
const { connect } = require('twilio-video');

function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        const token = response.data;
        setTest(response.data);
        return token;
      })
      .then(token => {
        connect(`${token}`, { name: 'cool room'})
        .then(room => {
          console.log(`Successfully joined a Room: ${room}`);
          room.on('participantConnected', participant => {
            console.log(`A remote Participant connected: ${participant}`);
          });
        }, error => {
          console.error(`Unable to connect to Room: ${error.message}`);
        });
      })
      .catch((err) => console.log(err));

    
  }, []);

  return <h1>test data from backend: {test} </h1>;
}
export default App;
