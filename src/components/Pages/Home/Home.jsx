import React from "react";
import About from "./HomeSections/About";
import AllRightsReserved from "./HomeSections/AllRightsReserved";
import Footer from "./HomeSections/Footer";
import Navbar from "./HomeSections/Navbar";
import Roadmap from "./HomeSections/Roadmap";
import Team from "./HomeSections/Team";
//import TryNow from "./HomeSections/TryNow";
import Header from "./HomeSections/Header";

import TryNow from "./HomeSections/TryNow";

const Home = () => {
  return (
    <div className="scroll-smooth font-inter text-gray-300 text-lg md:text-xl w-screen bg-gradient-to-tr from-black via-darkBlue to-darkViolet bg-fixed">
      <Navbar />
      <div id="header">
        <Header />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="tryNow">
        <TryNow />
      </div>
      <div id="roadmap">
        <Roadmap />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="contact">
        <Footer />
      </div>
      <AllRightsReserved />
    </div>
  );
};

export default Home;
