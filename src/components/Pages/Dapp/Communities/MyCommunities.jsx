import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useOutletContext } from "react-router-dom";
import EachCommunityCard from "./EachCommunityCard";
import connectWalletImage from "../../../../assets/connect-wallet-image.png";
import "./CreatePost.css";
import NoCommJoined from "./NoCommJoined";

const MyCommunities = () => {
  const { Moralis, isAuthenticated } = useMoralis();
  const creatorsData = useOutletContext();
  const [allMembers, setAllMembers] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      await getMembers();
    }, 10);
  }, []);

  const getMembers = async () => {
    const query = new Moralis.Query("Members");
    const response = await query.find();

    setAllMembers(response);
  };

  let currUserAddress = "0x0000000000000000000000000000000000000000";
  if (isAuthenticated) {
    currUserAddress =
      Moralis.User.current().attributes.ethAddress.toLowerCase();
  }

  const joinedCreators = [];
  for (let i = 0; i < allMembers.length; i++) {
    const memberArrayUserAddress =
      allMembers[i].attributes.From_User.toLowerCase();
    const creatorUsername = allMembers[i].attributes.Creator_Username;

    if (currUserAddress === memberArrayUserAddress) {
      joinedCreators.push(creatorUsername);
    }
  }

  const filteredCreatorsData = [];
  for (let j = 0; j < joinedCreators.length; j++) {
    const currSearchValue = joinedCreators[j];
    for (let i = 0; i < creatorsData.length; i++) {
      const creatorUsername = creatorsData[i].attributes.Username;
      if (creatorUsername === currSearchValue) {
        filteredCreatorsData.push(creatorsData[i]);
      }
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2
            className="text-4xl text-center text-lightViolet font-semibold capitalize
      w-full sticky top-0 z-50
      backdrop-blur-md mb-10 py-5"
          >
            Joined Communities!
          </h2>

          <div className={filteredCreatorsData.length > 0 ? "hidden" : ""}>
            <NoCommJoined />
          </div>

          <div className="grid grid-cols-2 gap-5 mx-10">
            {filteredCreatorsData.map((eachCreator) => (
              <EachCommunityCard
                key={eachCreator.id}
                eachCreator={eachCreator}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center px-16 h-screen">
          <div className="flex flex-col gap-5 justify-start text-left">
            <div className="text-2xl text-lightViolet">My Communities</div>
            <h2 className="text-4xl text-left font-semibold text-lightViolet capitalize">
              Please <span className="text-lightAccent">connect wallet</span>{" "}
              <br /> to continue...
            </h2>
          </div>
          <img
            src={connectWalletImage}
            alt="connect wallet image Trikl"
            className="h-[80vh] bounce-animation"
          />
        </div>
      )}
    </div>
  );
};

export default MyCommunities;
