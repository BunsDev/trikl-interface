import Avatar from "boring-avatars";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import AvatarColors from "../../../ImportHelpers/AvatarColors";

const EachCommunityCard = ({ eachCreator }) => {
  const [membershipCount, setMembershipCount] = useState([]);
  const { Moralis } = useMoralis();

  const currUsername = eachCreator.attributes.Username;

  useEffect(() => {
    setTimeout(async () => {
      await getMembership();
    }, 10);
  }, []);

  const getMembership = async () => {
    const query = new Moralis.Query("Members");
    query.equalTo("Creator_Username", currUsername);
    const count = await query.count();

    setMembershipCount(count);
  };

  return (
    <div
      className="flex flex-col
      text-left text-base font-light text-gray-300
    bg-black/30 hover:bg-black/50 rounded-lg px-16 py-10"
    >
      <div className="flex gap-5 relative">
        <Avatar
          name={eachCreator.attributes.Username}
          variant="beam"
          size={80}
          colors={AvatarColors}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            {eachCreator.attributes.Alias}
          </h2>
          <sub className="text-lightViolet text-lg">
            @{eachCreator.attributes.Username}
          </sub>
        </div>
      </div>
      <p className="text-left py-5">
        {eachCreator.attributes.Message.substring(0, 90)} ...
      </p>

      <div className="flex items-center gap-10">
        <NavLink
          className="p-2 w-max px-5 py-2
          bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold rounded-lg 
              ease-in-out duration-300 
              hover:px-6 hover:bg-lightAccent cursor-pointer"
          to={`/dapp/${eachCreator.attributes.Username}`}
        >
          See more
        </NavLink>
        <div className="">
          <span className="text-lightAccent text-2xl font-semibold">
            {membershipCount}
          </span>{" "}
          <span>Members</span>
        </div>
      </div>
    </div>
  );
};

export default EachCommunityCard;
