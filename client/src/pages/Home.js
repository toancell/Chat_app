import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setUser,logout } from "../redux/userSlice";
const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

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
      console.log(response.data.data);
      if (response.data.data.logout) {
        nav("/");
        dispatch(logout())
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="max-h-screen h-[100vh] grid lg:grid-cols-[300px,1fr] ">
      <section className="bg-slate-500 ">
        <Sidebar />
      </section>
      
      <section className="bg-slate-100">
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
