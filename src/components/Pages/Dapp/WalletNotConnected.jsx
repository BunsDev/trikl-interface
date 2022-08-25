import React from "react";
import { useMoralis } from "react-moralis";
import errorImage from "../../../assets/error-image.png";
import "./ErrorPage.css";

const WalletNotConnected = () => {
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
          Wallet Not Connected!
        </h2>
        <div className="text-gray-400">
          Please{" "}
          <div className="text-lightAccent font-semibold inline">
            <LoginButton />
          </div>{" "}
          and try{" "}
          <button className="text-lightAccent" onClick={() => ReloadFunction()}>
            Reloading the Page
          </button>
          ...
        </div>
      </div>
      <img
        className="h-[80vh] object-contain error-animation"
        src={errorImage}
        alt="Trikl Error"
      />
    </div>
  );
};

export default WalletNotConnected;

const LoginButton = () => {
  const { isAuthenticated, authenticate, Moralis } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({ signingMessage: "Log in to Trikl" });
        await Moralis.enableWeb3();
      } catch (error) {
        alert("Some Error occured: ", error);
      }
    }
  };
  return <button onClick={() => login()}>Connect Wallet</button>;
};
