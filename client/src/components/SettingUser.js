import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import { useEffect } from "react";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
const SettingUser = ({ onClose, user }) => {
  const dispatch = useDispatch();
  const [updateUser, setUpdateUser] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });
  // useEffect(() => {
  //   setUpdateUser((prev) => {
  //     return { ...prev, ...user };
  //   });
  // }, [user]);
  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => {
      return { ...prev, [name]: value };
    });

  };
  const handleChangeProfilePicture = async (e) => {
    const file = e.target.files[0];
    toast("Take few minutes to update profile picture")
    
    if (file) {
      try {
        const new_profile_pic = await uploadFile(file);
        setUpdateUser((prev) => ({
          ...prev,
          profile_pic: new_profile_pic?.url,
        }));
        console.log("update123",updateUser)
      } catch (err) {
        toast.error("Failed to upload profile picture");
      }
    }
    
  };
  
  const changeUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = "/api/update";
      const response = await axios({
        url: URL,
        method: "POST",
        data: updateUser,
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));
      onClose()
      toast(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed z-50 flex justify-center items-center bottom-0 right-0 left-0 top-0 m-auto w-2/3 h-[350px]  bg-blue-200 bg-opacity-45 shadow-lg rounded-md p-1 px-8">
      <div className="h-full w-full flex flex-col justify-around items-center ">
        <h1 className="text-2xl font-bold text-center underline">Profile</h1>

        <form className=" flex flex-col w-full justify-center items-center gap-4 ">
          <div className="flex items-center w-full h-full  space-x-4">
            <img
              src={updateUser.profile_pic}
              className="w-[100px] h-[100px] rounded-full border-2 border-black object-cover "
              alt="Profile Logo"
            />
            <div className="flex flex-col gap-2">
              <label className="relative cursor-pointer border-2 py-1 px-2 rounded-full  hover:bg-gray-200  ">
                <span className="border-b-1">Change profile</span>
                <input
                  type="file"
                  className="absolute w-full opacity-0 cursor-pointer"
                  onChange={handleChangeProfilePicture}
                />
              </label>
            </div>
          </div>
          <div className="w-full h-full ">
            <label htmlFor="">Name:</label>
            <input
              type="name"
              name="name"
              required
              className="outline-none border-b-2  border-black bg-transparent w-full"
              value={updateUser.name}
              onChange={handleChangeUser}
            />
          </div>

          <div className="flex justify-end gap-3 w-full h-full ">
            <button
              className="border-2 py-1 px-2 rounded-full w-[100px] hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={changeUser}
              className="border-2 py-1 px-2 rounded-full w-[100px] hover:bg-gray-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingUser;
