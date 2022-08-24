import React from "react";

const ProductDemo = () => {
  return (
    <div className="mx-auto text-center w-[85vw] md:w-2/3 pb-20">
      <div className="text-xl text-left text-lightViolet font-semibold relative pb-5 md:pb-10">
        Product Demo
      </div>
      <h2 className="text-3xl md:text-4xl text-lightAccent capitalize">
        Watch it in action!
      </h2>
      <div className="flex justify-center gap-5 md:py-10 text-lighGrey text-xl">
        <iframe
          className="rounded-lg drop-shadow-lg h-[20rem] w-2/3"
          src="https://www.youtube.com/embed/aZwYzpvrx1I"
          title="Trikl - Product Demo"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default ProductDemo;
