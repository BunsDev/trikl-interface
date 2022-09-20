///////////// PAID POSTS FEED //////////////

import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import parse from "html-react-parser";
import { BarLoader } from "react-spinners";
// import getVideoId from "get-video-id";

// import edjsHTML from "editorjs-html";
import EachPostCard from "./EachPostCard";
import "./eachPost.css";

const UserPostFeed = ({ userNameFromUrl, isJoinedMember, isCurrCreator }) => {
  const { Moralis } = useMoralis();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await getQueryForUserPost();
      setIsLoading(false);
    }, 1000);
  }, []);

  const getQueryForUserPost = async () => {
    const query = new Moralis.Query("PostCIDs");
    query.equalTo("Username", userNameFromUrl).find();
    query.equalTo("IsPaid", "Paid").find();
    query.descending("createdAt");
    const response = await query.find();
    setUserPosts(response);
  };

  return isLoading ? (
    <div className="w-full py-5">
      <BarLoader width="100%" color="#c489fb" />
    </div>
  ) : (
    <div>
      <div className="py-10 text-lightViolet text-left text-xl">
        Exclusive Member Only Posts
      </div>

      {/* DISPLAYING USER POSTS */}
      {userPosts.length === 0 ? <div>No Posts Available</div> : ""}
      {userPosts.map((eachPost) => (
        <div key={eachPost.id}>
          {isJoinedMember || isCurrCreator ? (
            <EachPostCard eachPost={eachPost} />
          ) : (
            <PostNotAccessible />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPostFeed;

////////////// EACH POST CARD - NOT ACCESSBILE POSTS //////////////
const PostNotAccessible = () => {
  return (
    <div className="bg-white hover:drop-shadow-md rounded-md p-5 mb-5 transition-all duration-300 ease-in-out">
      <p className="text-lightViolet text-center text-lg pb-2">
        Sorry, Post Unavailable!
      </p>
      <div className="text-center">Join As Member To Unlock This Post!</div>
    </div>
  );
};
