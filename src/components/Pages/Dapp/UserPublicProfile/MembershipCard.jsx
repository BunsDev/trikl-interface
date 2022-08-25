import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisFile,
} from "react-moralis";
import "./UserProfile.css";

////////////// MAIN FUNCTION //////////////

const MembershipCard = ({
  userInfo,
  creatorsData,
  isJoinedMember,
  isProcessingTx,
  setIsProcessingTx,
  isCurrCreator,
  errorMessage,
  setErrorMessage,
  network,
}) => {
  const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const { saveFile } = useMoralisFile();

  let contractAddress;

  if (network === 80001) {
    contractAddress = process.env.REACT_APP_TRIKL_SMART_CONTRACT;
  } else if (network === 137) {
    contractAddress = process.env.REACT_APP_TRIKL_SMART_CONTRACT_MAINNET;
  }

  useEffect(() => {
    (async () => {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const current = new Date();
  let date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  /////////////// SAVING MEMBER TO THE CREATOR TABLE ///////////////
  const SaveMember = async (
    fromUser,
    toCreator,
    creatorUsername,
    moneyDeposited,
    onDate
  ) => {
    // Creating Object
    const CreatorsMembers = Moralis.Object.extend("Members");
    // Create a new instance of that class
    const members = new CreatorsMembers();

    //creating metadata to store on ipfs
    const metadata = {
      fromUser,
      toCreator,
      creatorUsername,
      moneyDeposited,
      onDate,
    };

    try {
      const result = await saveFile(
        "newMember.json",
        {
          base64: btoa(unescape(encodeURIComponent(JSON.stringify(metadata)))),
        },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      const dataLink = result.ipfs();
      let response = await fetch(dataLink);
      let ipfsData = await response.json();

      //SAVING THE MEMBER TO MORALIS
      members.set("From_User", ipfsData.fromUser);
      members.set("To_Creator", ipfsData.toCreator);
      members.set("From_User_Lowercase", ipfsData.fromUser.toLowerCase());
      members.set("To_Creator_Lowercase", ipfsData.toCreator.toLowerCase());
      members.set("Creator_Username", ipfsData.creatorUsername);
      members.set("Money_Deposited", ipfsData.moneyDeposited);
      members.set("On_Date", ipfsData.onDate);

      members.save();
    } catch (error) {
      alert(error.message);
    }
  };

  const [joinDisabled, setJoinDisabled] = useState(false);
  async function handleClick({ userInfo }) {
    setJoinDisabled(true);
    const creatorAddress = userInfo.Creator_Address;
    const creatorUsername = userInfo.Username;
    const membershipCharges = userInfo.Membership_charges;

    let options = {
      contractAddress: contractAddress,
      functionName: "subscribe",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_creatorAddress",
              type: "address",
            },
          ],
          name: "subscribe",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        _creatorAddress: creatorAddress,
      },
      msgValue: Moralis.Units.ETH(membershipCharges),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: async (tx) => {
        setIsProcessingTx(true);
        await tx.wait().then(async (finalTx) => {
          await SaveMember(
            finalTx.from,
            creatorAddress,
            creatorUsername,
            membershipCharges,
            date
          );

          alert(
            `Transaction Succussful -  ${finalTx.transactionHash}, Please click Ok to refresh the page`
          );
          setTimeout(() => {
            window.location.reload();
            setIsProcessingTx(false);
          }, 2000);
        });
      },
      onError: (e) => {
        let msgOnError = "";
        if (e.code === -32603) {
          msgOnError = e.data.message;
        } else {
          msgOnError = e.message;
        }
        setErrorMessage(msgOnError);
      },
    });
    setJoinDisabled(false);
  }

  return (
    <div className="py-10 px-10 text-center">
      <h3 className="text-lightViolet text-2xl">Become A Member</h3>

      <div className="py-5">
        <p className="text-3xl">{userInfo.Membership_charges}</p>
        <p className="uppercase text-lightGrey/70 text-sm tracking-widest">
          <span className="text-lightViolet font-semibold">MATIC</span> per
          month
        </p>

        {!isAuthenticated ? (
          <LoginButton />
        ) : isJoinedMember || isCurrCreator ? (
          <button
            className="bg-lightViolet/20 text-gray-400 font-semibold w-full px-10 py-2 rounded-lg 
                 mx-auto my-5"
            disabled
          >
            {isCurrCreator ? "Active" : "Joined"}
          </button>
        ) : (
          <button
            className="bg-gradient-to-tr from-violetAccent to-blueAccent
               text-baseWhite font-semibold w-full px-10 py-2 rounded-lg 
               hover:py-5
                 ease-in-out duration-500 
                 mx-auto my-5"
            disabled={joinDisabled}
            onClick={() => handleClick({ userInfo })}
          >
            Join
          </button>
        )}
      </div>

      <div className="text-left text-base text-gray-400 font-light border-t-2 border-lightViolet/20">
        <p className="pb-5 pt-8 text-lg text-center text-lightViolet">
          Membership Benefits
        </p>

        <div id="editingPreview">{parse("" + userInfo.Why_Message)}</div>
      </div>
    </div>
  );
};

export default MembershipCard;

const LoginButton = () => {
  const { isAuthenticated, authenticate, Moralis } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({ signingMessage: "Log in to Trikl" });
        await Moralis.enableWeb3();
      } catch (error) {
        alert("Some Error occured: ", error);
      }
    }
  };
  return (
    <button
      className="bg-gradient-to-tr from-violetAccent to-blueAccent
  text-baseWhite font-semibold w-full px-10 py-2 rounded-lg 
  hover:py-3
    ease-in-out duration-500 
    mx-auto my-5"
      onClick={() => login()}
    >
      Connect Wallet
    </button>
  );
};
