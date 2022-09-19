import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import "./eachPost.css";
import { useLocation } from "react-router-dom";
import PageLoader from "../../../../Elements/PageLoader";

const EachPostPage = () => {
  const location = useLocation();

  const fetchUrl = location.state.data;
  const [parsedHTML, setParsedHTML] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((resJSON) => {
        try {
          const edjsParser = edjsHTML();
          const html = edjsParser.parse(resJSON.outputData);
          setParsedHTML(html);
        } catch (error) {
          setParsedHTML("Some error occured");
        }
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div className="w-full py-5">
      <PageLoader width="100%" color="#c489fb" />
    </div>
  ) : (
    <div id="editorData" className="w-1/2 mx-auto py-20">
      <div>{parsedHTML.map((eachBlock) => parse(eachBlock))}</div>
    </div>
  );
};

export default EachPostPage;
