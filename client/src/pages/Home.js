import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setUser,logout,setOnlineUser ,setSocketConnection} from "../redux/userSlice";
import io from "socket.io-client"
import { useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation()
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();


  useEffect(() => {
    const fetchUserDetails = async () => {
    try {
      const URL = "/api/user-detail";
      const response = await axios.get(URL, {
        header: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUser(response.data.data));
      console.log("user_detail",response.data.data);
      if (response.data.data.logout) {
        nav("/login");
        dispatch(logout())
      }
    } catch (err) {
      console.log(err);
    }
  };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const socketConnection = io( process.env.REACT_APP_BACKEND_URL ,{
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socketConnection.on("onlineUser",(data) =>{
      console.log("chat", data)
      dispatch(setOnlineUser(data));
    })
    dispatch(setSocketConnection(socketConnection));
    return () =>{
      socketConnection.disconnect()
    }
  }, []);
  const mainPage = location.pathname === "/"
  return (
    <div className="max-h-screen h-[100vh] grid lg:grid-cols-[400px,1fr] ">
      <section className={`bg-slate-500 ${!mainPage && "hidden"} lg:block`} >
        <Sidebar user={user} />
      </section>
      
      <section className="bg-slate-100">
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
