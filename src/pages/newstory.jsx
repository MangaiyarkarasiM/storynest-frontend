import React, { useContext } from "react";
import StoryForm from "../components/Story/StoryForm";
import { GlobalContext } from "../context/globalContext";

const NewStoryPage = () => {
  let { addStory } = useContext(GlobalContext);

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mt-12 md:mt-20 mb-5 md:mx-10 lg:mx-52 border shadow-md bg-white px-2 pt-2 md:px-4 md:pt-4 rounded">
        <div className="border-b pb-2">
          <span className="border-b-2 p-2 border-orange-600 font-medium text-xs md:text-lg">
            Story Details
          </span>
        </div>
        <div>
          <StoryForm addStory={addStory}></StoryForm>
        </div>
      </div>
    </div>
  );
};

export default NewStoryPage;
