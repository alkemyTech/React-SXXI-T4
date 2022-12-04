import React, { useEffect, useState } from 'react'
import { getComment } from 'Services/Comments/CommentsApiServices'
import CommentCard from './CommentCard'

const Comment = ({ id }) => {
    const [data, setData] = useState([])
    const color = ["#ffe6ff", "#ccdcff", "#ffcccc", "#ccffcc", "#ffffcc", "#e6ccff", "#ccccff", "#FE9AA3", "#B4EBD7", "#C6CFEA"]

    useEffect(() => {
        getComment(id, setData)
    },
    [])
    return (
        <div className="w-100 select-none flex flex-col items-center justify-center">
            {data.map((x) => (

                <CommentCard

                    key={x.id}
                    userId={x.user_id}
                    comment={x.text}
                    name={x.name}
                    color={
                        color[Math.floor(Math.random() * 10)]
                    }
                />
            ))}

        </div>
    )
}

export default Comment
