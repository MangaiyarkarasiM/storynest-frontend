import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import moment from "moment";
import { GlobalContext } from "../../context/globalContext";

const Part = (props) => {
  const { createPart } = useContext(GlobalContext);
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={`inline-flex ${props.childClassName}`}>
            {props.children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-20 mt-2 w-56 md:w-76 lg:w-96 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
            <div className="px-4 overflow-x-auto overflow-y-auto text-xs text-gray-600 border-b">
              {props.story.parts?.map((part) => {
                return (
                  <Menu.Item as="div" key={part.id} style={{ borderBottom: "1px" }}>
                    <div style={{ paddingTop: "0.3rem" }}>
                      <Link
                        to={`/mystories/${props.story.id}/write/${part.id}`}
                      >
                        <div className="flex flex-col">
                          <div>{part.partName}</div>
                          <div className="capitalize">
                            {part.status} -
                            <span className="ml-1">
                              {moment(new Date(part.updatedAt)).format(
                                "MMM DD, yyyy"
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <hr className="mt-2"></hr>
                    </div>
                  </Menu.Item>
                );
              })}
            </div>
            <div className="pt-3 text-center">
              <button
                className="text-white border text-xs md:text-base rounded-md bg-orange-600 px-3 md:px-5 py-1 hover:bg-orange-500 mb-4"
                onClick={() => {
                  createPart(props.story);
                }}
              >
                + New Part
              </button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Part;
