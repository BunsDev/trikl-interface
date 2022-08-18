import React from "react";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";

///////////////// ICON IMPORTS /////////////////

import { BsPeople } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { FiHash } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

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
      className="h-screen border-r-2 border-lightViolet/20 
    flex flex-col justify-between items-start py-10 pl-5 text-base font-light"
    >
      <div className="cursor-pointer text-lightAccent">
        <NavLink to="/dapp/explore" className="font-bold text-3xl">
          Trikl
        </NavLink>
      </div>

      {/* Icon List */}
      <div className="flex flex-col gap-10">
        {/* Join as a creator */}
        <div className="rounded-lg flex flex-col gap-2 pb-5">
          <p className="w-3/4 text-left text-sm text-lightViolet">
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
            className="flex gap-2 items-center hover:text-lightAccent cursor-pointer"
          >
            {eachItem.iconName}
            <p>{eachItem.name}</p>
          </NavLink>
        ))}
      </div>

      <div className="flex gap-2 items-center font-semibold text-lg text-lightAccent cursor-pointer w-full">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  );
};

export default DappSidebar;

///////////////// USER ADDRESS / LOGOUT /////////////////

const LogoutButton = () => {
  const { user, logout } = useMoralis();

  return (
    <Popup
      trigger={
        <button type="button">
          {user.get("ethAddress").slice(0, 4)}...
          {user.get("ethAddress").slice(-4)}
        </button>
      }
      position="top"
      closeOnDocumentClick
    >
      <button onClick={() => logout()} className=" text-white">
        Logout
      </button>
    </Popup>
  );
};

///////////////// LOGIN BUTTON /////////////////

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
