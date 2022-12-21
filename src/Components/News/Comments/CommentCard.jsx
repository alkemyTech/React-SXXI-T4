import React, { useState, useEffect } from 'react'
import { getUser } from 'Services/User/UserApiService'

const CommentCard = ({ comment, userId, color, }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    getUser(userId, setUser)
  },[])
  return (
    <div data-aos="flip-up" style={{ backgroundColor: color }} className={`flex-col items-center justify-center md:flex-row border border-slate-400 shadow-lg flex w-[95%] md:min-w-[700px] md:max-w-[700px] p-2 my-3 rounded-br-xl`}>
      <div className="user w-[30%] flex flex-col justify-center items-center">
        <img src={user.profile_image || "/images/user.png"} className="w-[100px] rounded-full h-[100px] object-cover " />
        <h3 className="font-poppins text-center">{user.name || "Nombre usuario"}</h3>
      </div>
      <div className="comment w-[70%]">
        <h3 className="text-center p-5">
          <strong>&quot;</strong>
          {comment}
          <strong>&quot;</strong>
        </h3>
      </div>
    </div>
  )
}
export default CommentCard