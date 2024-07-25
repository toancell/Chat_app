import React from 'react'
import Logo from"../assets/logo.png"
const CardUser = () => {
  return (
    <div className='flex justify-center items-center'>
      <div>
        <img src={Logo} alt="" />
      </div>
      <div>
        <h2>User Name</h2>
      </div>
    </div>
  )
}

export default CardUser
