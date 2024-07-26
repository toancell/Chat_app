import React from "react";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardUser from "./CardUser";
const AddUser = () => {
  const [search, setSearch] = useState("");
  const [listUser, setListUser] = useState([]);
  
  const handleChangeUser = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  useEffect(() => {
    const getUser = async () => {
      if (search === "") {
        return;
      }
      try {
        const URL = "/api/search-user";
        const response = await axios({
          url: URL,
          method: "POST",
          header: {
            "Content-type": "application/json",
          },
          credentials: true,
          data: { search },
        });
        if (response.data.success) {
          setListUser(response.data.data);
        }
        console.log("detail_user",response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [search]);
  
  return (
    <div className="w-full h-full">
      <div className="bg-slate-800 shadow-lg w-full py-2 px-2">
        <h1 className="text-xl font-bold text-center my-auto text-white ">
          Search user
        </h1>
      </div>
      <div className=" relative py-2 ">
        <div className="px-2">
          <input
            type="text"
            className="w-full rounded-full py-2 pr-8 px-2 focus:outline-none"
            placeholder="Search"
            name="search"
            onChange={handleChangeUser}
          />
        </div>
        <div className="absolute right-3 top-[30px] transform -translate-y-1/2 hover:scale-150 transition-transform duration-100">
          <CiSearch size={20} />
        </div>
        <div className="w-full ">
          {listUser?.length === 0 ? (
            <div className="text-md text-white px-3 py-2 text-center">
              <p>User not found</p>
            </div>
          ) : (
            <div className="flex flex-col w-full pt-2">
              {listUser.map((item) => (
                <CardUser key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
