///////////// PAID POSTS FEED //////////////

import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import parse from "html-react-parser";
import { BarLoader } from "react-spinners";
// import getVideoId from "get-video-id";

// import edjsHTML from "editorjs-html";
import EachPostCard from "./UserPosts/EachPostCard";
import "./UserPosts/eachPost.css";

const UserPostFeed = ({ userNameFromUrl, isJoinedMember, isCurrCreator }) => {
  const { Moralis } = useMoralis();
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      await getQueryForUserPost();
      setIsLoading(false);
    }, 1000);
  }, []);

  const getQueryForUserPost = async () => {
    const query = new Moralis.Query("PostCIDs");
    query.equalTo("Username", userNameFromUrl).find();
    query.equalTo("IsPaid", "Paid").find();
    query.descending("createdAt");
    const response = await query.find();
    setUserPosts(response);
  };

  return isLoading ? (
    <div className="w-full py-5">
      <BarLoader width="100%" color="#c489fb" />
    </div>
  ) : (
    <div>
      <div className="py-10 text-lightViolet text-left text-xl">
        Exclusive Member Only Posts
      </div>

      {/* DISPLAYING USER POSTS */}
      {userPosts.length === 0 ? <div>No Posts Available</div> : ""}
      {userPosts.map((eachPost) => (
        <div key={eachPost.id}>
          {isJoinedMember || isCurrCreator ? (
            <EachPostCard eachPost={eachPost} />
          ) : (
            <PostNotAccessible />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserPostFeed;

////////////// EACH POST CARD - NOT ACCESSBILE POSTS //////////////
const PostNotAccessible = () => {
  return (
    <div>
      <p className="text-lightViolet text-center text-lg pb-2">
        Sorry, Post Unavailable!
      </p>
      <div className="text-center">Join As Member To Unlock This Post!</div>
    </div>
  );
};

// const EachPostCard = ({ userPosts, isJoinedMember, isCurrCreator }) => {
//   return (
//     <div>
//       {userPosts.length === 0 ? <div>No Posts Available</div> : ""}
//       {userPosts.map((eachPost) => {
//         let postHtml;
//         const postCidLink = eachPost.attributes.PostDataCID;

//         fetch(postCidLink)
//           .then((res) => res.json())
//           .then((resJSON) => {
//             try {
//               const edjsParser = edjsHTML();
//               const html = edjsParser.parse(resJSON.outputData);
//               postHtml = html;
//             } catch (error) {
//               postHtml = "Some error occured";
//             }
//           });

//         console.log(eachPost.attributes.createdAt);
//         return (
//           <div key={eachPost.attributes.createdAt} className="w-32">
//             {postHtml}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const EachPostCard = ({ userPosts, isJoinedMember, isCurrCreator }) => {
//   // const embedUrlByTypes = {
//   //   youtube: "https://www.youtube.com/embed/",
//   //   vimeo: "https://player.vimeo.com/video/",
//   // };

//   return (
//     <div>
//       {userPosts.length === 0 ? <div>No Posts Available</div> : ""}
//       {userPosts.map((eachPost) => (
//         <div
//           key={eachPost.id}
//           className="bg-lightBlue/20 rounded-lg text-base text-left text-gray-400 mb-10 p-5"
//         >
//           {isJoinedMember || isCurrCreator ? (
//             <>
//               <p className="text-lightGrey text-2xl pt-5 border-b-2 border-lightViolet/10 pb-5">
//                 {eachPost.attributes.Title}
//               </p>
//               <div id="editingPreview" className="pt-5">
//                 {parse(eachPost.attributes.Description)}
//               </div>
//               <div
//                 className={`w-full aspect-video pt-5 ${
//                   eachPost.attributes.VideoUrl.length > 0 ? "" : "hidden"
//                 }`}
//               >
//                 {/* <iframe
//                   className="rounded-lg"
//                   width="100%"
//                   height="100%"
//                   src={`${
//                     embedUrlByTypes[
//                       getVideoId(eachPost.attributes.VideoUrl).service
//                     ]
//                   }${getVideoId(eachPost.attributes.VideoUrl).id}`}
//                   title={eachPost.attributes.Title}
//                   frameBorder="0"
//                   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe> */}
//               </div>
//             </>
//           ) : (
//             <>
//               <p className="text-lightViolet text-center text-lg pb-2">
//                 Sorry, Post Unavailable!
//               </p>
//               <div className="text-center">
//                 Join As Member To Unlock This Post!
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
