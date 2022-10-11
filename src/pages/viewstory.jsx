import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import moment from "moment";
import fetchApi from "../utils/fetchApi";

const ViewStoryPage = () => {
  let { id } = useParams();
  let { onAuthFail, getStoryWithId, socket } = useContext(GlobalContext);
  const [story, setStory] = useState({});
  const [parts, setParts] = useState([]);
  const [stat, setStat] = useState({});
  const [isVoted, setIsVoted] = useState(false);

  const updateStat = async (shouldNotify) => {
    let token = sessionStorage.getItem("__token__");
    let user = sessionStorage.getItem("__user_id__")
    let res = await fetchApi.post(`/storystats/create`, stat, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      if(shouldNotify){
        socket.emit('like', user, story);
      }
      getStory();
    } else {
      console.log(res.data.error);
    }
  };

  const editStoryWithId = async(shouldNotify)=>{
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.put(`/stories/${story.id}`,story, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.data.statusCode === 401){
      onAuthFail();
    }else if (res.data.statusCode === 200) {
      updateStat(shouldNotify);
    } else {
      console.log(res.data.message);
    }
  }

  async function getStat(){
    let token = sessionStorage.getItem("__token__");
    let user_id = sessionStorage.getItem("__user_id__");
    let res = await fetchApi.get(`/storystats/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setStat(res.data.stats);
      setIsVoted(() => {
        let ind = false;
        if (
          res.data.stats.voters?.length > 0 &&
          res.data.stats.voters?.indexOf(user_id) >= 0
        ) {
          ind = true;
        }
        return ind;
      });
    } else {
      console.log(res.data.error);
    }
  }

  async function getStory() {
    let stry = await getStoryWithId(String(id).toLowerCase());
    setStory(stry);
    setParts(stry.parts?.filter((p)=>{return p.isPublished === true}));
    getStat();
  }

  useEffect(() => {
    getStory();
  }, [id]);

  useEffect(()=>{
    let user_id = sessionStorage.getItem("__user_id__");
    if(stat.readers?.indexOf(user_id) < 0){
        stat.readers?.push(user_id);
        story.view = stat.readers?.length;
        editStoryWithId();
      }
  },[stat,story]);

  const onVote = () => {
    let shouldNotify = false;
    let user_id = sessionStorage.getItem("__user_id__");
    let index = stat.voters?.indexOf(user_id);
    if (index >= 0) {
      stat.voters.splice(index, 1);
    } else {
      stat.voters.push(user_id);
      shouldNotify = true;
    }
    story.vote = stat.voters.length;
    editStoryWithId(shouldNotify);
  };

  return (
    <>
      <section className="bg-gray-100 py-5 shadow-md min-w-screen">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-4">
          <div>
            <img
              src={story.coverImage}
              alt={story.title}
              className="rounded-lg shadow-md"
            ></img>
          </div>
          <div className="flex flex-col items-center justify-start mt-4">
            <div className="font-bold text-lg md:text-3xl">{story.title}</div>
            <div className="flex items-center justify-start gap-x-4 text-xs text-gray-700 mt-5">
              <div className="flex flex-col items-center justify-start ">
                <span className="mb-2">
                  <i className="fa fa-eye text-gray-700" aria-hidden="true"></i>{" "}
                  Reads
                </span>
                <span className="font-bold text-sm">{story.view}</span>
              </div>
              <div className="border-l h-10"></div>
              <div className="flex flex-col items-center justify-start ">
                <span className="mb-2">
                  <i
                    className="fa fa-star text-gray-700"
                    aria-hidden="true"
                  ></i>{" "}
                  Votes
                </span>
                <span className="font-bold text-sm">{story.vote}</span>
              </div>
              <div className="border-l h-10"></div>
              <div className="flex flex-col items-center justify-start ">
                <span className="mb-2">
                  <i
                    className="fa fa-bars text-gray-700"
                    aria-hidden="true"
                  ></i>{" "}
                  Parts
                </span>
                <span className="font-bold text-sm">
                  {parts?.length > 0 ? parts?.length : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sm:container sm:mx-auto my-5">
        <section className="bg-white mx-2 md:mx-7 lg:mx-28 px-2 md:px-10 py-4 rounded-md shadow-md lg:w-1/2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
            <div className="flex flex-col py-4">
              <div className="text-lg md:text-2xl font-medium mr-8">
                Table of contents
              </div>
              <div>
              <span className="text-gray-600 mr-2">Last updated</span>
              <span className="font-medium text-gray-600">
                {moment(new Date(story.updatedAt)).format("MMM DD, yyyy")}
              </span>
              </div>
            </div>
            <div className={isVoted ? "text-orange-600" : "text-gray-700"}>
              <button onClick={onVote}>
                <i className="fa fa-star" aria-hidden="true"></i>{" "}
                {isVoted ? <span>Voted</span> : <span>Vote</span>}
              </button>
            </div>
              </div>
            {parts?.length > 0 ? (
              parts?.map((part) => {
                return (
                  <div
                    key={part.id}
                    className="block hover:bg-gray-200 rounded-md py-2"
                  >
                    <Link className="px-1" to={`/viewstory/${part.id}`}>
                      {part.partName}
                    </Link>
                  </div>
                );
              })
            ) : (<div>No parts available for reading!</div>)
            }
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewStoryPage;
