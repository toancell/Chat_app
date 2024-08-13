import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const handleChange = (e) =>{
    e.preventDefault();
    setEmail(e.target.value);
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
   try{
    const URL="/api/forgot-password";
    const response = await axios({
      method: "POST",
      url: URL,
      data: {email: email},
      header: {
        "Content-type": "application/json",
      },
      credentials: true,
    });
    if(response.data.success) {
      navigate("/login")
      toast("New Password is sent successfully")
    }
    console.log(response.data)
   }catch(err){
    console.log(err)
    toast.error("Email khong ton tai")
   }
  }
  return (
    <div className="mt-5 flex flex-col items-center">
        <div className='bg-blue-100 w-full max-w-sm mx-2 rounded overflow-hidden p-8'>
            <h3 className='text-xl text-blue-900 font-bold'> You forgot your password</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 mt-4">
                    <label htmlFor="email">Enter your email: </label>
                    <input type="email" id="email" name="email" value={email} onChange={handleChange} className="focus:outline-primary bg-slate-100 px-2 py-1 focus:outline-none"/>
                </div>
                <button type='submit' className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded'> Send </button>
            </form>
        </div>
    

    </div>
  )
}

export default ForgotPassword
