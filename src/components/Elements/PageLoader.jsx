import React from "react";
import HashLoader from "react-spinners/HashLoader";

const PageLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <HashLoader color="#c489fb" loading margin={0} size={100} />
    </div>
  );
};

export default PageLoader;
