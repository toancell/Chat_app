import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout} from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import AddUser from "./AddUser";
import Avatar from "./Avatar";
import CardUser from "./CardUser";
import SettingUser from "./SettingUser";

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const socketConnection = useSelector((state) => state.user.socketConnection);
  const [allUser, setAllUser] = useState([]);
  const [activeTab, setActiveTab] = useState("allUsers");

  const controlModal = (tab) => {
    setActiveTab(tab);
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

  useEffect(() => {
    if (socketConnection) {
      console.log("Socket connection established:", socketConnection);
      socketConnection.emit("sidebar", user._id);
      socketConnection.on("conversation", (data) => {
        console.log(data);
        setAllUser(data);
      });
    }
  }, [socketConnection, user._id]);

  return (
    <div className="w-full h-full flex">
      <div
        className="bg-slate-200 w-[80px] h-full flex flex-col justify-between items-center"
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
            onClick={() => { setActiveTab("allUsers"); }}
          >
            <IoChatbubbleEllipsesSharp size={25} />
          </NavLink>
          <div
            className="flex justify-center hover:bg-slate-500 items-center py-5  text-black"
            onClick={() => { controlModal("addUser"); }}
          >
            <TiUserAdd size={25} />
          </div>
          <div
            onClick={() => { controlModal("settingUser"); }}
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
        <h2 className="text-center py-3 bg-slate-200 font-bold">Messenger</h2>
        
        {activeTab === "allUsers" && allUser.map((user, index) => (
          <CardUser key={index} item={user.receiver} />
        ))}
        
        {activeTab === "addUser" && (
          <AddUser onClose={() => { controlModal("allUsers"); }} />
        )}
        
        {activeTab === "settingUser" && (
          <SettingUser
            onClose={() => { controlModal("allUsers"); }}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
