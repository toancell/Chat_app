import React, { useState } from 'react'
import { ImCancelCircle } from "react-icons/im"
import { NavLink, useNavigate } from 'react-router-dom'
import uploadFile from"../helpers/uploadFile"
import axios from "axios"
import toast from 'react-hot-toast'
const RegisterPage = () => {
    const navigate= useNavigate()
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        profile_pic:"",
    })
    const [uploadPhoto, setUploadPhoto] = useState()
    const handleOnChange =(e) =>{
        const {name, value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadPhoto = async(e) =>{
        const file = e.target.files[0]
        const Photo = await uploadFile(file)
        setUploadPhoto(file)
        console.log(Photo)
        setData((prev) => {
            return {
                ...prev,
                profile_pic: Photo?.url
            }
        })
         
    }
   
    const handleClearUploadPhoto=(e) =>{
        e.preventDefault()
        setUploadPhoto(null)
        setData((prev) => {
            return {
                ...prev,
                profile_pic: ""
            }
        })
    }
    const handleSubmit= async (e) =>{
        e.preventDefault()
        console.log(data)
        if (!data.profile_pic) {
            return toast.error('Profile picture is required');
        }
        try{
            const response = await axios.post("http://localhost:8080/api/register",data);
            toast.success(response.data.message)
            if(response.data.success) {
                setData({
                    name:"",
                    email:"",
                    password:"",
                    profile_pic:"", 
                })
            }
            navigate("/")
        }catch(error){
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    }
  return (
    <div className='mt-5 flex flex-col items-center '>
        <div className='bg-blue-100 w-full max-w-sm mx-2 rounded overflow-hidden p-8'>
            <h3 className='text-xl text-blue-900 font-bold'>Welcome to Chat App</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="name">Name: </label>
                    <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your name" 
                    className="focus:outeline-primary bg-slate-100 px-2 py-1 focus:outline-none"
                    required
                    value={data.name}
                    onChange={handleOnChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                    <label htmlFor="password">Password: </label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your Password" 
                    className="focus:outeline-primary bg-slate-100 px-2 py-1 focus:outline-none"
                    required
                    value={data.password}
                    onChange={handleOnChange}
                    />
                </div>
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
                <div className="flex flex-col gap-1 mt-7">
                    <label htmlFor="profile_pic">
                        <div className="h-14 bg-slate-100 flex justify-center items-center border rounded cursor-pointer">
                            <p className='text-blue-900 text-base font-medium'>{
                                    uploadPhoto ? uploadPhoto.name : "Upload profile picture"
                            }
                            </p>
                            {
                                uploadPhoto && 
                                <button className='text-xl ml-2 hover:text-red-700' onClick={handleClearUploadPhoto}>
                                <ImCancelCircle />
                                </button>
                            }
                        </div>
                    </label>
                    <input 
                    type="file" 
                    id="profile_pic" 
                    name="profile_pic" 
    
                    className="focus:outeline-primary bg-slate-100 px-2 py-1 hidden"
                    required
                    onChange={handleUploadPhoto}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors "
                >
                    Send
                </button>
            </form>
            <div className='mt-2'>
            <p className="text-sm">Already have account ? <NavLink to={"/"} className="text-blue-900 font-semibold text-sm hover:underline">Login</NavLink>
            </p>
            </div>
        </div>
      
    </div>
  )
}

export default RegisterPage
