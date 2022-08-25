import React from "react";
import { NavLink } from "react-router-dom";
import alreadyACreatorImg from "../../../../assets/trikl-hero-image.png";

const AlreadyACreator = ({ creatorUsername }) => {
  return (
    <div className="h-full flex items-center px-5 md:px-16 justify-between">
      <div className="text-left">
        <h2 className="text-4xl capitalize font-semibold text-lightViolet pb-5">
          You're Already
          <br /> a creator!
        </h2>
        <NavLink to={`/dapp/${creatorUsername}`} className="text-lightAccent">
          Visit Your Profile
        </NavLink>
      </div>
      <img
        className="h-[60vh] error-animation"
        src={alreadyACreatorImg}
        alt="Error Trikl"
      />
    </div>
  );
};

export default AlreadyACreator;
