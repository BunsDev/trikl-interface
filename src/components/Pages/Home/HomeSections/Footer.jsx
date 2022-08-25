import React from "react";
import TriklBuildings from "../../../../assets/trikl-buildings.svg";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import { ClockLoader } from "react-spinners";
import Confetti from "react-dom-confetti";
import axios from "axios";

const Footer = () => {
  const [emailValue, setEmailValue] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingInProgress(true);
    const data = {
      Email: emailValue,
    };

    await axios({
      method: "POST",
      url: "https://sheet.best/api/sheets/6e10ded0-8c95-4764-82fd-6023fc46b3c2",
      data: data,
    })
      .then(() => {
        setSavingInProgress(false);
        setIsSaved(true);
        setEmailValue("");

        setTimeout(() => {
          setIsSaved(false);
        }, 2000);
        console.log("Saved");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="mx-auto text-center">
      <header className="mx-auto text-center w-[85vw] md:w-2/3 pb-28">
        <h2 className="text-xl text-left text-lightViolet font-semibold relative pb-10">
          Contact Us
        </h2>

        <div className="bg-black/30 rounded-2xl py-20 flex flex-col gap-5 text-xl">
          <div className="px-5 md:px-20">
            <h4 className="text-3xl md:text-4xl text-lightAccent pb-5 md:pb-20">
              Join Waitlist For Early Access!
            </h4>

            <ul className="flex flex-col gap-5 justify-center">
              <li>
                <form
                  id="waitlistForm_db"
                  className="flex flex-col md:flex-row gap-5 w-full justify-center py-5 md:py-0"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="email"
                    name="data[email]"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="w-full h-12 md:h-auto text-center rounded-lg text-darkestBlue"
                    placeholder="Type Your Email Here!"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-tr from-violetAccent to-blueAccent 
                    text-baseWhite font-semibold w-full md:w-max md:px-10 py-2 rounded-lg
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

              <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 text-lightAccent md:pt-5 md:pb-5">
                <li className="text-lightGrey">Join Our Socials</li>
                <div className="flex gap-10">
                  <li>
                    <a
                      href="https://twitter.com/triklHQ"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon fontSize="large" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://t.me/TriklHQ"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TelegramIcon fontSize="large" />
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          </div>
          <hr className="w-2/3 mx-auto border-violetAccent" />

          <p className="text-lightGrey/70 pt-5 px-5 md:px-0">
            Suggestions/Queries? Drop us an email at{" "}
            <a className="text-lightAccent" href="mailto:contact@trikl.xyz">
              contact@trikl.xyz
            </a>
          </p>
        </div>
      </header>

      <div className="">
        <img
          className="h-[20rem] md:h-[40rem] w-full object-cover object-top"
          src={TriklBuildings}
          alt="Trikl Buildings"
        />
        <a
          className="hidden"
          href="https://www.freepik.com/vectors/blockchain-cryptocurrency"
        >
          Blockchain cryptocurrency vector created by upklyak - www.freepik.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
