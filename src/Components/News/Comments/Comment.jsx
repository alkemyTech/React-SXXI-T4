import axios from 'axios'
import React, { useEffect, useState } from 'react'/* 
import { getComment } from 'Services/Comments/CommentsApiServices' */
import CommentCard from './CommentCard'

const Comment = ({ id }) => {

    const [data, setData] = useState([])

    const color = ["#ffe6ff", "#ccdcff", "#ffcccc", "#ccffcc", "#ffffcc", "#e6ccff", "#ccccff"]

    useEffect(() => {
        axios.get(`https://ongapi.alkemy.org/api/comments?new_id=${id}`)
            .then(res => {
                setData(res.data.data)

                console.log(res.data.data)
            }
            )
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="w-100 select-none flex flex-col items-center justify-center">
            {data.map((x) => (
                <CommentCard
                    key={x.id}
                    userId={x.user_id}
                    comment={x.text}
                    name={x.name}
                    color={
                        color[Math.floor(Math.random() * 7)]
                    }
                />
            ))}

        </div>
    )
}

export default Comment
