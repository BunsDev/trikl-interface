import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";
import moment from "moment";

const EachPostCard = ({ eachPost }) => {
  const fetchUrl = eachPost.attributes.PostDataCID;

  const [dataFetched, setDataFetched] = useState(false);
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
      })
      .then((respFin) => {
        console.log(respFin);
        return setDataFetched(() => true);
      });
  }, []);

  console.log("data Fetched ===> ", eachPost.id);

  const createdAtDate = new Date(eachPost);

  return dataFetched ? (
    <NavLink to={`/dapp/post/${eachPost.id}`} target="_blank">
      <div className="bg-white hover:drop-shadow-md rounded-md p-5 mb-5 transition-all duration-300 ease-in-out">
        <h2>{parse(parsedHTML[0])}</h2>

        {parsedHTML[1] ? (
          <p className="text-base text-triklGray">{parse(parsedHTML[1])}</p>
        ) : (
          ""
        )}

        <section className="flex gap-2 items-center text-sm pb-2 pt-5 text-triklGray">
          <div>{eachPost.attributes.Username}</div>
          <div>|</div>
          <div>{moment(createdAtDate).format("DD MMM, YY")}</div>
        </section>
      </div>
    </NavLink>
  ) : (
    <div>Loading...</div>
  );
};

export default EachPostCard;
