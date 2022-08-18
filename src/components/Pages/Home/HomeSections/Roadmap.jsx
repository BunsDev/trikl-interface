import React from "react";
import RoadmapInfoDoc from "../../../ImportHelpers/RoadmapInfoDoc";

const Roadmap = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 py-10">
      <header>
        <h2 className="text-xl text-left text-lightViolet font-semibold relative pb-10">
          Roadmap
        </h2>
      </header>

      <section className="pb-10">
        <h2 className="text-3xl md:text-4xl text-lightAccent capitalize pb-10">
          A vision for the future!
        </h2>
        <div className="flex relative">
          <aside
            className="hidden md:block md:absolute left-[50%] bg-gradient-to-b from-transparent via-violetAccent to-transparent
          
          text-center text-transparent w-[2px] h-full "
          >
            .
          </aside>
          <ul className="flex flex-col gap-5 w-full md:py-10">
            {RoadmapInfoDoc.map((eachRoadmapInfo) => (
              <li
                key={eachRoadmapInfo.roadmapHeading}
                className={`flex flex-col-reverse ${
                  eachRoadmapInfo.type === "odd"
                    ? "md:flex-row gap-5"
                    : "md:flex-row-reverse gap-5"
                }`}
              >
                <div
                  className={`flex flex-col justify-center gap-2 w-full px-10 bg-black/30 rounded-xl py-16 hover:scale-105  ease-in-out duration-300 text-left 
                ${
                  eachRoadmapInfo.type === "odd"
                    ? "md:text-right hover:-translate-x-4"
                    : "md:text-left hover:translate-x-4"
                }`}
                >
                  <div className="text-2xl text-lightViolet pb-5">
                    {eachRoadmapInfo.roadmapHeading}
                  </div>
                  <div className="font-light text-lg text-lightGrey">
                    {eachRoadmapInfo.roadmapDetails}
                  </div>
                </div>
                <div className="flex flex-col justify-center w-full text-left px-10">
                  <div className="font-b text-lightViolet/20 text-2xl md:text-4xl">
                    {eachRoadmapInfo.phase}
                  </div>
                </div>
              </li>
            ))}
            <li className="text-lightGrey px-10 md:px-0">
              more being planned basis community feedback
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;
