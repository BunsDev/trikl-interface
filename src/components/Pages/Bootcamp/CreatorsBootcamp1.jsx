import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Bootcamp1HeroCow from "../../../assets/bootcamp1heroCow.png";
import Bootcamp1mobile from "../../../assets/bootcamp1mobile.png";
import Bootcamp1Coder from "../../../assets/bootcamp1Coder.png";
import Bootcamp1achievingGoal from "../../../assets/bootcamp1achievingGoal.png";
import Bootcamp1Clock from "../../../assets/bootcamp1Clock.png";
import { NavLink, useNavigate } from "react-router-dom";
import PageLoader from "../../Elements/PageLoader";
import SubhenduImg from "../Bootcamp/assets/SubhenduImg.png";
import RiyaImg from "../Bootcamp/assets/riyaImg.jpg";

const CreatorsBootcamp1 = () => {
  return (
    <div className="bg-BootcampBg grid grid-cols-12">
      <div className="w-full h-max top-0 fixed z-40 bg-BootcampContentBg/50 backdrop-blur-lg">
        <BootcampNav />
      </div>
      <div className="col-span-8 col-start-3">
        <Hero />
        <What />
        <Selection />
        <RegisterForm />
        <Coaches />
        <Dates />
      </div>
    </div>
  );
};

export default CreatorsBootcamp1;

const RegisterButton = ({ children }) => {
  return (
    <div className="bg-BootcampText mx-auto md:mx-0 py-2 px-4 md:px-8 rounded-md text-white cursor-pointer w-full">
      {children}
    </div>
  );
};

const BootcampNav = () => {
  return (
    <div className="grid grid-cols-12 mx-auto">
      <div className="col-span-8 col-start-3 flex justify-between py-3">
        <h1 className="font-poppins font-semibold text-BootcampText text-3xl">
          <NavLink to="/" target="_blank">
            TRIKL
          </NavLink>
        </h1>
        <div>
          <a href="https://forms.gle/Mp21rHwbF5tERsit7" target="_blank">
            <RegisterButton>Register Now</RegisterButton>
          </a>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between gap-20 items-center md:h-screen font-poppins pt-20">
      <section className="flex flex-col gap-3 md:gap-6 items-start md:w-1/2 text-center md:text-left">
        <h2 className="text-5xl md:text-6xl w-full text-BootcampText font-medium">
          Bootcamp
        </h2>
        <h3 className="w-full uppercase tracking-[0.5rem] md:tracking-[0.8rem] text-xl md:text-2xl">
          for Creators
        </h3>
        <p className="text-base pt-4 md:pt-0">
          In a world where millions of creators upload billions of hours of
          content every single second, how can you become
          <span className="uppercase text-BootcampText">
            the purple cow
          </span>{" "}
          that stands out?
        </p>
        <p className="text-base  pb-4 md:pb-0">
          This free, intensive, creative ideation Bootcamp will help you answer
          this question. Top web3 leaders, content creators, and community
          builders will teach content creation strategies. We are kicking off
          soon!
        </p>
        <div className="w-full mx-auto text-center">
          <a href="https://forms.gle/Mp21rHwbF5tERsit7" target="_blank">
            <RegisterButton>Register Now</RegisterButton>
          </a>
        </div>
      </section>
      <div className="pt-20 md:py-20">
        <img
          className="object-contain"
          src={Bootcamp1HeroCow}
          alt="Purple Cow"
        />
      </div>
    </div>
  );
};

const What = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:h-screen py-32 md:py-0">
      <div className="">
        <img
          className="object-contain"
          src={Bootcamp1mobile}
          alt="What Is It?"
        />
      </div>
      <section className="flex flex-col items-end gap-5">
        <h2 className="text-5xl text-BootcampText font-medium w-full text-center md:text-right">
          What Is It?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            3 week Bootcamp
          </div>
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            Completely Free
          </div>
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            Taught By Top Web3 Leaders
          </div>
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            Live Classes
          </div>
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            Limited Cohort Size
          </div>
          <div className="bg-BootcampContentBg w-full h-16 md:h-20 flex items-center justify-center rounded-md mx-auto text-center hover:drop-shadow-lg transition-all duration-300 ease-in-out text-lg px-5">
            Doubt Sessions
          </div>
        </div>
      </section>
    </div>
  );
};

