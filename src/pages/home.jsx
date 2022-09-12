import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";

const HomePage = () => {
  const { user, getAllStories } = useContext(GlobalContext);
  const [stories, setStories] = useState([]);

  async function getStories() {
    let user_id = sessionStorage.getItem("__user_id__");
    let data = await getAllStories();
    let allStories = data?.filter((s) => {
      return s.author !== user_id;
    });
    setStories(allStories);
  }

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mx-2 md:mx-7 lg:mx-28 px-2 md:px-10">
        <div className="text-base sm:text-lg md:text-3xl pb-5 pt-4 sm:pt-8 lg:pt-10">
          <div>
            Welcome Home, <span className="capitalize">{user.user_id}</span>!
          </div>
        </div>
        <hr></hr>
      </div>
      <section className="ml-2 md:ml-7 lg:ml-28 my-10 px-2 md:px-10">
        <div className="mb-8">
          <h2 className="font-bold text-xl md:text-3xl">Top Picks For You</h2>
        </div>
        <div className="flex flex-row flex-wrap gap-x-5">
          {stories?.map((story) => {
            return (
              <div className="flex flex-col gap-y-4" key={story.id}>
                <Link to={`/story/${story.id}`}>
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="rounded shadow-md"
                  ></img>
                </Link>
                <Link to={`/stories/${story.category.toLowerCase()}`}>
                  <span className="text-sm bg-gray-200 text-gray-500 font-medium rounded-full px-3 py-1 lowercase">
                    {story.category}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
