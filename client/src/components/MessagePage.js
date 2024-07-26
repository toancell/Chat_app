import React from 'react'
import { useParams } from 'react-router-dom'

const MessagePage = () => {
  const params = useParams()
  console.log("params", params.userId)
  return (
    <div>
      MessagePage123
    </div>
  )
}

export default MessagePage