const Selection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-10 mb-32">
      <section className="md:w-1/2">
        <h2 className="text-5xl text-BootcampText font-medium w-full text-center md:text-left pb-5">
          Selection Process
        </h2>
        <ul className="flex flex-col gap-3 ml-5">
          <li className="list-disc">
            Only serious & ambitious participants would be selected basis of the
            application
          </li>
          <li className="list-disc">
            Candidates should be actively creating content (even if they’ve just
            started)
          </li>
          <li className="list-disc">
            Open to absolutely anyone to apply. However, priority will be given
            to those in the Web3 space
          </li>
          <li className="list-disc">
            NFTs and Merch will be given to participants. The fee for attending
            the Bootcamp is $5 (the idea is to make sure only serious applicants
            join)
          </li>
          <li className="list-disc">The program is designed to be part-time</li>
          <li className="list-disc">
            You must commit to attending each of the classes
          </li>
        </ul>
      </section>
      <div className="">
        <img
          className="object-contain"
          src={Bootcamp1Coder}
          alt="Selection Process"
        />
      </div>
    </div>
  );
};

const RegisterForm = () => {
  return (
    <div className="flex flex-col md:flex-row justify-end items-center gap-10 mb-32">
      <div className="flex justify-start md:w-1/3">
        <img
          className="object-contain"
          src={Bootcamp1achievingGoal}
          alt="Achieving Goals"
        />
      </div>

      <section className="flex flex-col items-end gap-5 md:w-2/3">
        <h2 className="text-5xl text-BootcampText font-medium w-full text-center md:text-right">
          Register Today!
        </h2>
        <p className="text-center md:text-right">
          Web3 is by the community, for the community & with the community. This
          makes you, as a creator & a community leader, one of the most crucial
          elements of the world ’s greatest global digital revolution!
        </p>
        <div className="w-full md:w-1/2 text-center">
          <a href="https://forms.gle/Mp21rHwbF5tERsit7" target="_blank">
            <RegisterButton>Register Now</RegisterButton>
          </a>
        </div>
      </section>
    </div>
  );
};

const Coaches = () => {
  const coachData = [
    {
      id: 1,
      img: SubhenduImg,
      name: "Subhendu Panigrahi",
      designation: "Co-Founder, OgClubDAO & Skillenza",
    },
    {
      id: 1,
      img: RiyaImg,
      name: "Riya Yadav",
      designation: "Content & Marketing Lead, CoinDCX",
    },
  ];

  console.log(coachData);

  return (
    <div>
      <h2 className="text-5xl text-BootcampText font-medium w-full text-center">
        Coaches
      </h2>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-20 pb-40 items-center justify-center">
        {coachData.map((eachCoach) => (
          <div
            key={eachCoach.id}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <img
              className="h-40 rounded-full drop-shadow-md"
              src={eachCoach.img}
            />
            <h2>{eachCoach.name}</h2>
            <sub>{eachCoach.designation}</sub>
          </div>
        ))}
        <div className="text-triklGray text-center md:text-left">
          More Coaches To Be Announced Soon...
        </div>
      </section>
    </div>
  );
};

const Dates = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-end items-center mb-40">
      <h2 className="text-5xl text-center md:text-left text-BootcampText font-medium pb-5 w-full">
        Dates to be announced soon!
      </h2>
      <div className="md:w-1/3 pb-10 md:pb-0">
        <img
          className="object-contain"
          src={Bootcamp1Clock}
          alt="Bootcamp Dates"
        />
      </div>
    </div>
  );
};
