import React from "react";
import book from "../assets/book.svg";
import { Link, useNavigate } from "react-router-dom";

function HeaderLayout({ children }) {
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    alert("Rostdan ham chiqmoqchimisiz");
    navigate("/login");
  }
  return (
    <div className=" mb-4">
      <header className="flex justify-between mx-24 my-5 items-center ">
        <div className="flex gap-2 items-center">
          <img className="cursor-pointer" src={book} alt="" />
          <h3 className="cursor-pointer">Books</h3>
        </div>
        <div>
          <Link className="hover:underline py-1 duration-300" to="/">
            Home
          </Link>
        </div>
        <div>
          <button
            className="p-3 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all duration-300"
            onClick={handleClick}
          >
            LOG OUT
          </button>
        </div>
      </header>
      <main>{children}</main>

      <footer className="flex gap-3 justify-between mx-28 m-4 cursor-pointer ">
        <nav className="flex flex-col gap-2">
          <h6 className="text-gray-600 text-2xl">Services</h6>
          <a className="text-gray-500">Branding</a>
          <a className="text-gray-500">Design</a>
          <a className="text-gray-500">Marketing</a>
          <a className="text-gray-500">Advertisement</a>
        </nav>
        <nav className="flex flex-col gap-2">
          <h6 className="text-gray-600 text-2xl">Company</h6>
          <a className="text-gray-500">About us</a>
          <a className="text-gray-500">Contact</a>
          <a className="text-gray-500">Jobs</a>
          <a className="text-gray-500">Press kit</a>
        </nav>
        <nav className="flex flex-col gap-2">
          <h6 className="text-gray-600 text-2xl">Legal</h6>
          <a className="text-gray-500">Terms of use</a>
          <a className="text-gray-500">Privacy policy</a>
          <a className="text-gray-500">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
}

export default HeaderLayout;
