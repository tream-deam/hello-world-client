import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AllComponents from "./components/AllComponents";
import "./components/AllComponents.scss";

function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setTest(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>test data from backend: {test} </h1>
      <AllComponents/>
    </>
    );
}
export default App;
