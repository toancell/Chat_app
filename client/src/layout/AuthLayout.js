import React from 'react'
import logo from "../assets/logo.jpg"
const AuthLayout = ({children}) => {
  return (
    <>
        <header className="flex justify-center items-center py-3 h-50 shadow-md ">
            <img src={logo} alt="" width={180} height={30} />
        </header>
        {children}
    </>
  )
}

export default AuthLayout
