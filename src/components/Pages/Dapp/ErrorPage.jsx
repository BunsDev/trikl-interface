import React from "react";
import { NavLink } from "react-router-dom";
import errorImage from "../../../assets/error-image.png";
import "./ErrorPage.css";

const ErrorPage = () => {
  const ReloadFunction = () => {
    window.location.reload();
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center px-5 md:px-16
    bg-gradient-to-tr from-black via-darkBlue to-darkViolet bg-fixed"
    >
      <div className="text-left">
        <h2 className="text-4xl font-semibold text-lightViolet">
          Some Error Occured!
        </h2>
        <div className="text-gray-400">
          We're trying to fix the error. Meanwhile try{" "}
          <button className="text-lightAccent" onClick={() => ReloadFunction()}>
            reloading the page
          </button>{" "}
          or{" "}
          <NavLink to="/" className="text-lightAccent font-semibold">
            Visit Home
          </NavLink>
          .
        </div>
      </div>
      <img
        className="h-[90vh] error-animation"
        src={errorImage}
        alt="Error Trikl"
      />
    </div>
  );
};

export default ErrorPage;
