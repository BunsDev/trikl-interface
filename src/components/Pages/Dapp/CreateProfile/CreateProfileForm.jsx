import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../Elements/PageLoader";
import AlreadyACreator from "./AlreadyACreator";
import FormInput from "./FormInput";
import AboutMessageBox from "./AboutMessageBox";
import WhyJoinEditor from "./WhyJoinEditor";
import WalletNotConnected from "../WalletNotConnected";

const CreateProfileForm = () => {
  // Import Moralis Functions
  const { saveFile } = useMoralisFile();
  const { Moralis, account, user, isAuthenticated } = useMoralis();

  const navigate = useNavigate();

  // other state variables
  const [portfolioCreationInProgress, setPortfolioCreationInProgress] =
    useState(false);
  const [creatorUsername, setCreatorUsername] = useState("");
  const userWalletAddress = isAuthenticated ? user.attributes.ethAddress : "";

  const [isCurrCreator, setIsCurrCreator] = useState(false);

  ////////////// basic form controls //////////////

  const [aboutMsg, setAboutMsg] = useState("");
  const [whyJoin, setWhyJoin] = useState("");

  const [values, setValues] = useState({
    userAlias: "",
    username: "",
    userMessage: "",
    twitterLink: "",
    instagramLink: "",
    youtubeLink: "",
    userWalletAddress,
    membershipCharges: "",
    whySubMsg: "",
  });

  const inputs = [
    {
      id: "userAlias",
      name: "userAlias",
      type: "text",
      TagType: "input",
      placeholder: "pseudoname, brand name, real name, or something you like",
      errorMessage: "Name should not contain any number or special characters.",
      label: "Name of Trikl Page",
      pattern: "^[a-zA-Z0-9_ ]{3,}$",
      required: true,
    },
    {
      id: "username",
      name: "username",
      type: "text",
      TagType: "input",
      placeholder: "For your page - trikl.xyz/dapp/<username>",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special characters.",
      label: "Username (should be unique)",
      pattern: "^[a-zA-Z0-9]{3,16}$",
      required: true,
    },
    {
      id: "userMessage",
      name: "userMessage",
      type: "text",
      TagType: "textarea",
      placeholder:
        "This is your first impression to your followers, so capturing their attention and making it compelling is important.",
      errorMessage: "Ideally, should be 100-500 character long.",
      label: "About your Trikl page",
      required: true,
    },
    {
      id: "twitterLink",
      name: "twitterLink",
      type: "url",
      TagType: "input",
      placeholder: "Link your twitter profile",
      label: "Twitter",
      required: false,
    },
    {
      id: "instagramLink",
      name: "instagramLink",
      type: "url",
      TagType: "input",
      placeholder: "Link your instagram profile",
      label: "Instagram",
      required: false,
    },
    {
      id: "youtubeLink",
      name: "youtubeLink",
      type: "url",
      TagType: "input",
      placeholder: "Link your youTube profile",
      label: "YouTube",
      required: false,
    },
    {
      id: "userWalletAddress",
      name: "userWalletAddress",
      value: userWalletAddress,
      disabled: true,
      type: "text",
      TagType: "input",
      placeholder: isAuthenticated
        ? "Your Wallet Address Shows here"
        : "Not Authenticated, connect your wallet first",
      errorMessage: "Your Metamask wallet must be connected with Trikl website",
      label: "Connected Wallet Address",
      required: true,
      classNameFromInput: "text-gray-400 text-base bg-transparent py-2",
    },
    {
      id: "membershipCharges",
      name: "membershipCharges",
      type: "number",
      TagType: "input",
      placeholder: "0.1, 0.5, 1.0, 5.0, etc. (in MATIC) ",
      errorMessage: "Should be a valid number (with or without decimal).",
      label: "Enter your membership fee (MATIC per month)",
      step: "any",
      required: true,
    },
    {
      id: "whySubMsg",
      name: "whySubMsg",
      type: "text",
      TagType: "textarea",
      placeholder:
        "Tell your potential member, why they should pay to join your community. (Some examples: Join as a token of Gratitude; I'll post exclusive content; I'll post links to live trading sessions...)",
      errorMessage: "Ideally, should be 100-500 character long.",
      label: "Why Should One Join As A Member?",
      row: 6,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: [e.target.value],
      // userMessage: aboutMsg,
      // whySubMsg: whyJoin,
    });
  };
  ////////////// basic form controls //////////////

  //****************************** SAVING CREATOR TO DATABASE *****************************//
  //Checking for the duplicate creator
  useEffect(() => {
    async function Test() {
      const query = new Moralis.Query("Creator");

      if (isAuthenticated) {
        query.equalTo("Creator_Address", userWalletAddress);
        const results = await query.find();

        if (
          results.length > 0 &&
          userWalletAddress === results[0].attributes.Creator_Address
        ) {
          setIsCurrCreator(true);
          setCreatorUsername(results[0].attributes.Username);
        }
      }
    }
    Test();
  }, []);

  // Creating Object and a new instance of that class
  const CreatorsPortfolio = Moralis.Object.extend("Creator");
  const creator = new CreatorsPortfolio();

  // uploading file to IPFS
  const uploadUser = async (event) => {
    event.preventDefault();

    setPortfolioCreationInProgress(true);

    // const aliasArray = userAlias.split();
    // const userMessageArray = userMessage.split();

    //creating metadata to store on ipfs
    // const metadata = values;

    const metadata = {
      ...values,
      userMessage: aboutMsg,
      whySubMsg: whyJoin,
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
      query.equalTo("Username", ipfsData.username[0]);
      const results = await query.find();
      const count = await query.count();

      if (count === 0) {
        //Setting up the creator row
        creator.set("Alias", ipfsData.userAlias[0]);
        creator.set("Username", ipfsData.username[0]);
        creator.set("Message", ipfsData.userMessage);
        creator.set("Twitter_Link", ipfsData.twitterLink[0]);
        creator.set("Instagram_Link", ipfsData.instagramLink[0]);
        creator.set("Youtube_Link", ipfsData.youtubeLink[0]);
        creator.set("Membership_charges", ipfsData.membershipCharges[0]);
        creator.set("Why_Message", ipfsData.whySubMsg);
        creator.set("Creator_Address", ipfsData.userWalletAddress);

        creator.save();
      } else {
        alert("Username already exists, Please try something else");
      }

      setPortfolioCreationInProgress(false);
      navigate(`/dapp/${values.username}`);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  //****************************** MAIN RETURN STATEMENT START HERE *****************************//

  return !isAuthenticated ? (
    <WalletNotConnected />
  ) : isCurrCreator ? (
    <AlreadyACreator creatorUsername={creatorUsername} />
  ) : (
    <form onSubmit={uploadUser} className="w-full mx-auto py-10">
      <h2
        className="text-4xl text-center text-lightViolet font-semibold capitalize
        w-full sticky top-0 z-50
        backdrop-blur-md py-5"
      >
        Start Your Community!
      </h2>

      {portfolioCreationInProgress ? (
        <div className="absolute top-0 z-50 left-0 w-screen h-full bg-black/90">
          <PageLoader />
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>

        <div className="col-span-8 flex flex-col gap-8 py-10">
          <div className="w-full text-center text-xs tracking-widest text-lightViolet uppercase bg-black/20 py-2 my-4">
            Personal Details
          </div>

          <div className="flex gap-10">
            <FormInput
              key={inputs[0].id}
              {...inputs[0]}
              value={values[inputs[0].name]}
              onChange={onChange}
            />
            <FormInput
              key={inputs[1].id}
              {...inputs[1]}
              value={values[inputs[1].name]}
              onChange={onChange}
            />
          </div>
          {/* <FormInput
            key={inputs[2].id}
            {...inputs[2]}
            value={values[inputs[2].name]}
            onChange={onChange}
          /> */}

          <div className="text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg">
            <label className="text-lightViolet text-base tracking-widest font-light">
              {inputs[2].label}
            </label>
            <AboutMessageBox aboutMsg={aboutMsg} setAboutMsg={setAboutMsg} />
          </div>

          <div className="flex gap-10">
            <FormInput
              key={inputs[3].id}
              {...inputs[3]}
              value={values[inputs[3].name]}
              onChange={onChange}
            />
            <FormInput
              key={inputs[5].id}
              {...inputs[5]}
              value={values[inputs[5].name]}
              onChange={onChange}
            />
          </div>

          <div className="flex gap-10">
            <FormInput
              key={inputs[4].id}
              {...inputs[4]}
              value={values[inputs[4].name]}
              onChange={onChange}
            />
            <FormInput
              key={inputs[6].id}
              {...inputs[6]}
              value={values[inputs[6].name]}
              onChange={onChange}
            />
          </div>

          <div className="w-full text-center text-xs tracking-widest text-lightViolet uppercase bg-black/20 py-2 my-4">
            Membership Details
          </div>

          <FormInput
            key={inputs[7].id}
            {...inputs[7]}
            value={values[inputs[7].name]}
            onChange={onChange}
          />
          {/* <FormInput
            key={inputs[8].id}
            {...inputs[8]}
            value={values[inputs[8].name]}
            onChange={onChange}
          /> */}
          <div className="text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg">
            <label className="text-lightViolet text-base tracking-widest font-light">
              {inputs[8].label}
            </label>
            <WhyJoinEditor whyJoin={whyJoin} setWhyJoin={setWhyJoin} />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-tr from-violetAccent to-blueAccent
            text-baseWhite font-semibold text-center
            w-full  px-5 py-2 rounded-lg
            ease-in-out duration-300 hover:py-3 cursor-pointer
            disabled:bg-gradient-to-tr disabled:from-violetAccent/20 disabled:to-blueAccent/20 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={isAuthenticated ? false : true}
          >
            {isAuthenticated ? "Join As A Creator" : "Connect Wallet First!"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProfileForm;
