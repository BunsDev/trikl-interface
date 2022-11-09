import React, { useEffect } from "react";
import doodhwala from "../../../assets/doodhwala.png";
import { NavLink } from "react-router-dom";
import JoinDoodhwala from "./JoinDoodhwala";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

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

      <div className="col-span-8 col-start-3">
        <JoinDoodhwala />
      </div>

      <div className="col-span-8 col-start-3 pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Doodhwala;

const DoodhwalaNav = () => {
  return (
    <div className="grid grid-cols-12 mx-auto">
      <div className="col-span-8 col-start-3 flex justify-between py-3">
        <h1 className="font-poppins font-semibold text-gray text-xl md:text-3xl text-center md:text-left w-full">
          <a
            href="https://trikl.xyz/"
            target="_blank"
            className="font-poppins font-semibold text-triklBlue"
          >
            TRIKL
          </a>

          <span className="font-light"> + </span>
          <a href="https://www.doodhwala.xyz/" target="_blank">
            Doodhwala
          </a>
        </h1>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="pt-28 flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl drop-shadow-sm mb-10">
        <img
          className="object-contain p-2"
          src={doodhwala}
          alt="Doodhwala Logo"
          width="150"
        />
      </div>

      <section className="text-center">
        <h2 className="text-base md:text-xl w-full text-black font-bold pb-4">
          Doodhwala <span className="font-light">&</span>{" "}
          <span className="text-triklBlue">TRIKL</span>{" "}
          <span className="font-light">presents</span>
        </h2>
        <h2 className="text-4xl md:text-6xl w-full text-triklBlue font-bold">
          Read & Earn Crypto
        </h2>
        <div className="w-full md:w-2/3 mx-auto pt-10">
          <span className="font-semibold">Doodhwala</span> brings to you taaza
          2-minute crypto news straight to your email and into your veins. With
          <span className="font-semibold"> TRIKL</span> you get rewarded for
          reading amazing blogs by Doodhwala.
        </div>
      </section>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl pt-10 pb-5 text-triklBlue">How It Works?</h2>
      <div className="flex flex-col md:flex-row justify-between gap-10">
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

const Footer = () => {
  return (
    <div className="text-black flex-col justify-center text-center">
      <ul className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 md:pt-5 md:pb-5">
        <li className="text-black">
          <a
            href="https://twitter.com/triklHQ"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon fontSize="large" />
          </a>
        </li>
        <div className="flex gap-10">
          <li className="hover:text-triklBlue">
            <a
              href="https://twitter.com/triklHQ"
              target="_blank"
              rel="noreferrer"
            >
              @triklHQ
            </a>
          </li>
          <li className="hover:text-triklBlue">
            <a
              href="https://twitter.com/DoodhwalaDaily"
              target="_blank"
              rel="noreferrer"
            >
              @DoodhwalaDaily
            </a>
          </li>
        </div>
      </ul>
      <hr className="w-2/3 mx-auto mt-5 border-gray-400" />

      <p className="/70 pt-5 px-5 md:px-0">
        Suggestions/Queries? Drop us an email at{" "}
        <a className="text-triklBlue" href="mailto:contact@trikl.xyz">
          contact@trikl.xyz
        </a>
      </p>
    </div>
  );
};
