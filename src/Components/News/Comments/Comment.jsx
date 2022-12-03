import axios from 'axios' 
import React, { useEffect , useState } from 'react'/* 
import { getComment } from 'Services/Comments/CommentsApiServices' */
import CommentCard from './CommentCard'

const Comment = ({id}) => {
    
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get(`https://ongapi.alkemy.org/api/comments?new_id=${id}`)
        .then( res => {setData(res.data.data)
        }
        ) 
        .catch( err => console.log(err))
    },[])
   console.log(data)

    return (
        <div className="w-100 flex flex-col items-center justify-center">
          {data.map((x)=>(
            <CommentCard 
                key={x.id}
                comment={x.text}
                name={x.name}
            />
          ))}
        
        </div>
    )
}

export default Comment







/* 

const [comment, setComment] = useState({})
const [flag, setFlag] = useState(false) 
const getComments = async () => {
    try {
        const res = await getComment(id)
        setComment(res.data.data)	
        setFlag(true)		
        console.log(res.data.data[0].text) *//* 
        setFlag(true)
    }
    catch (err) {
        console.log(err)
    }
}

useEffect(()=>{
   getComments()
},[]) */