//
//
//
/////////////////// DELETE THIS BEFORE GOING LIVE ///////////////////
//
//
//

import React, { useState, useEffect } from "react";
import PageLoader from "../../../Elements/PageLoader";
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { useNavigate } from "react-router-dom";

const CreatePortfolio = () => {
  //****************************** DEFINING CONSTANTS/VARIABLES *****************************//

  // Import Moralis Functions
  const { saveFile } = useMoralisFile();
  const { Moralis, account, user, isAuthenticated } = useMoralis();

  const navigate = useNavigate();

  // FORM DATA
  const [userAlias, setUserAlias] = useState("");
  const [username, setUsername] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [membershipCharges, setMembershipCharges] = useState("");
  const [whySubMsg, setWhySubMsg] = useState("");

  // other state variables
  const [portfolioCreationInProgress, setPortfolioCreationInProgress] =
    useState(false);
  const userWalletAddress = isAuthenticated ? user.attributes.ethAddress : "";

  const [isCurrCreator, setIsCurrCreator] = useState(false);

  //****************************** SAVING CREATOR TO DATABASE *****************************//

  //Checking for the duplicate creator
  useEffect(() => {
    async function Test() {
      const query = new Moralis.Query("Creator");
      query.equalTo("Creator_Address", user.attributes.ethAddress);
      const results = await query.find();
      if (
        user.attributes.ethAddress === results[0].attributes.Creator_Address
      ) {
        setIsCurrCreator(true);
      }
    }
    isAuthenticated && Test();
  }, []);

  // Creating Object and a new instance of that class
  const CreatorsPortfolio = Moralis.Object.extend("Creator");
  const creator = new CreatorsPortfolio();

  // uploading file to IPFS
  const uploadUser = async (event) => {
    event.preventDefault();

    setPortfolioCreationInProgress(true);

    const aliasArray = userAlias.split();
    const userMessageArray = userMessage.split();

    //creating metadata to store on ipfs
    const metadata = {
      username,
      alias: aliasArray,
      message: userMessageArray,
      twitterLink,
      instagramLink,
      youtubeLink,
      membershipCharges,
      whySubMsg,
      userWalletAddress,
    };

    try {
      const result = await saveFile(
        "mydata.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      const dataLink = result.ipfs();
      let response = await fetch(dataLink);
      let ipfsData = await response.json();

      //Checking for the duplicate creator
      const query = new Moralis.Query("Creator");
      query.equalTo("Username", ipfsData.username);
      const results = await query.find();
      const count = await query.count();

      if (count === 0) {
        //Setting up the creator row
        creator.set("Username", ipfsData.username);
        creator.set("Alias", ipfsData.alias[0]);
        creator.set("Message", ipfsData.message[0]);
        creator.set("Twitter_Link", ipfsData.twitterLink);
        creator.set("Instagram_Link", ipfsData.instagramLink);
        creator.set("Youtube_Link", ipfsData.youtubeLink);
        creator.set("Membership_charges", ipfsData.membershipCharges);
        creator.set("Why_Message", ipfsData.whySubMsg);
        creator.set("Creator_Address", ipfsData.userWalletAddress);

        creator.save();
      } else {
        alert("Username already exists, Please try something else");
      }

      setPortfolioCreationInProgress(false);
      navigate(`/dapp/${username}`);
    } catch (error) {
      alert(error.message);
    }
  };

  //****************************** MAIN RETURN STATEMENT START HERE *****************************//

  return isCurrCreator ? (
    <div>You are already a creator</div>
  ) : (
    <div>
      <h2
        className="text-4xl text-lightViolet font-semibold capitalize
        w-full sticky top-0 z-50
        backdrop-blur-md py-5"
      >
        Start Your Community!
      </h2>

      <form onSubmit={uploadUser} className="grid grid-cols-12 pt-10 pb-20">
        {portfolioCreationInProgress ? (
          <div className="absolute top-0 left-0 w-screen h-full bg-black/90">
            <PageLoader />
          </div>
        ) : (
          <div className="hidden"></div>
        )}

        <div className="col-span-2"></div>
        <div className="col-span-8 flex flex-col gap-8">
          <div className="w-full text-xs tracking-widest text-lightViolet uppercase bg-black/20 py-2 my-4">
            Personal Details
          </div>
          {/* 1st Row username and alias */}
          <div className="flex gap-10">
            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="userAlias"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Name of Trikl Page
              </label>
              <input
                type="text"
                className="rounded-lg text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
                placeholder="pseudoname, brand name, real name, or something you like"
                id="userAlias"
                required
                name={userAlias}
                value={userAlias}
                onChange={(e) => setUserAlias(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="username"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Username (should be unique)
              </label>
              <input
                type="text"
                className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
                placeholder="For your page - trikl.xyz/dapp/&#60;username&#62;"
                id="username"
                required
                name={username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 text-left">
            <label
              htmlFor="userMessage"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              About your Trikl page
            </label>
            <textarea
              className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              placeholder="This is your first impression to your followers, so capturing their attention and making it compelling is important."
              id="userMessage"
              required
              rows="3"
              name={userMessage}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            ></textarea>
          </div>

          {/* 3rd Row Twitter and Instagram */}
          <div className="flex gap-10">
            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="twitterLink"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Twitter <span className="text-xs">(optional)</span>
              </label>
              <input
                className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
                type="url"
                id="twitterLink"
                placeholder="Type your twitter link"
                name={twitterLink}
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="instagramLink"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Instagram <span className="text-xs">(optional)</span>
              </label>
              <input
                className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
                type="url"
                id="instagramLink"
                placeholder="Type your Instagram link"
                name={instagramLink}
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              />
            </div>
          </div>

          {/* 4th Row Youtube and Wallet */}
          <div className="flex gap-10">
            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="youtubeLink"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Youtube <span className="text-xs">(optional)</span>
              </label>
              <input
                className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
                type="url"
                id="youtubeLink"
                placeholder="Type your Youtube link"
                name={youtubeLink}
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-2 text-left">
              <label
                htmlFor="userWalletAddress"
                className="text-lightViolet text-base tracking-widest font-light"
              >
                Connected Wallet Address
              </label>
              <input
                className="text-gray-400 text-base bg-transparent py-2"
                type="text"
                id="userWalletAddress"
                placeholder={
                  isAuthenticated
                    ? "Your Wallet Address Shows here"
                    : "Not Authenticated, connect your wallet first"
                }
                name={userWalletAddress}
                value={userWalletAddress}
                disabled
              />
            </div>
          </div>

          <div className="w-full text-xs tracking-widest text-lightViolet uppercase bg-black/20 py-2 my-4">
            Membership Details
          </div>

          {/* /////////// Membership DETAILS ///////// */}
          {/* 1st Row Membership */}
          <div className="flex flex-col w-full gap-2 text-left">
            <label
              htmlFor="membershipCharges"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              Enter your membership fee (Matic per month)
            </label>
            <input
              type="text"
              className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              //placeholder="$1, $5, $10, $25, $1,000,000 or what you feel like"
              id="membershipCharges"
              required
              name={membershipCharges}
              value={membershipCharges}
              onChange={(e) => setMembershipCharges(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-2 text-left">
            <label
              htmlFor="whySubMsg"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              Why Should One Join As A Member?
            </label>
            <textarea
              className="rounded-lg  text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              placeholder="Describe why should one pay to become a member of your community. (Some examples: Join as a token of Gratitude for your work; You'll post exclusive content for your community members; You will post links to your live trading; You'll post Behind The Scenes content...)"
              id="whySubMsg"
              cols="30"
              required
              rows="5"
              name={whySubMsg}
              value={whySubMsg}
              onChange={(e) => setWhySubMsg(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col w-full gap-2">
            <button
              type="submit"
              className="bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold w-full text-center px-5 py-2 rounded-lg 
              ease-in-out duration-300  hover:py-3
              cursor-pointer"
            >
              {isAuthenticated ? "Submit" : "Not Authenticated"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePortfolio;
