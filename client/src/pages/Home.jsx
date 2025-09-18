import React from "react";
import MessageDisplay from "../components/MessageDisplay.jsx";
import Navbar from "../components/NavBar.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>MERN Starter Frontend</h1>
      <MessageDisplay />
    </div>
  );
};

export default Home;
