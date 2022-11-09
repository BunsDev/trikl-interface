import React, { useEffect } from "react";
import doodhwala from "../../../assets/doodhwala.png";
import { NavLink } from "react-router-dom";
import JoinDoodhwala from "./JoinDoodhwala";

const Doodhwala = () => {
  return (
    <div className="bg-[#daf0ff] grid grid-cols-12 pb-20">
      <div className="w-full h-max top-0 fixed z-40 bg-white/30 backdrop-blur-sm">
        <DoodhwalaNav />
      </div>
      <div className="col-span-8 col-start-3">
        <Hero />
      </div>

      <div className="col-span-8 col-start-3">
        <HowItWorks />
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

      <section className="text-center">
        <h2 className="text-5xl md:text-6xl w-full text-black font-bold">
          Doodhwala + TRIKL
        </h2>
        <div className="w-2/3 mx-auto pt-10">
          <span className="font-semibold">Doodhwala</span> brings to you taaza
          2-minute crypto news straight to your email and into your veins. With
          <span className="font-semibold"> TRIKL</span> you get rewarded for
          reading amazing blogs by Doodhwala.
        </div>

        {/* <div>
          <iframe
            src="https://embeds.beehiiv.com/ff59d1bf-aaf2-4f37-adc4-8450af5d4aca"
            id="doodhwalaSubIframe"
            data-test-id="beehiiv-embed"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
          ></iframe>

          <button>Click here to get telegram access</button>

          <JoinDoodhwala />

          <a href="https://t.me/trikle2e" target="_blank">
            <p className="text-center md:text-right">
              <span> Join </span> the telegram group now to participate!
            </p>
          </a>
        </div> */}
      </section>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl pt-10 pb-5 text-triklBlue">How It Works</h2>
      <div className="flex justify-between gap-10">
        <div className="bg-white/50 py-5 w-full rounded-lg hover:bg-white transition-all duration-300 ease-in-out">
          <div className="font-semibold pb-2">1. Fill Form</div>
          <div className="px-5 text-gray-500 hover:text-black">
            You'll be added to private Telegram Group
          </div>
        </div>
        <div className="bg-white/50 py-5 w-full rounded-lg hover:bg-white transition-all duration-300 ease-in-out">
          <div className="font-semibold pb-2">2. Engage On Telegram</div>
          <div className="px-10 text-gray-500 hover:text-black">
            Engage on private Telegram group to earn points.
          </div>
        </div>
        <div className="bg-white/50 py-5 w-full rounded-lg hover:bg-white transition-all duration-300 ease-in-out">
          <div className="font-semibold pb-2">3. Earn Rewards</div>
          <div className="px-5 text-gray-500 hover:text-black">
            Earn Crypto &#40;Stablecoins&#41; for genuine engagement.
          </div>
        </div>
      </div>
    </div>
  );
};
