import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import fetchApi from "../utils/fetchApi";
import StoryForm from "../components/Story/StoryForm";
import PartList from "../components/Part/PartList";

const StoryPage = () => {
  let { id } = useParams();
  let { onAuthFail, editStoryWithId, spin, createPart, getStoryWithId } =
    useContext(GlobalContext);
  const [story, setStory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const navigate = useNavigate();

  async function getStory() {
    setStory(await getStoryWithId(id));
  }

  useEffect(() => {
    getStory();
  }, [id]);

  const onDeletePart = async (id) => {
    //console.log(id);
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.delete(`/parts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getStory();
      window.alert("Part deletion complete");
    } else {
      console.log(res.data.error);
    }
  };

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mt-12 md:mt-20 mb-5 md:mx-10 lg:mx-52 border shadow-md bg-white px-2 pt-2 md:px-4 md:pt-4 rounded">
        <div className="border-b">
          <button
            className={
              showDetails
                ? "border-b-2 p-2 border-orange-600 font-medium text-xs md:text-lg"
                : "p-2 font-medium text-xs md:text-lg"
            }
            onClick={() => {
              setShowDetails(true);
              setShowContent(false);
            }}
          >
            Story Details
          </button>
          <button
            className={
              showContent
                ? "border-b-2 p-2 border-orange-600 font-medium text-xs md:text-lg"
                : "p-2 font-medium text-xs md:text-lg"
            }
            onClick={() => {
              setShowDetails(false);
              setShowContent(true);
            }}
          >
            Table of Contents
          </button>
        </div>
        <div>
          {showDetails && (
            <StoryForm
              id={id}
              story={story}
              editStoryWithId={editStoryWithId}
            ></StoryForm>
          )}
          {showContent && (
            <div className="flex flex-col px-2">
              <div className="mt-4 border-b">
                <button
                  className="text-white border text-xs md:text-base rounded-md bg-orange-600 px-3 md:px-5 py-1 hover:bg-orange-500 mb-4"
                  onClick={() => {
                    createPart(story);
                  }}
                >
                  + New Part
                </button>
              </div>
              {story?.parts?.length > 0 ? (
                <PartList story={story} onDeletePart={onDeletePart}></PartList>
              ) : (
                <div>No parts available! Start writing.</div>
              )}
              <div className="fixed top-0 left-0 py-2 bg-gray-100 w-full border-b h-10 md:h-16">
                <div className="flex px-2 md:px-5 pb-2 justify-between items-center">
                  <div className="flex gap-x-2 md:gap-x-4">
                    <button
                      onClick={() => {
                        navigate("/mystories");
                      }}
                    >
                      <i
                        className="fa fa-caret-left fa-2x md:fa-3x"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <div className="flex flex-col text-xs md:text-sm">
                      <div className="text-gray-600">Edit Story details</div>
                      <div className="font-medium md:text-lg capitalize">
                        {story.title}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/mystories");
                      }}
                      className="block items-center font-medium text-xs md:text-sm border rounded-md bg-gray-200 px-2 md:px-10 py-1 md:py-2 hover:bg-gray-300 ml-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center font-medium text-xs md:text-sm text-white border rounded-md bg-orange-600 px-2 md:px-10 py-1 md:py-2 hover:bg-orange-500"
                    >
                      {spin ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Save</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
