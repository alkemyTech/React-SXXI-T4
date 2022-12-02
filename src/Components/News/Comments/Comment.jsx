import React, { useEffect, useState } from 'react'
import { getComment } from 'Services/Comments/CommentsApiServices'

const Comment = (id) => {
    
    const [comment, setComment] = useState([])/* 
    const [flag, setFlag] = useState(false)  */
    const getComments = async () => {
        try {
            const res = await getComment(id)
            setComment(res.data.data)			/* 
			console.log(res.data.data[0].text) *//* 
            setFlag(true) */
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
       getComments()
    },[])

    return (
        <div>
            <h2>Aqui el comentario</h2>
            <h2>{console.log(comment)}</h2>
        </div>
    )
}

export default Comment