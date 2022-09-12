import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Part from "../Part/Part";
import moment from "moment";

const StoryList = (props) => {
  return (
    <>
      {props.stories?.map((story) => {
        return (
          <Fragment key={story.id}>
            <div className="flex gap-x-4 py-1 sm:py-2 md:py-4 px-4 sm:px-8 md:px-16 lg:px-8 xl:px-16 border-b">
              <Link
                className="block w-3/5 flex gap-x-2"
                to={`/mystories/${story.id}`}
              >
                <div className="w-1/3">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    style={{ minHeight: "10rem", maxHeight: "10rem" }}
                  ></img>
                </div>
                <div className="w-2/3">
                  <h2 className="font-medium text-sm md:text-xl">
                    {story.title}
                  </h2>
                  <p className="text-sm md:text-base">
                    {story.parts?.length} Part(s)
                  </p>
                  <div className="text-sm md:text-base">
                    Updated {moment(new Date(story.updatedAt)).fromNow()}
                  </div>
                  <div className="flex gap-x-4 text-zinc-500">
                    <span>
                      <i className="fa fa-eye" aria-hidden="true"></i> -{" "}
                      {story.view > 0 ? story.view : ""}
                    </span>
                    <span>
                      <i className="fa fa-star" aria-hidden="true"></i> -{" "}
                      {story.vote > 0 ? story.vote : ""}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="w-2/5">
                <div className="mb-2">
                  <Part
                    story={story}
                    creatPart={props.creatPart}
                    childClassName="text-white border text-xs md:text-base rounded-md bg-orange-600 px-3 md:px-6 py-1 hover:bg-orange-500"
                  >
                    <span className="hidden md:block">
                      Continue writing<span className="md:mx-2">|</span>{" "}
                    </span>
                    <i className="fa fa-caret-down fa-2x" aria-hidden="true"></i>
                  </Part>
                </div>
                <div className="mb-2">
                  <Link
                    className="text-zinc-500"
                    to={`/story/${story.id}`}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                    <small>View as reader</small>
                  </Link>
                </div>
                <div>
                  <button
                    className="text-zinc-500"
                    onClick={(e) => {
                      e.preventDefault();
                      let con = window.confirm(
                        `Are you sure to delete ${story.title} story?`
                      );
                      if (con) {
                        props.onDeleteStory(story.id);
                      }
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                    <small>Delete Story</small>
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default StoryList;
