import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { animateScroll as scroll } from "react-scroll";
import { MdOutlineOpenInNew } from "react-icons/md";

import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const navLinks = [
    { name: "About", link: "about" },
    { name: "Demo", link: "productDemo" },
    { name: "Roadmap", link: "roadmap" },
    { name: "Team", link: "team" },
    { name: "Contact", link: "contact" },
  ];

  // Responsive Menu Bar
  const [isNavVisible, setIsNavVisible] = useState(false);
  const handleNavClick = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <nav
      className="text-baseWhite font-light bg-transparent top-0 z-50 sticky
    backdrop-blur-md border-b-2 border-lightBlue/10"
    >
      <div className="flex flex-col md:flex-row justify-between w-2/3 mx-auto py-5 items-center">
        {/* Trikl Logo */}
        <div className="flex justify-between w-full items-center">
          <div className="font-inter font-bold text-3xl cursor-pointer text-lightAccent">
            <div
              className=""
              onClick={() => {
                scroll.scrollToTop();
              }}
            >
              Trikl
            </div>
          </div>
          <FiMenu
            onClick={() => handleNavClick()}
            className="md:hidden text-3xl"
          />
        </div>

        {/* Right */}
        <aside
          className={`flex flex-col md:flex-row md:gap-10 py-40 md:py-0 text-lg md:text-base absolute md:relative bg-darkBlue md:bg-transparent top-0 md:top-auto
          h-screen md:h-auto w-[75vw] md:w-auto items-center
          transition-all duration-300 ease-in 
          ${
            isNavVisible
              ? "scale-x-100 opacity-100 right-0 origin-right"
              : "scale-x-0 opacity-0 right-0 origin-right"
          } 
          md:opacity-100 md:scale-100 md:right-auto -z-10 md:z-auto`}
        >
          {navLinks.map((eachItem) => (
            <Link
              key={eachItem.name}
              className="hover:text-lightAccent my-auto hover:scale-105 cursor-pointer"
              to={eachItem.link}
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}
            >
              {eachItem.name}
            </Link>
          ))}

          <div className="hover:text-lightAccent my-auto">
            <NavLink
              to="/dapp/explore"
              target="_blank"
              className="bg-gradient-to-tr from-violetAccent to-blueAccent 
            text-baseWhite font-semibold w-max px-5 py-2 rounded-lg 
              ease-in-out duration-300 
              mx-auto flex items-center gap-2
              hover:px-6 cursor-pointer"
            >
              <div>Launch dApp</div>
              <MdOutlineOpenInNew />
            </NavLink>
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
