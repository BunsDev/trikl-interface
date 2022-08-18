import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Moralis } from "moralis";

/////// PAGES IMPORT ////////
import Home from "./components/Pages/Home/Home";
import DappHome from "./components/Pages/Dapp/DappHome/DappHome";
import UserProfile from "./components/Pages/Dapp/UserPublicProfile/UserProfile";
import CreatePost from "./components/Pages/Dapp/Communities/CreatePost";
import MyCommunities from "./components/Pages/Dapp/Communities/MyCommunities";
import AllCommunities from "./components/Pages/Dapp/Communities/AllCommunities";
import ErrorPage from "./components/Pages/Dapp/ErrorPage";
import CreateProfileForm from "./components/Pages/Dapp/CreateProfile/CreateProfileForm";

function App() {
  const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
  const appId = process.env.REACT_APP_MORALIS_APPID;

  Moralis.start({ serverUrl, appId });

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dapp" element={<DappHome />}>
              <Route path="new-post" element={<CreatePost />} />
              <Route path="explore" element={<AllCommunities />} />
              <Route path="my-communities" element={<MyCommunities />} />
              <Route path=":id" element={<UserProfile />} />
              <Route path="create-profile" element={<CreateProfileForm />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
