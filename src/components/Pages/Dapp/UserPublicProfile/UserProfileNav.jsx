import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./UserProfile.css";

const UserProfileNav = ({ activeUserTab, setActiveUserTab }) => {
  return (
    <div className="flex w-full justify-between text-center bg-black/30 rounded-lg mt-8 text-lightViolet">
      <button
        onClick={() => setActiveUserTab("exclusiveFeed")}
        // to="/dapp/user5/posts"
        className={`w-full min-w-max p-3 rounded-lg text-sm uppercase tracking-widest hover:text-lightAccent hover:underline hover:underline-offset-8 ease-in-out duration-300 ${
          activeUserTab === "exclusiveFeed" ? "text-lightAccent" : ""
        }`}
      >
        Member Posts
      </button>
      <button
        onClick={() => setActiveUserTab("tweetFeed")}
        className={`w-full min-w-max p-3 rounded-lg text-sm uppercase tracking-widest hover:text-lightAccent hover:underline hover:underline-offset-8 ease-in-out duration-300 ${
          activeUserTab === "tweetFeed" ? "text-lightAccent" : ""
        }`}
        // to="/dapp/user5/tweets"
      >
        Tweets
      </button>
    </div>
  );
};

export default UserProfileNav;
