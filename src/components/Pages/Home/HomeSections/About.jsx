import React from "react";
import ProfileIcon from "../../../../assets/profileIcon.svg";
import ShareLink from "../../../../assets/shareLink.svg";
import Community from "../../../../assets/community.png";

const About = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 pb-20">
      <h2 className="text-xl text-left text-lightViolet font-semibold relative pb-5 md:pb-0">
        How It Works
      </h2>
      <div className="flex flex-col gap-5 md:py-10 text-lighGrey text-xl">
        <AboutCards />
      </div>
    </div>
  );
};

export default About;

const AboutCards = () => {
  const cardData = [
    {
      id: 1,
      img: ProfileIcon,
      imgAlt: "Create Profile Image on Trikl",
      heading: "Create Profile",
      description:
        "Connect your Metamask wallet to create your profile on blockchain. With Trikl, Only YOU fully control your account.",
    },
    {
      id: 2,
      img: ShareLink,
      imgAlt: "Share Link Image on Trikl",
      heading: "Share Link",
      description:
        "You'll get a personalized link to your profile. Customize Profile, Create Projects, And Post Content for your audience.",
    },
    {
      id: 3,
      img: Community,
      imgAlt: "Community Support Image on Trikl",
      heading: "Community Support",
      description:
        "Get Financial Support From Your Community for sharing advice, recommendations and even for starting your next big project. Transparent way to get paid for your services.",
    },
  ];

  return cardData.map((eachCard) => (
    <section
      key={eachCard.id}
      className={`flex flex-col-reverse text-center ${
        eachCard.id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } justify-between items-center md:gap-20 pb-20 md:pb-0`}
    >
      <div
        className={`w-full md:w-2/5 aspect-square relative  ease-in-out duration-500 ${
          eachCard.id % 2 === 0 ? "hover:translate-x-4" : "hover:-translate-x-4"
        }`}
      >
        <img
          className="h-[120%] object-contain mx-auto drop-shadow-2xl"
          src={eachCard.img}
          alt={eachCard.imgAlt}
        />
      </div>
      <aside className="flex flex-col gap-5 text-left justify-start md:w-96">
        <sub className="text-lightViolet/20 text-4xl md:text-6xl">
          #{eachCard.id}
        </sub>
        <header className="text-3xl md:text-4xl text-lightAccent">
          {eachCard.heading}
        </header>
        <div className="text-base md:text-lg">{eachCard.description}</div>
      </aside>
    </section>
  ));
};
