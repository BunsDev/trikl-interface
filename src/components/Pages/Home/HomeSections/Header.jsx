import React, { useEffect, useState } from "react";
import heroImage from "../../../../assets/trikl-hero-image.png";

const Header = () => {
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingImage((e) => (e = false));
    }, 8000);
  }, []);

  return (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row items-center md:h-[90vh] container mx-auto text-center md:text-left">
        <section className="text-white pt-16 md:pt-0 md:w-1/3 items-center mx-auto px-10 md:px-0">
          <h1 className="text-4xl md:text-6xl font-semibold pb-5">
            Get Community Support For Your Projects
          </h1>
          <sub className="text-base md:text-xl text-lightViolet capitalize">
            Let your passionate community members support your work with monthly
            membership.
          </sub>
        </section>

        <div className="flex flex-col md:flex-row items-center md:w-1/2 h-full pt-10 md:pt-0 mx-auto relative">
          <div
            className={`absolute top-0 left-0 bg-cover h-full w-full ${
              loadingImage ? "invisible" : ""
            }`}
          >
            <iframe
              src="https://my.spline.design/triklheroimagev1-127dc5ef121a0a4d8f0b91b18104d500/"
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
          </div>
          <div
            className={`flex flex-col-reverse gap-10 md:flex-col md:absolute md:top-10 md:left-0 md:h-full md:w-full ${
              loadingImage ? "" : "invisible"
            }`}
          >
            <div className="text-lightViolet/20 text-xs text-center px-10 md:px-0 uppercase tracking-widest">
              Things start moving when you give it enough time!
            </div>
            <div>
              <img
                className="h-[50vh] md:h-auto object-cover md:object-contain"
                src={heroImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
