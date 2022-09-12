import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";

const StoriesPage = () => {
  let { category } = useParams();
  const { getAllStories, spin, setSpin } = useContext(GlobalContext);
  const [stories, setStories] = useState([]);

  async function getStories() {
    let data = await getAllStories();
    let allStories = data?.filter((s) => {
      return String(s.category).toLowerCase() === category;
    });
    setStories(allStories);
    setSpin(false);
  }

  useEffect(() => {
    setSpin(true);
    getStories();
  }, [category]);

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mx-2 md:mx-7 lg:mx-28 px-2 md:px-10 ">
        <div className="text-base sm:text-lg md:text-3xl pb-5 pt-4 sm:pt-8 lg:pt-10">
          <div className="capitalize">{category} stories</div>
        </div>
        <hr></hr>
        <section className="my-10">
          {
            spin? <div>Processing...</div> :
            <div className="flex flex-row flex-wrap gap-x-5">
            {stories?.length>0 ? stories?.map((story) => {
              return (
                <div className="flex flex-col gap-y-4" key={story.id}>
                  <Link to={`/story/${story.id}`}>
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="rounded shadow-md"
                    ></img>
                  </Link>
                  <Link to={`/stories/${story.category}`}>
                    <span className="text-sm bg-gray-200 text-gray-500 font-medium rounded-full px-3 py-1 lowercase">
                      {story.category}
                    </span>
                  </Link>
                </div>
              );
            }):<div>OOPS! No stories available for the selected category</div>}
          </div>
          }
        </section>
      </div>
    </div>
  );
};

export default StoriesPage;
