import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./UserProfile.css";

const UserTweetFeed = ({ userInfo }) => {
  let isTweetAvailable = false;
  // const [reqdTwitterUrl, setReqdTwitterUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fullTwitterUrl = userInfo.Twitter_Link;
  let twitterUsername;
  if (fullTwitterUrl) {
    twitterUsername = fullTwitterUrl.split("/")[3];
    isTweetAvailable = true;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200);
  });

  return (
    <div className="py-5">
      {isLoading ? <BarLoader width="100%" color="#c489fb" /> : ""}

      {isTweetAvailable ? (
        <div className="selfCenter spaceBetween standardWidth">
          <TwitterTimelineEmbed
            sourceType="timeline"
            screenName={twitterUsername}
            theme="light"
            backgroundColor="#ff4e4e"
            onLoad={function noRefCheck() {}}
          />
        </div>
      ) : (
        <div>No Tweets Found</div>
      )}
    </div>
  );
};

export default UserTweetFeed;
