import React from "react";
import heroImage from "../../assets/trikl-heroImage-crypto.png";

const AnimatedBg = () => {
  return (
    <>
      <div className="">
        <img
          className="aspect-auto h-[30rem] hover:-translate-y-5 hover:scale-105 ease-in-out duration-500"
          src={heroImage}
          alt="trikl hero image - social crypto transaction"
        />
        <a
          className="hidden"
          href="https://www.freepik.com/vectors/marketing-landing-page"
        >
          Marketing landing page vector created by pikisuperstar -
          www.freepik.com
        </a>
      </div>
    </>
  );
};

export default AnimatedBg;
