import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import StoryList from "../components/Story/StoryList";
import { GlobalContext } from "../context/globalContext";
import fetchApi from "../utils/fetchApi";

const MystoriesPage = () => {
  const { onAuthFail, spin, setSpin } = useContext(GlobalContext);
  const [stories, setStories] = useState([]);

  async function getAllStoriesForUser() {
    let user_id = sessionStorage.getItem("__user_id__");
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get(`/stories/author/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setStories(res.data.stories);
    } else {
      console.log(res.data.error);
    }
    setSpin(false);
  }

  useEffect(() => {
    setSpin(true);
    getAllStoriesForUser();
  }, []);

  async function onDeleteStory(id) {
    //console.log(id);
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.delete(`/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getAllStoriesForUser();
      window.alert("Story deletion complete");
    } else {
      console.log(res.data.error);
    }
  }

  return (
    <div className="sm:container sm:mx-auto mb-5">
      <div className="flex justify-between mx-4 md:mx-10 lg:mx-52 px-2 md:px-10 lg:px-5 pb-5 pt-4 sm:pt-8 lg:pt-10 text-base sm:text-lg md:text-3xl ">
        <h3 className="font-medium">My Stories</h3>
        <Link
          className="text-white border text-xs md:text-base rounded-md bg-orange-600 px-3 md:px-5 py-1 hover:bg-orange-500"
          to="/mystories/new"
        >
          + New Story
        </Link>
      </div>
      <section className="md:mx-10 lg:mx-52 border shadow-md bg-white px-2 pt-2 md:px-4 md:pt-4 rounded">
        <div className="border-b pb-2">
          <span className="border-b-2 p-2 border-orange-600 font-medium text-xs md:text-lg">
            All Stories
          </span>
        </div>
        {spin ? (
          <div className="text-center">Loading...</div>
        ) : stories?.length > 0 ? (
          <div>
            <StoryList
              stories={stories}
              onDeleteStory={onDeleteStory}
            ></StoryList>
          </div>
        ) : (
          <div>No stories! Start writing a new story</div>
        )}
      </section>
    </div>
  );
};

export default MystoriesPage;
