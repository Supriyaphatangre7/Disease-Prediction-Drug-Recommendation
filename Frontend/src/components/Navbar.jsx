import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

import { useAuth } from "../store/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
 

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 sm:px-6 text-4xl ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
        
        </div>
        <Link
          to="/"
          className="text-3xl font-bold flex items-center gap-2 "
          style={{ fontFamily: "Courgette" }}>
         CuraAI<i className="fa-solid fa-heart-pulse "></i>


        </Link>
      </div>

      <div className="navbar-center hidden lg:flex text-4xl ">
        <ul className="menu menu-horizontal px-1">
          <li className="text-xl font-semibold" >
            <Link to="/" className="hover:text-white
             hover:bg-[#0F8E95] transition  rounded-lg">
              Home
            </Link>
          </li>
          <li className="text-xl font-semibold">
            <Link to="/service" className="hover:text-white
             hover:bg-[#0F8E95] transition  rounded-lg">
              Services
            </Link>
          </li>
          <li className="text-xl font-semibold">
            <Link to="/about" className="hover:text-white
             hover:bg-[#0F8E95] transition  rounded-lg">
              About
            </Link>
          </li>
          <li className="text-xl font-semibold">
            <Link to="/contact" className="hover:text-white
             hover:bg-[#0F8E95] transition  rounded-lg">
              Contact
            </Link>
          </li>
        </ul>
      </div>

     
      <div className="navbar-end flex items-center gap-2 sm:gap-4">

        {/* chatbot */}

       
 <Link to="/predict">
    <button className="flex items-center gap-2 px-4 py-2 text-xl font-semibold bg-black text-white rounded-lg hover:bg-[#0F8E95] transition">
      <FaRobot className="text-2xl" />
      Take Test
    </button>
  </Link>

      
       

        {/* Profile */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar  hover:bg-[#0F8E95] transition hover:text-white"  >
              <div className="w-10 rounded-full text-2xl border-2">
                {user?.username?.charAt(0).toUpperCase() || ":)"}{" "}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow" >
              <li className="dropdown-item disabled" style={{ color: "black" }}>
                <b>Welcome, {user?.username || "Guest"}</b>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost">
                <button className="border-2 p-2 rounded-2xl">Register</button>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-64 p-4 shadow" >
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="badge">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
