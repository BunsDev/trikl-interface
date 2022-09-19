import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useMoralisFile, useMoralis } from "react-moralis";
import PageLoader from "../../../Elements/PageLoader";
import "./CreatePost.css";
import NotACreator from "./NotACreator";
import EditorJS from "@editorjs/editorjs";
import { Web3Storage } from "web3.storage";
import "../../../Elements/PostEditorSupport/editor.css";
import PostEditorConfig from "../../../Elements/PostEditorSupport/PostEditorConfig";

const CreatePost = () => {
  // INIT EDITOR
  const [editor, setEditor] = useState("");

  // ---------------------------- MORALIS ------------------------- //
  // Import Moralis Functions
  const { saveFile } = useMoralisFile();
  const { Moralis, isAuthenticated } = useMoralis();
  const creatorsData = useOutletContext();

  // currentUser
  const currentUser = Moralis.User.current();

  // REDIRECT AND LOADING WHILE NEW POST
  const [postingInProgress, setPostingInProgress] = useState(false);
  const navigate = useNavigate();

  const [postCID, setPostCID] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [currUsername, setCurrUsername] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  const userWalletAddress = isAuthenticated
    ? currentUser.attributes.ethAddress
    : "";

  //Setting wallet address
  useEffect(() => {
    if (isAuthenticated) {
      creatorsData.map((eachCreator) => {
        if (
          eachCreator.attributes.Creator_Address.toLowerCase() ===
            currentUser.attributes.ethAddress &&
          !isCreator
        ) {
          setIsCreator(true);
          setCurrUsername(eachCreator.attributes.Username);
          setEditor(() => new EditorJS(PostEditorConfig()));
        }
      });
    } else {
      setIsCreator(false);
    }
  }, []);

  // ----------------------- INIT MORALIS DATABASE --------------------- //
  // Creating Object
  const CreatorsPost = Moralis.Object.extend("PostCIDs");
  // Create a new instance of that class
  const userPost = new CreatorsPost();

  // ----------------------- EDITOR HANDLE SAVE --------------------- //

  const handleClick = async () => {
    setPostingInProgress(true);

    await editor
      .save()
      .then(async (outputData) => {
        console.log("Starting Upload To IPFS...");

        // START --- WEB3.STORAGE SETUP
        function getAccessToken() {
          return process.env.REACT_APP_WEB3STORAGE_TOKEN;
        }
        function makeStorageClient() {
          return new Web3Storage({ token: getAccessToken() });
        }

        // START --- UPLOADING TO IPFS WITH WEB3.STORAGE
        function makeFileObjects(dataObject, fileName) {
          const blob = new Blob([JSON.stringify(dataObject)], {
            type: "application/json",
          });
          const files = [
            new File(["contents-of-file-1"], "plain-utf8.txt"),
            new File([blob], fileName),
          ];
          return files;
        }

        async function storeFiles(files) {
          const client = makeStorageClient();
          const cid = await client.put(files);
          console.log("stored files with cid:", cid);
          return cid;
        }

        let uploadedFileName = Math.round(Math.random() * 10e10);
        const dataToBeStored = {
          outputData,
          uploadedFileName,
        };

        const fileToUpload = makeFileObjects(dataToBeStored, uploadedFileName);
        const ipfsRes = await storeFiles(fileToUpload);
        const responseUrl = `https://${ipfsRes}.ipfs.w3s.link/${uploadedFileName}`;

        ///////////////// UPLOADING TO MORALIS ////////////////////

        let isPaidString;
        if (isPaid) {
          isPaidString = "Paid";
        } else {
          isPaidString = "Free";
        }
        userPost.set("CreatorAddress", userWalletAddress);
        userPost.set("Username", currUsername);
        userPost.set("IsPaid", isPaidString);
        userPost.set("PostDataCID", responseUrl);

        await userPost.save();

        //////////// REDIRECTING TO EXPLORE PAGE ////////////
        setPostingInProgress(false);
        navigate(`/dapp/${currUsername}`);

        /////////////////////////////////////////////
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  return isAuthenticated && isCreator ? (
    <div>
      {postingInProgress ? (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/90">
          <PageLoader />
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      <div className="flex flex-col gap-5 justify-center pt-20">
        <div className="text-left mx-20 py-5 flex items-center justify-between border-b-2 border-triklGray/20">
          <h2 className="text-2xl font-semibold">
            The World Wants To Hear You!
          </h2>
          <div className="flex gap-4 items-center">
            <FreeOrPaidCheck isPaid={isPaid} setIsPaid={setIsPaid} />
            <button
              onClick={handleClick}
              className="bg-lightBlue hover:bg-triklBlue hover:text-white w-max rounded-md px-5 py-1 text-base transition-all duration-300 ease-in-out"
            >
              Publish
            </button>
          </div>
        </div>
        <div id="editorjs"></div>
      </div>
    </div>
  ) : (
    <div>
      <NotACreator />
    </div>
  );
};

export default CreatePost;

const FreeOrPaidCheck = ({ isPaid, setIsPaid }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name="isPaid"
        id="isPaid"
        value={isPaid}
        defaultChecked={isPaid}
        onChange={(e) => setIsPaid(e.target.checked)}
        className="bg-triklGray/20 border-triklGray text-triklBlue focus:ring-transparent rounded-md p-2"
      />
      <span
        className={`text-base ${isPaid ? "text-triklBlue" : "text-triklGray"} `}
      >
        Paid Post
      </span>
    </div>
  );
};
