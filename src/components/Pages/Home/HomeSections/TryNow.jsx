import React from "react";
import { Link } from "react-scroll";
import { MdOutlineOpenInNew } from "react-icons/md";
import { NavLink } from "react-router-dom";

const TryNow = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 pb-10">
      <header>
        <h2 className="text-xl text-left text-lightViolet font-semibold relative pb-10">
          Try It Now
        </h2>
      </header>

      <div className="bg-black/30 hover:-translate-y-2 ease-in-out duration-500 rounded-2xl py-20 flex gap-10 flex-col text-xl">
        <div className="mx-auto text-base md:text-xl text-lightViolet uppercase tracking-widest px-10 md:px-0">
          We're looking for early partners to join our platform.
        </div>

        <div className="">
          <NavLink
            to="/dapp/explore"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold w-max px-5 py-2 mb-2 rounded-lg 
              ease-in-out duration-300 
              mx-auto flex items-center gap-2
              hover:px-6 cursor-pointer"
          >
            <div>Launch dApp</div>
            <MdOutlineOpenInNew />
          </NavLink>

          <Link
            className="text-lightAccent cursor-pointer text-base"
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={700}
          >
            Join Waitlist Instead
          </Link>
        </div>

        <div className="text-sm md:text-base text-gray-500 normal-case px-10 md:px-0">
          Currently available on testnet. Help us test and improve our offering.
        </div>
      </div>
    </div>
  );
};

export default TryNow;
