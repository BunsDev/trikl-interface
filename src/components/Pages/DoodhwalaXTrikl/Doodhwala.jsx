import React, { useEffect } from "react";
import doodhwala from "../../../assets/doodhwala.png";
import { NavLink } from "react-router-dom";

const Doodhwala = () => {
  return (
    <div className="bg-BootcampBg grid grid-cols-12">
      <div className="w-full h-max top-0 fixed z-40 bg-BootcampContentBg/50 backdrop-blur-lg">
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

function handleBlur() {
  console.log("document blurred");
}

function handleFocus() {
  console.log("document focused");
}

const Hero = () => {
  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  });

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-20 items-center md:h-screen font-poppins pt-20">
      <section className="flex flex-col gap-3 md:gap-6 items-start md:w-1/2 text-center md:text-left">
        <h2 className="text-5xl md:text-6xl w-full text-BootcampText font-medium">
          Doodhwala X TRIKL
        </h2>
        <div>
          <iframe
            src="https://embeds.beehiiv.com/ff59d1bf-aaf2-4f37-adc4-8450af5d4aca"
            data-test-id="beehiiv-embed"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            //style="border-radius: 4px; border: 2px solid #e5e7eb; margin: 0; background-color: transparent;"
          ></iframe>

          <a href="https://t.me/trikle2e" target="_blank">
            <p className="text-center md:text-right">
              <span> Join </span> the telegram group now to participate!
            </p>
          </a>
        </div>
      </section>
      <div className="pt-20 md:py-20">
        <img className="object-contain" src={doodhwala} alt="Purple Cow" />
      </div>
    </div>
  );
};
