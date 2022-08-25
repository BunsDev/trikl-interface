import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { ethers } from "ethers";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// FOR NETWORK SWITCH
const provider = new ethers.providers.Web3Provider(window.ethereum);
let network, useUrl, useAppId;

const getChainId = async () => {
  network = (await provider.getNetwork()).chainId;
};

const checkNetworkSwitch = async () => {
  await getChainId();

  if (network === 137) {
    useUrl = process.env.REACT_APP_MORALIS_SERVER_URL_MAINNET;
    useAppId = process.env.REACT_APP_MORALIS_APPID_MAINNET;
  } else if (network === 80001) {
    useUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
    useAppId = process.env.REACT_APP_MORALIS_APPID;
  } else {
    console.log(
      "Some Error Occured. Please try connecting to Polygon Mainnet / Polygon Mumbai manually!"
    );
  }

  root.render(
    <MoralisProvider serverUrl={useUrl} appId={useAppId}>
      <App useUrl={useUrl} useAppId={useAppId} network={network} />
    </MoralisProvider>
  );
};

checkNetworkSwitch();
