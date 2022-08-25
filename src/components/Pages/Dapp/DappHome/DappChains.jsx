import { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import PolygonLogo from "./../../../../assets/polygon-logo.svg";

const menuItems = [
  {
    key: "0x89",
    value: "Polygon",
    icon: PolygonLogo,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: PolygonLogo,
  },
];

const DappChains = () => {
  const { isAuthenticated, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();

  const { chainId } = useChain();

  const [isMainnet, setIsMainnet] = useState(true);

  const switchNetworkFunc = async () => {
    try {
      if (isMainnet) {
        await Moralis.switchNetwork(menuItems[0].key);
      } else if (!isMainnet) {
        await Moralis.switchNetwork(menuItems[1].key);
      }
    } catch (error) {
      setIsMainnet((prev) => !prev);
    }
  };

  useEffect(() => {
    console.log("Is Mainnet ---> ", isMainnet);
    (async () => {
      if (!isWeb3Enabled) {
        await enableWeb3();
      }
    })();
    switchNetworkFunc();
  }, [isMainnet]);

  return (
    <div className="flex flex-col gap-1 items-start text-left pb-10">
      <div className="text-sm text-lightViolet">Switch Network</div>
    </div>
  );
};

export default DappChains;

{
  /* <label
htmlFor="isMainnet"
className="relative bg-transparent border-[1px] border-gray-700 w-36 h-8 rounded-full cursor-pointer"
>
<input
  type="checkbox"
  name="isMainnet"
  id="isMainnet"
  value={isMainnet}
  onChange={(e) => setIsMainnet(e.target.checked)}
  className="sr-only peer"
/>

<span
  className={`h-4/5 aspect-square absolute rounded-full top-1/2 -translate-y-1/2 left-1 transition-all duration-300
  ${isMainnet ? "bg-lightAccent" : "bg-lightViolet"}`}
></span>


<span
  className={`absolute top-1/2 -translate-y-1/2 left-10 min-w-max transition-all duration-300 ${
    isMainnet ? "text-lightAccent" : "text-lightViolet"
  }`}
>
  {isMainnet ? "Mainnet" : "Testnet"}
</span>
</label> */
}
