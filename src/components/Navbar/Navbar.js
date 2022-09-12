import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const browse1 = ["thriller", "fantasy", "humor", "adventure"];

const browse2 = ["horror", "fiction", "mystery"];

function Navbar() {
  const { user, onSignOut } = useContext(GlobalContext);
  const [searchString, setSearchString] = useState("");
  let navigate = useNavigate();

  const onChangeInput = (event) => {
    setSearchString(event.target.value);
    console.log(searchString);
  };

  const searchStories = () => {
    if(searchString !== ''){
      navigate(`/search/${searchString}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchStories();
    }
  }

  return (
    <Disclosure as="nav" className="bg-gray-100 border-b">
      {({ open }) => (
        <>
          <div className="px-0 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-14">
              <div className="flex-1 flex items-center justify-start">
                <div className="flex items-center">
                  <Link
                    to="/home"
                    className="text-xs sm:text-base md:text-2xl font-medium italic text-decoration-none whitespace-nowrap text-orange-500"
                  >
                    The Storynest
                  </Link>
                </div>
                <div className="right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="ml-1 sm:ml-3 md:ml-5 relative">
                    <div>
                      <Menu.Button className="bg-gray-100 flex text-sm rounded-full">
                        <div className="flex items-center gap-x-1 md:gap-x-2">
                          <span className="sr-only">Open Browse menu</span>
                          <span className="text-xs md:text-base font-medium">
                            Browse
                          </span>
                          <i
                            className="hidden sm:block pt-1 fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </div>
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
                      <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-sm shadow-md bg-gray-100 pt-1 pb-12 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="pl-3 py-2">
                          <div className="font-bold text-gray-700 text-xs md:text-sm">
                            BROWSE
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-2">
                          <div className="w-24">
                            {browse1?.map((genre) => {
                              return (
                                <Menu.Item key={genre}>
                                  <Link
                                    to={`/stories/${genre}`}
                                    className="block px-4 py-2 text-gray-800"
                                  >
                                    <span className="capitalize text-xs md:text-sm hover:font-bold hover:text-gray-900">
                                      {genre}
                                    </span>
                                  </Link>
                                </Menu.Item>
                              );
                            })}
                          </div>
                          <div>
                            {browse2?.map((genre) => {
                              return (
                                <Menu.Item key={genre}>
                                  <Link
                                    to={`/stories/${genre}`}
                                    className="block px-4 py-2 text-gray-800"
                                  >
                                    <span className="capitalize text-xs md:text-sm hover:font-bold hover:text-gray-900">
                                      {genre}
                                    </span>
                                  </Link>
                                </Menu.Item>
                              );
                            })}
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="ml-1 sm:ml-3 md:ml-8">
                  <div className="flex flex-row items-center">
                    <div className='relative flex flex-row items-center'>
                      <input
                        id="searchInput"
                        type="text"
                        placeholder="Search"
                        className="absolute left-4 sm:left-6 md:left-10 block rounded-md bg-gray-100 py-1 focus:outline-none"
                        onChange={onChangeInput}
                        onKeyDown={handleKeyDown}
                      ></input>
                      <button type="button" className="absolute left-0" onClick={searchStories}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
              <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className=" relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full ">
                      <div className="flex items-center gap-x-1 md:gap-x-2">
                        <span className="sr-only">Open write menu</span>
                        <span className="text-xs md:text-base font-medium">
                            Write
                          </span>
                        <i
                          className="hidden sm:block pt-1 fa fa-caret-down"
                          aria-hidden="true"
                        ></i>
                      </div>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/mystories/new`}
                          className="block px-4 py-2 text-gray-800 text-xs md:text-sm hover:font-bold hover:text-gray-900"
                        >
                          Create a new story
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                      <Link
                          to={`/mystories`}
                          className="block px-4 py-2 text-gray-800 text-xs md:text-sm hover:font-bold hover:text-gray-900"
                        >
                          My Stories
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>  
              <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className=" relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full ">
                      <div className="flex items-center gap-x-1 md:gap-x-2">
                        <span className="sr-only">Open user menu</span>
                        <i
                          className="fa fa-user-circle-o fa-2x"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="hidden sm:block pt-1 fa fa-caret-down"
                          aria-hidden="true"
                        ></i>
                      </div>
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Link
                          to={`/user/${user.user_id}`}
                          className="block px-4 py-2 text-gray-800 capitalize text-xs md:text-sm hover:font-bold hover:text-gray-900"
                        >
                          My Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <div className="block px-4 py-2 text-gray-800 capitalize text-xs md:text-sm hover:font-bold hover:text-gray-900">
                          <button onClick={onSignOut}>Log out</button>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
              </div>

        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
