import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./UserProfile.css";

const UserTweetFeed = () => {
  const [isTweetAvailable, setIsTweetAvailable] = useState(true);
  const [reqdTwitterUrl, setReqdTwitterUrl] = useState("_raushansharma");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200);
  });

  return (
    <div className="py-10">
      {isLoading ? <BarLoader width="100%" color="#c489fb" /> : ""}

      {isTweetAvailable ? (
        <div className="selfCenter spaceBetween standardWidth">
          <TwitterTimelineEmbed
            sourceType="timeline"
            screenName={reqdTwitterUrl}
            theme="dark"
            transparent
          />
        </div>
      ) : (
        <div>No Tweets Found</div>
      )}
    </div>
  );
};

export default UserTweetFeed;
