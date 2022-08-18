import React from "react";
import { useOutletContext } from "react-router-dom";
import EachCommunityCard from "./EachCommunityCard";

const AllCommunities = () => {
  const creatorsData = useOutletContext();

  return (
    <div>
      <h2
        className="text-4xl text-center text-lightViolet font-semibold capitalize
        w-full sticky top-0 z-50
        backdrop-blur-md mb-10 py-5"
      >
        All Communities
      </h2>
      <div className="grid grid-cols-2 gap-5 mx-10">
        {creatorsData.map((eachCreator) => (
          <EachCommunityCard key={eachCreator.id} eachCreator={eachCreator} />
        ))}
      </div>
    </div>
  );
};

export default AllCommunities;
