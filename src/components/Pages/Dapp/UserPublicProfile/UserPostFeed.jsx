import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const UserPostFeed = ({ userNameFromUrl, isJoinedMember, isCurrCreator }) => {
  const { Moralis } = useMoralis();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await getQueryForUserPost();
    }, 100);
  }, []);

  const getQueryForUserPost = async () => {
    const query = new Moralis.Query("Post");
    query.equalTo("Username", userNameFromUrl).find();
    query.descending("createdAt");
    const response = await query.find();
    setUserPosts(response);
  };

  return (
    <div>
      <div className="pt-10 text-lightViolet text-left text-2xl">
        Latest posts by @{userNameFromUrl}
      </div>
      <EachPostCard
        userPosts={userPosts}
        isJoinedMember={isJoinedMember}
        isCurrCreator={isCurrCreator}
      />
    </div>
  );
};

export default UserPostFeed;

////////////// EACH POST CARD - AVAILABLE POSTS //////////////

const EachPostCard = ({ userPosts, isJoinedMember, isCurrCreator }) => {
  return (
    <div>
      {userPosts.map((eachPost) => (
        <div
          key={eachPost.id}
          className="bg-black/30 rounded-lg text-base text-left text-gray-400 my-5 p-5"
        >
          {isJoinedMember || isCurrCreator ? (
            <>
              <p className="text-lightGrey pb-2">{eachPost.attributes.Title}</p>
              <div className="">{eachPost.attributes.Description}</div>
            </>
          ) : (
            <>
              <p className="text-lightViolet text-center text-lg pb-2">
                Sorry, Post Unavailable!
              </p>
              <div className="text-center">
                Join As Member To Unlock This Post!
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
