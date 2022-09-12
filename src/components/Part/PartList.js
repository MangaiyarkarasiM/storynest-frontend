import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const PartList = (props) => {

  return (
    <>
      {props.story?.parts.map((part) => {
        return (
          <div
            className="flex flex-col sm:flex-row justify-between items-center border-b px-5 md:px-10 py-2 md:py-4"
            key={part.id}
          >
            <div>
              <i
                className="fa fa-bars fa-2x text-gray-600"
                aria-hidden="true"
              ></i>
            </div>
            <div>
              <div className="font-medium capitalize hover:underline">
                <Link to={`/mystories/${props.story.id}/write/${part.id}`}>
                  {part.partName}
                </Link>
              </div>
              <div className="capitalize">
                {part.status} -
                <span className="ml-1">
                  {moment(new Date(part.updatedAt)).format("MMM DD, yyyy")}
                </span>
              </div>
            </div>
            <div className="flex gap-x-4 text-zinc-500">
              <span>
                <i className="fa fa-eye" aria-hidden="true"></i> - {part.view}
              </span>
              <span>
                <i className="fa fa-star" aria-hidden="true"></i> - {part.vote}
              </span>
            </div>
            <div className="flex flex-col justify-start items-center">
              <Link className="text-zinc-500" to={`/viewstory/${part.id}`}>
                <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                <small>View as reader</small>
              </Link>
              <button
                className="text-zinc-500"
                onClick={(e) => {
                  e.preventDefault();
                  let con = window.confirm(
                    `Are you sure to delete ${part.partName} part?`
                  );
                  if (con) {
                    props.onDeletePart(part.id);
                    props.getStory();
                  }
                }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                <small>Delete Part</small>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PartList;
