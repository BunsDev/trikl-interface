import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Moralis } from "moralis";
import { MoralisProvider, useChain } from "react-moralis";

/////// PAGES IMPORT ////////
import Home from "./components/Pages/Home/Home";
import DappHome from "./components/Pages/Dapp/DappHome/DappHome";
import UserProfile from "./components/Pages/Dapp/UserPublicProfile/UserProfile";
import CreatePost from "./components/Pages/Dapp/Communities/CreatePost";
import MyCommunities from "./components/Pages/Dapp/Communities/MyCommunities";
import AllCommunities from "./components/Pages/Dapp/Communities/AllCommunities";
import ErrorPage from "./components/Pages/Dapp/ErrorPage";
import CreateProfileForm from "./components/Pages/Dapp/CreateProfile/CreateProfileForm";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import EachPostPage from "./components/Pages/Dapp/UserPublicProfile/UserPosts/EachPostPage";
import CreatorsBootcamp1 from "./components/Pages/Bootcamp/CreatorsBootcamp1";
import Doodhwala from "./components/Pages/DoodhwalaXTrikl/Doodhwala";

function App({ useUrl, useAppId, network, isMetamaskInstalled }) {
  const serverUrl = useUrl;
  const appId = useAppId;

  Moralis.start({ serverUrl, appId });

  return (
    <HashRouter>
      <div className="App">
        {!isMetamaskInstalled ? <MetamaskNotInstalled /> : ""}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dapp" element={<DappHome />}>
              <Route path="new-post" element={<CreatePost />} />
              <Route path="explore" element={<AllCommunities />} />
              <Route path="my-communities" element={<MyCommunities />} />
              <Route path="create-profile" element={<CreateProfileForm />} />
              <Route path="post/:id" element={<EachPostPage />} />
              <Route path=":id" element={<UserProfile network={network} />} />
            </Route>
            <Route exact path="/bootcamp" element={<CreatorsBootcamp1 />} />
            <Route exact path="/doodhwala" element={<Doodhwala />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

const MetamaskNotInstalled = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div
      className={`${
        isHidden
          ? "hidden"
          : "hidden md:block bg-lightViolet w-full text-center uppercase tracking-widest text-sm py-1 relative"
      }`}
    >
      <span>Please Install Metamask To Access All Features</span>
      <button
        className="absolute right-10 top-1/2 -translate-y-1/2"
        onClick={() => setIsHidden(true)}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};
