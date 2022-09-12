import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import fetchApi from "../utils/fetchApi";

const ViewPartPage = () => {
  let { id } = useParams();
  let { onAuthFail, getStoryWithId, getPartWithId } = useContext(GlobalContext);
  const [story, setStory] = useState({});
  const [part, setPart] = useState({});
  const [stat, setStat] = useState({});
  const [isVoted, setIsVoted] = useState(false);
  const navigate = useNavigate();

  const updateStat = async () => {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.post(`/partstats/create`, stat, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getStoryAndPart();
    } else {
      console.log(res.data.error);
    }
  };

  const editPartWithId = async () => {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.put(`/parts/${part.id}`, part, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      updateStat();
    } else {
      console.log(res.data.error);
    }
  };

  async function getStat(partId, storyId) {
    let token = sessionStorage.getItem("__token__");
    let user_id = sessionStorage.getItem("__user_id__");
    let res = await fetchApi.get(`/partstats/${partId}_${storyId}`, {
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

  async function getStoryAndPart() {
    let pa = await getPartWithId(id);
    setPart(pa);
    setStory(await getStoryWithId(pa.story_id));
    getStat(pa.id, pa.story_id);
  }

  useEffect(() => {
    getStoryAndPart();
  }, [id]);

  useEffect(()=>{
    let user_id = sessionStorage.getItem("__user_id__");
    if(stat.readers?.indexOf(user_id) < 0){
        stat.readers?.push(user_id);
        part.view = stat.readers?.length;
        editPartWithId();
      }
  },[stat,part])

  const onVote = () => {
    let user_id = sessionStorage.getItem("__user_id__");
    let index = stat.voters?.indexOf(user_id);
    if (index >= 0) {
      stat.voters.splice(index, 1);
    } else {
      stat.voters.push(user_id);
    }
    part.vote = stat.voters.length;
    editPartWithId();
  };

  return (
    <>
      <div className="top-14 py-1 md:py-2 bg-gray-100 w-full shadow h-10 md:h-16">
        <div className="flex justify-between items-center px-2 md:px-4 pb-1 md:pb-2">
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <i
                className="fa fa-caret-left fa-2x md:fa-3x"
                aria-hidden="true"
              ></i>
            </button>
            <div>
              <img
                src={story.coverImage}
                alt={story.title}
                className="max-h-7 md:max-h-12"
              ></img>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-sm md:text-base">
                {story.title}
              </div>
              <div className="text-xs md:text-sm">by {story.author}</div>
            </div>
            <div className="border-l h-10"></div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="border-l h-10"></div>
            <div className={isVoted ? "text-orange-600" : "text-gray-700"}>
              <button onClick={onVote}>
                <i className="fa fa-star" aria-hidden="true"></i>{" "}
                {isVoted ? <span>Voted</span> : <span>Vote</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:container sm:mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 py-4">
          <div className="flex flex-col items-center justify-start mt-4">
            <div className="font-bold text-lg md:text-3xl">{part.partName}</div>
            <div className="flex items-center justify-start gap-x-4 text-xs text-gray-700 mt-5">
              <div className="flex flex-col items-center justify-start ">
                <span className="mb-2">
                  <i className="fa fa-eye text-gray-700" aria-hidden="true"></i>{" "}
                  Reads
                </span>
                <span className="font-bold text-sm">{part.view}</span>
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
                <span className="font-bold text-sm">{part.vote}</span>
              </div>
            </div>
            <div className="mt-4 text-sm md:text-base">
              <span className="text-gray-700">by </span>
              <span className="text-orange-500">{story.author}</span>
            </div>
          </div>
        </div>
        <hr className="w-3/5 mx-auto"></hr>
        <div className="w-3/5 mx-auto my-2 p-3 min-h-screen">
          {part.content}
        </div>
      </div>
    </>
  );
};

export default ViewPartPage;
