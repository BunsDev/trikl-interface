import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import "./eachPost.css";

const EachPostPage = () => {
  const fetchUrl =
    "https://bafybeiaqucdsmsq3w4civjeuzbnsjgxsuvra7vyjvcaqx5zqb7pbjz2fi4.ipfs.w3s.link/22840337685";
  const [fetchedData, setFetchedData] = useState([]);
  const [parsedHTML, setParsedHTML] = useState([]);

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
      });
  }, []);

  console.log("received response === ", fetchedData);
  console.log("HTML === ", parsedHTML);

  return (
    <div id="editorData" className="w-1/2 mx-auto py-20">
      <div>{parsedHTML.map((eachBlock) => parse(eachBlock))}</div>
    </div>
  );
};

export default EachPostPage;
