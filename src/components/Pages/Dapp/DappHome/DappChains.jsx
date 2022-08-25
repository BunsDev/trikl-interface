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
  // const { switchNetwork, chainId, chain } = useChain();
  // const { isAuthenticated } = useMoralis();
  // const [selected, setSelected] = useState({});

  // console.log("chain", chain);

  // useEffect(() => {
  //   if (!chainId) return "not connected";
  //   const newSelected = menuItems.find((item) => item.key === chainId);
  //   setSelected(newSelected);
  //   console.log("current chainId: ", chainId);
  // }, [chainId]);

  // const handleMenuClick = (e) => {
  //   console.log("switch to: ", e.key);
  //   switchNetwork(e.key);
  // };

  // const menu = (
  // <Menu onClick={handleMenuClick}>
  //   {menuItems.map((item) => (
  //     <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
  //       <span style={{ marginLeft: "5px" }}>{item.value}</span>
  //     </Menu.Item>
  //   ))}
  // </Menu>
  // );

  // if (!chainId || !isAuthenticated) return null;

  return (
    <div className="flex flex-col gap-1 items-start text-left py-5">
      <div>Select Network</div>
      <button>Mainnet</button>
      <button>Testnet</button>
    </div>
  );
};

export default DappChains;
