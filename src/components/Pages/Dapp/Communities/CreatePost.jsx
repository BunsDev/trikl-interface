import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useMoralisFile, useMoralis } from "react-moralis";
import PageLoader from "../../../Elements/PageLoader";
import "./CreatePost.css";
import NotACreator from "./NotACreator";
import CreatePostEditor from "./CreatePostEditor";

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

  const [isCreator, setIsCreator] = useState(false);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [currUsername, setCurrUsername] = useState("");
  const [descriptionFromEditor, setDescriptionFromEditor] = useState("");
  const [isPaid, setIsPaid] = useState(true);

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

    // let embeddingUrl;
    // const longLinkReplacement = videoUrl.replace("watch?v=", "embed/");
    // const shortLinkReplacement = videoUrl.replace(
    //   "youtu.be/",
    //   "www.youtube.com/embed/"
    // );

    // if (longLinkReplacement.includes("embed")) {
    //   embeddingUrl = longLinkReplacement;
    // } else {
    //   embeddingUrl = shortLinkReplacement;
    // }

    let isPaidString;
    if (isPaid) {
      isPaidString = "Paid";
    } else {
      isPaidString = "Free";
    }

    const metadata = {
      title,
      description: descriptionFromEditor,
      videoUrl,
      // embeddingUrl,
      userWalletAddress,
      isPaidString,
      currUsername,
    };

    try {
      const result = await saveFile(
        "newPost.json",
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

      post.set("Title", ipfsData.title);
      post.set("Description", ipfsData.description);
      post.set("VideoUrl", ipfsData.videoUrl);
      // post.set("EmbedUrl", ipfsData.embeddingUrl);
      post.set("IsPaid", ipfsData.isPaidString);
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

  return isAuthenticated && isCreator ? (
    <div>
      {postingInProgress ? (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/90">
          <PageLoader />
        </div>
      ) : (
        <div className="hidden"></div>
      )}

      <h2
        className="text-4xl text-center text-lightViolet font-semibold capitalize
        w-full sticky top-0 z-40
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
            <div className="text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg">
              <CreatePostEditor
                descriptionFromEditor={descriptionFromEditor}
                setDescriptionFromEditor={setDescriptionFromEditor}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 text-left">
            <label
              htmlFor="videoLink"
              className="text-lightViolet text-base tracking-widest font-light"
            >
              Add a YouTube Video Link
            </label>
            <input
              type="url"
              className="rounded-lg text-lightAccent font-light placeholder:font-normal placeholder:text-base placeholder:text-gray-400 text-lg p-2 bg-transparent border-[1px] border-gray-700"
              placeholder="Add an unlisted video link for your exclusive community members"
              id="videoLink"
              name="videoLink"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <FreeOrPaidCheck isPaid={isPaid} setIsPaid={setIsPaid} />

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

const FreeOrPaidCheck = ({ isPaid, setIsPaid }) => {
  return (
    <label
      htmlFor="isPaid"
      className="relative bg-transparent border-[1px] border-gray-700 w-40 h-8 rounded-full cursor-pointer"
    >
      <input
        type="checkbox"
        name="isPaid"
        id="isPaid"
        value={isPaid}
        defaultChecked={isPaid}
        onChange={(e) => setIsPaid(e.target.checked)}
        className="sr-only peer"
      />
      <span className="h-4/5 aspect-square opacity-100 bg-lightViolet absolute rounded-full top-1/2 -translate-y-1/2 left-1 peer-checked:opacity-0 transition-all duration-300"></span>
      <span className="h-4/5 aspect-square opacity-0 bg-lightAccent absolute rounded-full top-1/2 -translate-y-1/2 right-1 peer-checked:opacity-100 transition-all duration-300"></span>

      <span
        className={`absolute top-1/2 -translate-y-1/2 right-5 peer-checked:right-16 min-w-max transition-all duration-300 font-light ${
          isPaid ? "text-lightAccent" : "text-lightViolet"
        }`}
      >
        {isPaid ? "Paid Post" : "Free Post"}
      </span>
    </label>
  );
};
