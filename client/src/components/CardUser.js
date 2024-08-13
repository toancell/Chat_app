import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
const CardUser = ({item, onClose}) => {
  return (
    <Link onClick={onClose} to={"/" +item?._id} className='flex items-center  py-2 px-3 border-t-2 hover:bg-slate-100 '>
      <Avatar url={item?.profile_pic} userId={item?._id} />
      <div className='ml-4 overflow-hidden'>
        <h2 className='text-xl'>{item?.name}</h2>
        <p className='text-sm text-slate-800'>{item?.email}</p>
      </div>
    </Link>
  )
}

export default CardUser
