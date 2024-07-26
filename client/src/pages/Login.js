import React, { useState, useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post(
      //   "http://localhost:8080/api/login",
      //   data
      // );
      const URL = "/api/login";
      const response = await axios({
        method: "POST",
        url: URL,
        data: data,
        header: {
          "Content-type": "application/json",
        },
        credentials: true,
      });
      toast.success(response.data.message);
      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        dispatch(setUser(response?.data?.data));
        localStorage.setItem("token", response?.data?.token);

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      console.log(response.data.token);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className="mt-5 flex flex-col items-center ">
      <div className="bg-blue-100 w-full max-w-sm mx-2 rounded overflow-hidden p-8">
        <h3 className="text-xl text-blue-900 font-bold">Welcome to Chat App</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              className=" bg-slate-100 px-2 py-1 focus:outline-none"
              required
              value={data.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-1 mt-4 relative">
            <label htmlFor="password">Password: </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your Password"
              className="focus:outline-primary bg-slate-100 px-2 py-1 focus:outline-none "
              required
              value={data.password}
              onChange={handleOnChange}
            />
            <div
              className="absolute right-0 pr-3 bottom-2 flex items-center cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors "
          >
            Login
          </button>
        </form>
        <div className="mt-2">
          <p className="text-sm">
            You don't have account ?{" "}
            <NavLink
              to={"/register"}
              className="text-blue-900 font-semibold text-sm hover:underline"
            >
              Register
            </NavLink>
          </p>
          <p className="text-sm">
            <NavLink
              to={"/forgot-password"}
              className="text-blue-900 font-semibold text-sm hover:underline"
            >
              {" "}
              Forgot Password{" "}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
