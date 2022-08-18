import React from "react";
import { NavLink } from "react-router-dom";
import noCommJoinedImg from "../../../../assets/noCommJoined.png";

const NoCommJoined = () => {
  return (
    <div className="h-full flex gap-10 items-center px-5 md:px-16 justify-between">
      <div className="text-center">
        <h2 className="text-4xl capitalize text-lightViolet pb-5">
          You've not joined <br /> any communities yet!
        </h2>

        <NavLink to="/dapp/explore" className="text-lightAccent font-semibold">
          Join Now
        </NavLink>
      </div>
      <img
        className="h-[60vh] error-animation"
        src={noCommJoinedImg}
        alt="Error Image Trikl"
      />
    </div>
  );
};

export default NoCommJoined;
