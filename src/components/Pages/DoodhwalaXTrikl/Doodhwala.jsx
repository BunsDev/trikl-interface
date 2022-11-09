import React, { useEffect } from "react";
import doodhwala from "../../../assets/doodhwala.png";
import { NavLink } from "react-router-dom";
import JoinDoodhwala from "./JoinDoodhwala";

const Doodhwala = () => {
  return (
    <div className="bg-[#daf0ff] grid grid-cols-12">
      <div className="w-full h-max top-0 fixed z-40 bg-transparent">
        <DoodhwalaNav />
      </div>
      <div className="col-span-8 col-start-3">
        <Hero />
      </div>
    </div>
  );
};

export default Doodhwala;

const DoodhwalaNav = () => {
  return (
    <div className="grid grid-cols-12 mx-auto">
      <div className="col-span-8 col-start-3 flex justify-between py-3">
        <h1 className="font-poppins font-semibold text-BootcampText text-3xl">
          <NavLink to="/" target="_blank">
            TRIKL
          </NavLink>
        </h1>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl drop-shadow-sm mb-10">
        <img
          className="object-contain p-2"
          src={doodhwala}
          alt="Doodhwala Logo"
          width="150"
        />
      </div>

      <section>
        <h2 className="text-5xl md:text-6xl w-full text-black text-center font-bold">
          Doodhwala + TRIKL
        </h2>

        <div>
          <iframe
            src="https://embeds.beehiiv.com/ff59d1bf-aaf2-4f37-adc4-8450af5d4aca"
            id="doodhwalaSubIframe"
            data-test-id="beehiiv-embed"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            // style="border-radius: 4px; border: 2px solid #e5e7eb; margin: 0; background-color: transparent;"
          ></iframe>

          <button>Click here to get telegram access</button>

          <JoinDoodhwala />

          <a href="https://t.me/trikle2e" target="_blank">
            <p className="text-center md:text-right">
              <span> Join </span> the telegram group now to participate!
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};
