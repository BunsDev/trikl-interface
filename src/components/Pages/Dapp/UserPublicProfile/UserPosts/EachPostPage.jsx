import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import "./eachPost.css";
import { useParams } from "react-router-dom";
import PageLoader from "../../../../Elements/PageLoader";
import Moralis from "moralis";
import axios from "axios";

const EachPostPage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [parsedHTML, setParsedHTML] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let cidUrl;

    const Posts = Moralis.Object.extend("PostCIDs");
    const query = new Moralis.Query(Posts);
    const fetchPostData = async () => {
      query.equalTo("objectId", params.id);
      const results = await query.find();
      cidUrl = results[0].attributes.PostDataCID;

      // NOW FETCHING JSON OF THAT CID
      async function getJsonData(dataUrl) {
        try {
          const response = await axios.get(dataUrl);
          const respData = response.data;
          // Converting received Response to HTML
          const edjsParser = edjsHTML();
          const html = edjsParser.parse(respData.outputData);
          setParsedHTML(html);
        } catch (error) {
          console.error(error);
        }
      }

      getJsonData(cidUrl);
    };

    try {
      fetchPostData();
      setIsLoading(false);
    } catch (error) {
      alert("Some Error Occured. ", error.message);
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <div className="w-full py-5">
      <PageLoader width="100%" color="#c489fb" />
    </div>
  ) : (
    <div>
      <div id="editorData" className="w-1/2 mx-auto py-20">
        {parsedHTML.map((eachBlock, index) => {
          return <div key={index}>{parse(eachBlock)}</div>;
        })}
      </div>
    </div>
  );
};

export default EachPostPage;
