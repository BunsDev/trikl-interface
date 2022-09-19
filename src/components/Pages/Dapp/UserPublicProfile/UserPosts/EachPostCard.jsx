import React, { useEffect, useState } from "react";
import edjsHTML from "editorjs-html";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import moment from "moment";
import { BarLoader } from "react-spinners";

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

  const eachCID = eachPost.attributes.PostDataCID;
  const createdAtDate = new Date(eachPost.attributes.createdAt);

  return dataFetched ? (
    <Link to={`/dapp/post/${eachPost.id}`} state={{ data: eachCID }}>
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
    </Link>
  ) : (
    <div className="w-full py-5">
      <BarLoader width="100%" color="#c489fb" />
    </div>
  );
};

export default EachPostCard;
