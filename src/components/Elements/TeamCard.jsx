import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";

const TeamCard = (props) => {
  return (
    <div
      className="py-10 rounded-xl w-full  text-lightGrey
        hover:text-lightRed hover:scale-125 ease-in-out duration-300
        drop-shadow-lg"
    >
      <img
        className="h-[15rem] md:h-[25rem] mx-auto ease-in-out duration-300"
        src={props.profileDetails.img}
        alt={props.profileDetails.alt}
      />
      <div className="flex items-center gap-5 justify-center">
        <a
          href={props.profileDetails.twitterUrl}
          target="_blank"
          className="text-lightAccent flex items-center gap-5 justify-center"
        >
          <header className="text-2xl text-lightGrey py-5">
            {props.profileDetails.name}
          </header>
          <TwitterIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
