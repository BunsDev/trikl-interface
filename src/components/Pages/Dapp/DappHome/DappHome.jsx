import React, { useEffect, useState } from "react";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { Outlet } from "react-router-dom";
import PageLoader from "../../../Elements/PageLoader";
import DappSidebar from "./DappSidebar";

const DappHome = () => {
  const { Moralis } = useMoralis();
  const [isLoading, setIsLoading] = useState(false); // LOADING STATE
  const [creatorsData, setcreatorsData] = useState([]); // MAIN CREATOR DATA

  ///////// RUNS ON EVERY RELOAD /////////
  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      await getQuery();
      setIsLoading(false);
    }, 10);
  }, []);

  ///////// GETTING IPFS DATA /////////
  const getQuery = async () => {
    const query = new Moralis.Query("Creator");
    const creators = await query.find();
    setcreatorsData(creators);
  };

  return (
    <div
      className="grid grid-cols-12 mx-auto justify-between scroll-smooth
      font-inter text-white text-lg 
    bg-gradient-to-tr from-black via-darkBlue to-darkViolet bg-fixed relative"
    >
      {/* MOBILE */}
      <div className="md:hidden absolute w-full h-full z-[100] flex justify-center text-lg text-baseWhite bg-black/80 backdrop-blur-md text-left">
        <div className="w-2/3 pt-10">
          Please Try Again With A Desktop Device! <br /> <br /> Trikl dApp is
          currently{" "}
          <span className="text-lightAccent font-semibold text-xl">
            supported on Desktop devices
          </span>{" "}
          only...
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="col-span-2 h-screen sticky top-0">
        <DappSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-10">
        {isLoading ? <PageLoader /> : <Outlet context={creatorsData} />}
      </div>
    </div>
  );
};

export default DappHome;
