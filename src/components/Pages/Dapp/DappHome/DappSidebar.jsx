import React from "react";
import { useMoralis } from "react-moralis";
import { NavLink, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "./DappHome.css";

///////////////// ICON IMPORTS /////////////////

import { BsPeople } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { FiHash } from "react-icons/fi";
import DappChains from "./DappChains";

///////////////// MAIN FUNCTION /////////////////

const DappSidebar = () => {
  const { isAuthenticated } = useMoralis();

  // sidebar links
  const sidebarLinks = [
    { name: "Explore", link: "/dapp/explore", iconName: <FiHash /> },
    {
      name: "Communities",
      link: "/dapp/my-communities",
      iconName: <BsPeople />,
    },
    { name: "Post", link: "/dapp/new-post", iconName: <IoCreateOutline /> },
  ];

  return (
    <div
      className="h-screen border-r-2 border-lightBlue/20 bg-lightBlue/20
    flex flex-col justify-between items-start py-10 pl-5 text-base font-light"
    >
      <div className="cursor-pointer text-triklBlue">
        <NavLink to="/dapp/explore" className="font-bold text-3xl">
          Trikl
        </NavLink>
      </div>

      <div className="rounded-lg flex flex-col gap-2 pb-5">
        <p className="w-3/4 text-left text-sm text-triklBlue">
          Are you a web3 content Creator?
        </p>
        <NavLink
          to="/dapp/create-profile"
          className="bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold w-max px-5 py-2 rounded-lg 
              ease-in-out duration-300 
              flex items-center gap-2
              cursor-pointer"
        >
          Join Us
        </NavLink>
      </div>

      {sidebarLinks.map((eachItem) => (
        <NavLink
          key={eachItem.name}
          to={eachItem.link}
          className="flex gap-2 items-center hover:text-triklBlue cursor-pointer"
        >
          {eachItem.iconName}
          <p>{eachItem.name}</p>
        </NavLink>
      ))}

      <div>
        <DappChains />
      </div>

      <div className="font-semibold text-lg text-triklBlue cursor-pointer">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default DappSidebar;

///////////////// USER ADDRESS / LOGOUT /////////////////

const LogoutButton = () => {
  const { user, logout } = useMoralis();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <Popup
      trigger={
        <button type="button">
          {user.get("ethAddress").slice(0, 4)}...
          {user.get("ethAddress").slice(-4)}
        </button>
      }
      position="right"
      closeOnDocumentClick
    >
      <button onClick={handleLogout} className="pl-2 text-red-400">
        Logout
      </button>
    </Popup>
  );
};

///////////////// LOGIN BUTTON /////////////////

const LoginButton = () => {
  const { isAuthenticated, authenticate, Moralis, chainId } = useMoralis();
  let navigate = useNavigate();

  const login = async () => {
    if (!isAuthenticated) {
      try {
        if (chainId !== "0x89" || "0x13881") {
          await Moralis.switchNetwork("0x13881");
        }

        await authenticate({ signingMessage: "Log in to Trikl" });
        await Moralis.enableWeb3();
        navigate(0);
      } catch (error) {
        alert("Some Error occured: ", error);
      }
    }
  };
  return <button onClick={() => login()}>Connect Wallet</button>;
};
