import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";

const SearchPage = () => {
  let { searchString } = useParams();
  let { getAllStories } = useContext(GlobalContext);
  const [stories, setStories] = useState([]);

  async function getStories() {
    setStories(await getAllStories());
  }

  useEffect(() => {
    getStories();
  }, [searchString]);

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mx-2 md:mx-7 lg:mx-28 my-10 px-2 md:px-10">
        {stories?.map((story) => {
          return (
            <Link to={`/story/${story.id}`} className="block w-3/5">
              <div className="flex gap-x-2 bg-white shadow-lg my-2 p-2 rounded">
                <div>
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="rounded shadow-md max-h-48"
                  ></img>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-medium text-base sm:text-lg md:text-2xl">
                    {story.title}
                  </h2>
                  <div
                    className={
                      story.status === "ongoing"
                        ? "rounded-full text-white bg-tale-400"
                        : "rounded-full text-white bg-gary-900"
                    }
                  >
                    {story.status}
                  </div>
                  <div className="flex items-center justify-start gap-x-4 text-xs text-gray-700 mt-5 mb-3">
                    <div className="flex flex-col items-center justify-start ">
                      <span className="mb-2">
                        <i
                          className="fa fa-eye text-gray-700"
                          aria-hidden="true"
                        ></i>{" "}
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
                        {story.parts?.length > 0 ? story.parts?.length : 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{story.desc}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
