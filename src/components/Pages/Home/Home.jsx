import React from "react";
import About from "./HomeSections/About";
import AllRightsReserved from "./HomeSections/AllRightsReserved";
import Footer from "./HomeSections/Footer";
import Navbar from "./HomeSections/Navbar";
import Roadmap from "./HomeSections/Roadmap";
import Team from "./HomeSections/Team";
import TryNow from "./HomeSections/TryNow";
import Header from "./HomeSections/Header";
import PoweredBy from "./HomeSections/PoweredBy";
import BackedBy from "./HomeSections/BackedBy";
import ProductDemo from "./HomeSections/ProductDemo";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="scroll-smooth font-inter text-gray-300 text-lg md:text-xl w-screen bg-gradient-to-tr from-black via-darkBlue to-darkViolet bg-fixed">
      <Navbar />

      <div id="header">
        <Header />
      </div>

      {/* <div id="about">
        <About />
      </div> */}
      {/* <div id="productDemo">
        <ProductDemo />
      </div>
      <div id="tryNow">
        <TryNow />
      </div> */}
      <div id="poweredBy">
        <PoweredBy />
      </div>
      <div id="backedBy">
        <BackedBy />
      </div>

      {/* <div id="roadmap">
        <Roadmap />
      </div> */}
      <div id="team">
        <Team />
      </div>
      <div id="contact">
        <Footer />
      </div>
      <AllRightsReserved />
      <div id="bootcampNotif">
        <NotificationBar />
      </div>
    </div>
  );
};

export default Home;

const NotificationBar = () => {
  return (
    <div
      className="fixed bottom-0 z-40
    border-t-2 border-lightBlue/10 py-2 text-base font-semibold font-poppins uppercase tracking-widest text-center bg-lightAccent text-darkBlue px-20 mx-auto md:w-full"
    >
      <NavLink to="/bootcamp" target="_blank">
        Register For Our Creators Bootcamp
      </NavLink>
    </div>
  );
};
