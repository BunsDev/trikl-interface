import React, { useEffect, useState } from "react";
import {
  useMoralis,
  useChain,
  useWeb3ExecuteFunction,
  useMoralisFile,
} from "react-moralis";
// import PageLoader from "../../../Elements/PageLoader";

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
}) => {
  const { Moralis, isWeb3Enabled, enableWeb3, isAuthenticated } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  const contractProcessor = useWeb3ExecuteFunction();
  const { saveFile } = useMoralisFile();
  const contractAddress = process.env.REACT_APP_TRIKL_SMART_CONTRACT;

  useEffect(() => {
    (async () => {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
      if (chainId !== 0x13881) {
        await switchNetwork(0x13881);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  // 🆗 Ship it
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
        { base64: btoa(JSON.stringify(metadata)) },
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

  async function handleClick({ userInfo }) {
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
  }

  return (
    <div className="py-10 px-10">
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
            onClick={() => handleClick({ userInfo })}
          >
            Join
          </button>
        )}
      </div>

      {/* why join */}
      <div className="text-left text-base text-gray-400 font-light border-t-2 border-lightViolet/20">
        <p className="pb-5 pt-8 text-lg text-lightViolet">
          Exclusive Offerings for members
        </p>

        <ul className="list-disc flex flex-col gap-3">
          <li>{userInfo.Why_Message}</li>
        </ul>
      </div>
    </div>
  );
};

export default MembershipCard;

// Rinkeby - 0x1f79d8a9B2F3AAFD87F75944b3F95D29a1BAd08C

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
