import React from "react";

import polygonLogo from "../../../../assets/polygon-logo.png";
import moralisLogo from "../../../../assets/moralis-logo.svg";
import spheronLogo from "../../../../assets/spheron-logo.png";
import alchemyLogo from "../../../../assets/alchemy-logo.png";
import ipfsLogo from "../../../../assets/ipfs-logo.svg";
import metamaskLogo from "../../../../assets/metamask-logo.png";

const PoweredBy = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 py-20">
      <div className="text-xl text-left text-lightViolet font-semibold relative pb-10">
        Powered By
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-10">
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={polygonLogo}
          alt="polygon logo"
        />
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={moralisLogo}
          alt="moralis logo"
        />
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={spheronLogo}
          alt="spheron logo"
        />
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={alchemyLogo}
          alt="alchemy logo"
        />
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={ipfsLogo}
          alt="ipfs logo"
        />
        <img
          className="h-8 md:h-12 object-contain mx-auto"
          src={metamaskLogo}
          alt="metamask logo"
        />
      </div>
    </div>
  );
};

export default PoweredBy;
