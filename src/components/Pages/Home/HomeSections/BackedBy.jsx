import React from "react";

import foundershipLogo from "../../../../assets/foundership-logo.png";
import togetherLogo from "../../../../assets/together-logo.svg";

const BackedBy = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 pt-20 pb-10">
      <div className="text-xl text-left text-lightViolet font-semibold relative pb-10">
        Backed By
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        <img
          className="h-10 md:h-16 object-contain mx-auto"
          src={foundershipLogo}
          alt="foundership logo"
        />
        <img
          className="h-10 md:h-16 object-contain mx-auto"
          src={togetherLogo}
          alt="together logo"
        />
      </div>
    </div>
  );
};

export default BackedBy;
