import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import parse from "html-react-parser";
import { BarLoader } from "react-spinners";
import getVideoId from "get-video-id";

const UserPublicPostFeed = ({
  userNameFromUrl,
  isJoinedMember,
  isCurrCreator,
}) => {
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
    const query = new Moralis.Query("Post");
    query.equalTo("Username", userNameFromUrl).find();
    query.equalTo("IsPaid", "Free").find();
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
        Public Feed
      </div>

      <EachPostCard
        userPosts={userPosts}
        isJoinedMember={isJoinedMember}
        isCurrCreator={isCurrCreator}
      />
    </div>
  );
};

export default UserPublicPostFeed;

////////////// EACH POST CARD - AVAILABLE POSTS //////////////

const EachPostCard = ({ userPosts, isJoinedMember, isCurrCreator }) => {
  const embedUrlByTypes = {
    youtube: "https://www.youtube.com/embed/",
    vimeo: "https://player.vimeo.com/video/",
  };

  return (
    <div>
      {userPosts.length === 0 ? <div>No Posts Available</div> : ""}
      {userPosts.map((eachPost) => (
        <div
          key={eachPost.id}
          className="bg-black/30 rounded-lg text-base text-left text-gray-400 mb-10 p-5"
        >
          <>
            <p className="text-lightGrey text-2xl pt-5 border-b-2 border-lightViolet/10 pb-5">
              {eachPost.attributes.Title}
            </p>
            <div id="editingPreview" className="pt-5">
              {parse(eachPost.attributes.Description)}
            </div>
            <div
              className={`w-full aspect-video pt-5 ${
                eachPost.attributes.VideoUrl.length > 0 ? "" : "hidden"
              }`}
            >
              <iframe
                className="rounded-lg"
                width="100%"
                height="100%"
                src={`${
                  embedUrlByTypes[
                    getVideoId(eachPost.attributes.VideoUrl).service
                  ]
                }${getVideoId(eachPost.attributes.VideoUrl).id}`}
                title={eachPost.attributes.Title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        </div>
      ))}
    </div>
  );
};
