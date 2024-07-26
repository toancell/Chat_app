import React from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import SettingUser from "./SettingUser";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AddUser from "./AddUser";
import Avatar from "./Avatar";
const Sidebar = ({user}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  
  const [settingUser, setSettingUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const controlModal = (item) => {
    switch (item) {
      case "setting":
        setSettingUser((prev) => !prev);
        break;
      case "add":
        setAddUser((prev) => !prev);
        break;
      default:
        break;
    }
  };
  const handleLogout = async () => {
    try {
      const URL = "/api/logout";
      const response = await axios({
        url: URL,

        header: {
          "Content-type": "application/json",
        },
        credentials: true,
      });
      if (response.data.success) {
        toast.success("Log out successfully");
        dispatch(logout());
        nav("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Can't log out");
    }
  };
  return (
    <div className="w-full h-full flex ">
      <div
        className="bg-slate-200 w-16 h-full flex flex-col justify-between items-center"
        title="box-chat"
      >
        <div className="w-full">
          <NavLink
            className={({ isActive }) =>
              `flex justify-center ${
                isActive && "bg-slate-100"
              } hover:bg-slate-500 items-center py-5  text-black `
            }
            title="chat"
          >
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>
          <div
            className="flex justify-center hover:bg-slate-500 items-center py-5  text-black"
            onClick={() =>{controlModal("add")}}
          >
            <TiUserAdd size={25} />
          </div>
          <div
            onClick={() => {
              controlModal("setting");
            }}
            className="flex justify-center hover:bg-slate-500 items-center py-5  text-black"
          >
            <Avatar url={user.profile_pic} userId={user._id} />
          </div>
        </div>
        <div className="w-full">
          <div
            onClick={handleLogout}
            className="flex justify-center hover:bg-slate-500 items-center py-5  text-black"
          >
            <BiLogOut size={25} />
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
      {
        addUser && (
          <AddUser />
        )
      }
      </div>
      {settingUser && (
        <SettingUser
          onClose={() => {
            controlModal("setting");
          }}
          user={user}
        />
      )}
      
    </div>
  );
};

export default Sidebar;
