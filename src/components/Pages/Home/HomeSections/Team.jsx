import React from "react";
import TeamCard from "../../../Elements/TeamCard";
import Profile from "../../../ImportHelpers/TeamProfileImports";

const Team = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 py-24">
      <header>
        <h2 className="text-xl text-left text-lightViolet font-semibold relative pb-10">
          Core Team
        </h2>
      </header>

      <h2 className="text-3xl md:text-4xl text-lightAccent capitalize">
        A Team That Puts Community-First!
      </h2>

      <div className="flex flex-col-reverse md:flex-row md:gap-5 py-10">
        {Profile.map((prof) => (
          <TeamCard key={prof.name} profileDetails={prof} />
        ))}
      </div>
    </div>
  );
};

export default Team;
