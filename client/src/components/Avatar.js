import React from "react";
import { useSelector } from "react-redux";
const Avatar = ({ url, userId }) => {
 let check = false
  const listUser = useSelector((state) => state.user.onlineUser);
  if (listUser?.length > 0) {
    check = listUser?.includes(userId);
  }

  return (
    <div className="relative">
      <img
        src={url}
        className="rounded-full w-[50px] h-[50px] object-cover"
        alt=""
      />
      {
        check &&<span className="bg-green-500 w-3 block h-3 rounded-full absolute bottom-0 right-0 "></span>

      }
    </div>
  );
};

export default Avatar;
