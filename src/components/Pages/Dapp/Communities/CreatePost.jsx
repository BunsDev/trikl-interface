import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { useMoralisFile, useMoralis } from "react-moralis";
import PageLoader from "../../../Elements/PageLoader";
import "./CreatePost.css";
import NotACreator from "./NotACreator";

const CreatePost = () => {
  // Import Moralis Functions
  const { saveFile } = useMoralisFile();
  const { Moralis, isAuthenticated } = useMoralis();
  const creatorsData = useOutletContext();

  // currentUser
  const currentUser = Moralis.User.current();

  // REDIRECT AND LOADING WHILE NEW POST
  const [postingInProgress, setPostingInProgress] = useState(false);
  const navigate = useNavigate();

  const [isCreator, setIsCreator] = useState(false); /////////////////////
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currUsername, setCurrUsername] = useState("");
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
        }
      });
    } else {
      setIsCreator(false);
    }
  }, []);

  //****************************** SAVING POST TO IPFS *****************************//

  // Creating Object
  const CreatorsPost = Moralis.Object.extend("Post");
  // Create a new instance of that class
  const post = new CreatorsPost();

  // uploading file to IPFS
  const uploadPost = async (event) => {
    event.preventDefault();
    //creating metadata to store on ipfs
    setPostingInProgress(true);
    const metadata = {
      title,
      description,
      userWalletAddress,
      currUsername,
    };

    try {
      const result = await saveFile(
        "newPost.json",
        { base64: btoa(JSON.stringify(metadata)) },
        {
          type: "base64",
          saveIPFS: true,
        }
      );
      const dataLink = result.ipfs();
      let response = await fetch(dataLink);
      let ipfsData = await response.json();

      post.set("Title", ipfsData.title);
      post.set("Description", ipfsData.description);
      post.set("CreatorAddress", ipfsData.userWalletAddress);
      post.set("Username", ipfsData.currUsername);

      await post.save();

      //////////// REDIRECTING TO EXPLORE PAGE ////////////
      setPostingInProgress(false);
      navigate(`/dapp/${currUsername}`);

      // spacer //
    } catch (error) {
      alert(error.message);
    }
  };

  const ReloadFunction = () => {
    window.location.reload();
  };

  return isAuthenticated && isCreator ? (
    <div>
      {postingInProgress ? (
        <div className="absolute top-0 left-0 w-screen h-full bg-black/90">
          <PageLoader />
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      <h2
        className="text-4xl text-center text-lightViolet font-semibold capitalize
        w-full sticky top-0 z-50
        backdrop-blur-md py-5"
      >
        Share Something With Your Community!
      </h2>

      {/* Form for creating envelope */}
      <form onSubmit={uploadPost} c className="grid grid-cols-12 pt-10 pb-20">
        <div className="col-span-2"></div>
        {/* left side */}
        <section className="col-span-8 flex flex-col gap-8">
          <div className="w-full flex flex-col gap-2 text-left">
            <label
              htmlFor="username"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              What Are You Thinking About?
            </label>
            <input
              type="text"
              className="rounded-lg text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              placeholder="Choose an interesting and descriptive title!"
              id="username"
              required
              name="username"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2 text-left">
            <label
              htmlFor="userMessage"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              Add some helpful details
            </label>
            <textarea
              className="rounded-lg text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              placeholder="Describe your message here. People love to hear from their community leaders."
              id="userMessage"
              cols="30"
              required
              rows="10"
              name={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full flex flex-col gap-2 text-left">
            <button
              type="submit"
              className="bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold w-full text-center px-5 py-2 rounded-lg 
              ease-in-out duration-300  hover:py-3
              cursor-pointer"
            >
              Post
            </button>
          </div>
        </section>
      </form>
    </div>
  ) : (
    <NotACreator />
  );
};

export default CreatePost;
