import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { ethers } from "ethers";

const root = ReactDOM.createRoot(document.getElementById("root"));

// FOR NETWORK SWITCH
let provider, network, useUrl, useAppId;
let isMetamaskInstalled = true;

if (window.ethereum) {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = "";
}

const getChainId = async () => {
  if (provider !== "") {
    network = (await provider.getNetwork()).chainId;
  } else {
    network = 80001;
    isMetamaskInstalled = false;
  }
};

const checkNetworkSwitch = async () => {
  await getChainId();

  if (network === 137) {
    useUrl = process.env.REACT_APP_MORALIS_SERVER_URL_MAINNET;
    useAppId = process.env.REACT_APP_MORALIS_APPID_MAINNET;
    // } else if (network === 80001) {
  } else {
    useUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
    useAppId = process.env.REACT_APP_MORALIS_APPID;
  }

  root.render(
    <MoralisProvider serverUrl={useUrl} appId={useAppId}>
      <App
        useUrl={useUrl}
        useAppId={useAppId}
        network={network}
        isMetamaskInstalled={isMetamaskInstalled}
      />
    </MoralisProvider>
  );
};

checkNetworkSwitch();
