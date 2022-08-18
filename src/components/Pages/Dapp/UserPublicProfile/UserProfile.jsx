import React, { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { useOutletContext } from "react-router-dom";
import { useMoralis } from "react-moralis";
import MembershipCard from "./MembershipCard";
import JoiningError from "./JoiningError";
import UserPostFeed from "./UserPostFeed";
import PageLoader from "../../../Elements/PageLoader";
import { ClockLoader } from "react-spinners";

/////////////// MAIN FUNCTION ///////////////
const UserProfile = () => {
  const { Moralis, isAuthenticated } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const creatorsData = useOutletContext();
  const [membershipCount, setMembershipCount] = useState([]);
  const [isProcessingTx, setIsProcessingTx] = useState(false);

  const currUrl = window.location.hash;
  const userNameFromUrl = currUrl.substring(7); // active creator's page Username

  let currUserAddress = "0x0000000000000000000000000000000000000000";
  if (isAuthenticated) {
    currUserAddress = Moralis.User.current().attributes.ethAddress;
  }

  const [isJoinedMember, setIsJoinedMember] = useState(false);
  const [isCurrCreator, setIsCurrCreator] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // in membership Card

  const getQuery = async () => {
    const query = new Moralis.Query("Creator");
    query.equalTo("Username", userNameFromUrl).first();
    const response = await query.find();
    const reqdResponse = response[0].attributes;
    setUserInfo(reqdResponse);

    if (currUserAddress === response[0].attributes.Creator_Address) {
      setIsCurrCreator(true);
    }
  };

  const getMembership = async () => {
    const query = new Moralis.Query("Members");
    query.equalTo("Creator_Username", userNameFromUrl);
    const count = await query.count();
    setMembershipCount(count);

    const response = await query.find();
    for (let i = 0; i < response.length; i++) {
      if (response[i].attributes.From_User.toLowerCase() === currUserAddress) {
        setIsJoinedMember(true);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      await getQuery();
      await getMembership();
      setIsLoading(false);
    }, 10);
  }, []);

  return (
    <div className="grid grid-cols-10 mx-auto py-20 pl-10 relative">
      {isProcessingTx ? (
        <div className="absolute w-screen h-screen flex items-center pl-20 gap-2 bg-black/80 backdrop-blur-sm z-40 text-left text-xl">
          <ClockLoader color="#4ee7ff" loading margin={0} size={40} />
          <span className="text-lightAccent pl-5">
            Transaction being processed! <br /> Please wait and DO NOT
            REFRESH...
          </span>
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      {errorMessage === "" ? (
        ""
      ) : (
        <div className="absolute top-10 z-50">
          <JoiningError errorMessage={errorMessage} />
        </div>
      )}

      {isLoading ? (
        <div className="col-span-9 h-[80vh] flex justify-center items-center">
          <PageLoader />
        </div>
      ) : (
        <>
          <section className="col-span-6 pr-20">
            <UserProfileHeader
              userInfo={userInfo}
              membershipCount={membershipCount}
            />
            <UserPostFeed
              userNameFromUrl={userNameFromUrl}
              isJoinedMember={isJoinedMember}
              isCurrCreator={isCurrCreator}
            />
          </section>

          <aside className="col-span-3 sticky top-10 bg-black/30 rounded-xl h-max overflow-hidden">
            <MembershipCard
              userInfo={userInfo}
              creatorsData={creatorsData}
              isJoinedMember={isJoinedMember}
              isCurrCreator={isCurrCreator}
              isProcessingTx={isProcessingTx}
              setIsProcessingTx={setIsProcessingTx}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </aside>
        </>
      )}
    </div>
  );
};

export default UserProfile;
