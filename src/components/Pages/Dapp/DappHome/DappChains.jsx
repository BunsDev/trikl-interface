import { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";

const DappChains = () => {
  const { isAuthenticated, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();

  const { chainId } = useChain();
  const PolygonMainnetChainId = "0x89";
  const PolygonTestnetChainId = "0x13881";

  const switchToMainnet = async () => {
    try {
      if (chainId === PolygonMainnetChainId) {
        return alert("Already on Mainnet");
      } else {
        await Moralis.switchNetwork(PolygonMainnetChainId);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const switchToTestnet = async () => {
    try {
      if (chainId === PolygonTestnetChainId) {
        return alert("Already on Testnet");
      } else {
        await Moralis.switchNetwork(PolygonTestnetChainId);
      }
    } catch (error) {
      return alert(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-1 items-start text-left pb-10">
      <div className="text-sm text-lightViolet">Switch Network</div>
      <button
        onClick={switchToMainnet}
        className={`${
          chainId === PolygonMainnetChainId ? "text-lightAccent" : ""
        }`}
      >
        Mainnet
      </button>
      <button
        onClick={switchToTestnet}
        className={`${
          chainId === PolygonTestnetChainId ? "text-lightAccent" : ""
        }`}
      >
        Testnet
      </button>
    </div>
  );
};

export default DappChains;
