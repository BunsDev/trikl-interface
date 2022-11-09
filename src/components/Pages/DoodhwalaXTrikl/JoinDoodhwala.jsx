import React from "react";
// import TriklBuildings from "../../../../assets/trikl-buildings.svg";

import { useState } from "react";
import { ClockLoader } from "react-spinners";
import Confetti from "react-dom-confetti";
import axios from "axios";

const JoinDoodhwala = () => {
  const [data, setData] = useState({
    name: "",
    telegram: "",
    email: "",
  });
  const [savingInProgress, setSavingInProgress] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // CONFETTI
  const confettiConfig = {
    angle: 90,
    spread: "45",
    startVelocity: "19",
    elementCount: "46",
    dragFriction: 0.12,
    duration: "4370",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "847px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingInProgress(true);

    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/812d7f1f-3894-4b6d-bb4d-7cc354b00042",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        setSavingInProgress(false);
        setIsSaved(true);
        setData({
          name: "",
          telegram: "",
          email: "",
        });

        setTimeout(() => {
          setIsSaved(false);
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mx-auto text-center">
      <header className="mx-auto text-center w-full md:w-2/3">
        <h4 className="text-xl pt-10 pb-5 text-triklBlue">
          Start Reading, Start Earning!
        </h4>

        <div
          className="bg-white/50 hover:bg-white rounded-2xl py-10 flex flex-col gap-5 text-xl
        transition-all duration-300 ease-in-out"
        >
          <div className="px-5 md:px-20">
            <ul className="flex flex-col gap-5 justify-center">
              <p className="text-sm text-gray-500">
                Submit your details to get added to Doodhwala's blog
                subscription and exclusive Telegram Group to win Crypto rewards!
              </p>
              <li>
                <form
                  id="waitlistForm_db"
                  className="flex flex-col gap-5 w-full justify-center py-5"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full h-12 md:h-auto text-center rounded-lg text-darkestBlue"
                    placeholder="What should we call you?"
                  />
                  <input
                    type="text"
                    name="telegram"
                    value={data.telegram}
                    onChange={handleChange}
                    className="w-full h-12 md:h-auto text-center rounded-lg text-darkestBlue"
                    placeholder="Type Your Telegram ID Here!"
                  />
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full h-12 md:h-auto text-center rounded-lg text-darkestBlue"
                    placeholder="Type Your Email Here!"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-tr from-violetAccent to-blueAccent mx-auto
                    text-baseWhite font-semibold w-full  md:px-10 py-2 rounded-lg
                    md:hover:px-12 ease-in duration-200 md:origin-right"
                  >
                    Submit
                  </button>
                </form>
                <Confetti
                  className="absolute top-1/2 left-1/2"
                  active={savingInProgress}
                  config={confettiConfig}
                />

                {savingInProgress ? (
                  <div className="text-lightAccent text-base md:pt-4 flex gap-2 items-center justify-center">
                    <ClockLoader color="#4ee7ff" loading margin={0} size={20} />
                    <span>Saving, Please Wait...</span>
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}

                {isSaved ? (
                  <div className="text-lightAccent text-base md:pt-4 flex gap-2 items-center justify-center">
                    Saved Successfully!
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default JoinDoodhwala;
