import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../feature/authSlice";
import { UserLogout } from "../services/auth";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await UserLogout();
      dispatch(removeUser());
    } catch (error) {
      toast.error(error?.data?.message || error);
    }
  };

  return (
    <div className="navbar bg-gray-700 text-white shadow-lg px-6 py-4 fixed top-0 ">
      <div className="flex-1 flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-indigo-400 transition duration-300"
        >
          DevThunder
        </Link>
      </div>
      <div className="">
        <ul className=" flex justify-between  gap-5 px-1">
          <li>
            <Link to="/mens">Mens</Link>
          </li>
          <li>
            <Link to="/womens">Womens</Link>
          </li>

          <li>
            <Link to="/kids">Kids</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none flex items-center space-x-6">
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-red-500 text-white">
                8
              </span>
            </div>
          </div>
        </div>

        {/* User Profile or Login Button */}
        {user ? (
          <div className="flex items-center gap-4 dropdown dropdown-bottom">
            <h1 className=" font-bold">Welcome {user?.name}</h1>
            <div
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-white m-1"
              tabIndex={0}
            >
              <div className="w-10 rounded-full overflow-hidden ">
                <img
                  alt="User Avatar"
                  src={user?.photo_url?.path}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  bg-gray-700  border-2 border-white rounded-box z-1 w-52 p-2  "
            >
              <li className="font-bold cursor-pointer">
                <Link>Profile</Link>
              </li>
              <li className=" font-bold cursor-pointer">
                <Link>Orders</Link>
              </li>
              <li className=" font-bold cursor-pointer" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-primary text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-indigo-600 cursor-pointer">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
