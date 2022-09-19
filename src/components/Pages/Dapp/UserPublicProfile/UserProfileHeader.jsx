import React from "react";

import Avatar from "boring-avatars";
import AvatarColors from "../../../ImportHelpers/AvatarColors";
import parse from "html-react-parser";
import "./UserProfile.css";

import { BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

const UserProfileHeader = ({ userInfo, membershipCount }) => {
  return (
    <div className="text-gray-200">
      <section className="items-center pb-10">
        <div className="pb-5 flex items-center gap-10">
          {userInfo.ProfPicUrl && userInfo.ProfPicUrl !== "" ? (
            <img
              src={userInfo.ProfPicUrl}
              className="object-contain w-20 rounded-full"
            />
          ) : (
            <Avatar
              size={100}
              name={userInfo.Username}
              variant="beam"
              colors={AvatarColors}
            />
          )}

          {/* Name section */}
          <header className="text-left w-full">
            <h2 className="text-3xl text-textColor font-semibold">
              {userInfo.Alias}
            </h2>
            <div className="text-base text-triklBlue">@{userInfo.Username}</div>
          </header>
        </div>

        {/* social links */}
        <ul className="flex justify-between text-2xl text-center items-center gap-2 text-gray-400 border-b-2 border-t-2 border-lightViolet/20">
          {/* spacer */}
          <li className="py-1 w-1/2 ease-in-out duration-300">
            <p className="text-lg font-semibold text-textColor">
              <span className="text-xl">
                {Intl.NumberFormat().format(membershipCount)}{" "}
              </span>
              <span className=""> Members</span>
            </p>
          </li>

          <div className="w-1/2 flex">
            <li
              className={`${
                userInfo.Twitter_Link
                  ? "hover:bg-lightViolet/20 p-2 flex w-full justify-center hover:text-lightViolet ease-in-out duration-500"
                  : "hidden"
              }`}
            >
              <a href={userInfo.Twitter_Link} target="_blank" rel="noreferrer">
                <BsTwitter />
              </a>
            </li>
            <li
              className={`${
                userInfo.Youtube_Link
                  ? "hover:bg-lightViolet/20 p-2 flex w-full justify-center hover:text-lightViolet ease-in-out duration-500"
                  : "hidden"
              }`}
            >
              <a href={userInfo.Youtube_Link} target="_blank" rel="noreferrer">
                <BsYoutube />
              </a>
            </li>

            <li
              className={`${
                userInfo.Instagram_Link
                  ? "hover:bg-lightViolet/20 p-2 flex w-full justify-center hover:text-lightViolet ease-in-out duration-500"
                  : "hidden"
              }`}
            >
              <a
                href={userInfo.Instagram_Link}
                target="_blank"
                rel="noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </div>
        </ul>
      </section>
      <aside className="text-left">
        <div className="pb-2 text-textColor font-semibold text-xl">
          About {userInfo.Username}
        </div>
        <div
          id="editingPreview"
          // className="font-light text-justify text-base text-gray-400"
          className="text-textColor text-base"
        >
          {parse("" + userInfo.Message)}
        </div>
      </aside>
    </div>
  );
};

export default UserProfileHeader;
