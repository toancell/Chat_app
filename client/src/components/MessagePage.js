import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { AiFillPlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import uploadFile from "../helpers/uploadFile";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import toast from "react-hot-toast";
const MessagePage = () => {
  const [show, setShow] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [allMessage, setAllMessage] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const currentMessage = useRef(null);
const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  
  

  const handleOnChange = (e) => {
    setMessage((prev) => {
      return {
        ...prev,
        text: e.target.value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    toast("Take a few minutes to update profile picture");
    const file = e.target.files[0];
    setShow(false);
  
    try {
      const uploadMedia = await uploadFile(file);
      if (uploadMedia && uploadMedia.url) {
        setMessage((prev) => ({
          ...prev,
          imageUrl: uploadMedia.url,
        }));
        setTimeout(() => {
          handleSendMessage();
        }, 100);
      } else {
        throw new Error("Upload failed or no URL returned");
      }
    } catch (err) {
      console.error("Upload error:", err.message);
      toast.error("Failed to upload file");
    }
  };
  
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setShow(false);
  
    try {
      const uploadMedia = await uploadFile(file);
      if (uploadMedia && uploadMedia.url) {
        setMessage((prev) => ({
          ...prev,
          videoUrl: uploadMedia.url,
        }));
        setTimeout(() => {
          handleSendMessage();
        }, 100);
      } else {
        throw new Error("Upload failed or no URL returned");
      }
    } catch (err) {
      console.error("Upload error:", err.message);
      toast.error("Failed to upload file");
    }
  };
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);
      socketConnection.on("message-user", (data) => {
        setUserData(data);
      });
      socketConnection.on("message", (data) => {
        console.log("message data", data);
        setAllMessage(data);
      });
    }
  }, [socketConnection, params?.userId,allMessage]);


  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessage,message]);
  const showMedia = () => {
    setShow(!show);
  };
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        const newMessage = {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        };
        socketConnection.emit("new message", newMessage);
        setAllMessage((prev) => [...prev, newMessage]);
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };
 
  

  return (
    <div className=" h-[100vh]">
      <div className="h-[70px] bg-slate-400 shadow-lg flex items-center space-x-4 px-5">
      <Link to={"/"} className='lg:hidden'>
                      <FaAngleLeft size={25}/>
                  </Link>
        <Avatar url={userData.profile_pic} userId={params.userId} />
        <span className="text-2xl font-somibold">{userData.name} </span>
        
      </div>
      <div className="h-[calc(100vh-120px)] overflow-x-hidden overflow-y-scroll scrollbar">
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {allMessage.map((msg, index) => 
           (
              <div
                className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  user._id === msg?.msgByUserId
                    ? "ml-auto bg-teal-100"
                    : "bg-white"
                } border-md`}
                key={msg._id}
                
              >
                <div className="w-full relative">
                  {msg?.imageUrl && (
                    <img
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down bordered-1"
                    />
                  )}
                  {msg?.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down bordered-1"
                      controls
                    />
                  )}
                </div>
                <p className="px-2">{msg.text}</p>
                <p className="text-xs ml-auto w-fit text-slate-700">
                  {moment(msg.createdAt).format('dddd, HH:mm')}
                </p>
              </div>
            
          ))}
        </div>
      </div>
      <div className="w-full h-[50px]  flex px-3 items-center space-x-3 justify-between">
        <div className="relative" >
          <AiFillPlusCircle size={25} onClick={showMedia} />
          {show && (
            <div className="absolute bottom-7 space-y-1  left-5 w-[100px]  bg-transparent bg-opacity-60 backdrop-blur-md rounded-md p-2 shadow-md">
              <div className="w-full relative flex gap-2 justify-center hover:bg-slate-400 rounded-md cursor-pointer items-center">
                <FaImage size={20} />
                <span>Image</span>
                <input
                  onChange={handleUploadImage}
                  type="file"
                  className="inset-0 absolute opacity-0 "
                  accept="image/*"
                />
              </div>
              <div className="w-full relative flex gap-2 justify-center hover:bg-slate-400 rounded-md cursor-pointer items-center">
                <FaVideo size={20} />
                <span>Video</span>
                <input
                  onChange={handleUploadVideo}
                  type="file"
                  accept="video/*"
                  className="inset-0 absolute opacity-0 "
                />
              </div>
            </div>
          )}
        </div>
        <form
          action=""
          className="flex w-full p-2"
          onSubmit={handleSendMessage}
        >
          <div className="w-full">
            <input
              type="text"
              onChange={handleOnChange}
              className="w-full px-2 py-1 rounded-full focus:outline-none"
              placeholder="Type message"
              value={message.text}
            />
            
          </div>
          <button type="submit">
            <IoMdSend size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagePage;
