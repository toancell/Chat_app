import React from "react";
import { CiSearch } from "react-icons/ci";

const AddUser = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-slate-800 shadow-lg w-full py-2 px-2">
        <h1 className="text-xl font-bold text-center my-auto text-white ">Search user</h1>
      </div>
      <div className=" relative py-2 px-2">
        <input
          type="text"
          className="w-full rounded-full py-3 pr-8 px-2 focus:outline-none"
          placeholder="Search"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-150 transition-transform duration-100">
          <CiSearch size={20}  />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
