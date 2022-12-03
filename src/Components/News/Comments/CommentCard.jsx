import React from 'react'

const CommentCard = ({name, comment, userImg, userName}) => {

  console.log(name)

  return (
    <div className="bg-yellow-200 flex min-w-[700px] max-w-[700px] p-2 my-3 rounded-br-xl">
      <div className="user w-[30%] flex flex-col justify-center items-center">
        <img src={userImg || "/images/user.png"} className="w-[100px] rounded-full h-[100px] object-cover " />
        <h3 className="font-poppins text-center">{userName || "Nombre usuario"}</h3>
      </div>
      <div className="comment w-[70%]">
        <h3 className="text-center p-5">
          &quot;  
            {comment}
          &quot; 
        </h3>
      </div>

    </div>
  )
}

export default CommentCard