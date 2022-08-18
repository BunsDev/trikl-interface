import React, { useState } from "react";
import Popup from "reactjs-popup";

const JoiningError = ({ errorMessage }) => {
  const [open, setOpen] = useState(true);
  const closeModal = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="w-screen h-screen bg-black/70 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-blueAccent/70 backdrop-blur-lg drop-shadow-2xl rounded-lg w-1/2 p-10">
            <div className="text-2xl text-white pb-5">Some Error occured:</div>
            <p className="text-gray-400 pb-5">{errorMessage}</p>
            <button
              onClick={closeModal}
              className="bg-lightViolet
              text-black font-semibold w-full px-10 py-2 rounded-lg"
            >
              Close and Reload Page
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default JoiningError;
