import React from "react";
import { NavLink } from "react-router-dom";
import notCreatorImg from "../../../../assets/connect-wallet-image.svg";

const NotACreator = () => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center px-5 md:px-16
bg-gradient-to-tr from-black via-darkBlue to-darkViolet bg-fixed"
    >
      <div className="text-left">
        <h2 className="text-4xl font-semibold capitalize text-lightViolet pb-5">
          Please Register As A Creator First!
        </h2>
        <NavLink
          to="/dapp/create-profile"
          className="text-lightAccent uppercase tracking-widest font-semibold"
        >
          join as Creator
        </NavLink>
      </div>
      <img
        className="h-[90vh] bounce-animation"
        src={notCreatorImg}
        alt="You're not registered as a creator on Trikl, yet."
      />
    </div>
  );
};

export default NotACreator;
