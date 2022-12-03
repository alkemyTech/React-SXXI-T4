/* import axios from 'axios' */
import React, {/*  useEffect *//* , useState  */} from 'react'/* 
import { getComment } from 'Services/Comments/CommentsApiServices' */

const Comment = () => {
    
   /*  const [data, setData] = useState() */

   /*  useEffect(()=>{
        axios.get(`https://ongapi.alkemy.org/api/comments?new_id=${id}`)
        .then( res => console.log(res.data)) 
        .catch( err => console.log(err))
    },[]) */
   
    const comments = [
        {
            id:1,
            name: "Nombre1",
            img: "Imagen1"
        },
        {
            id:2,
            name: "Nombre2",
            img: "/public/images/author-01.png"
        },
        {
            id:3,
            name: "Nombre3",
            img: "/src/Assets/images/blog-img-02.jpg"
        },
        {
            id:4,
            name: "Nombre4",
            img: "Imagen4"
        },{
            id:5,
            name: "Nombre5",
            img: "Imagen5"
        }
    ]

    return (
        <div className="w-100 flex flex-col items-center justify-center bg-yellow-200">
          {comments.map((x)=>(
            <div className="flex w-100 bg-slate-700 text-white items-center justify-center" key={x.id}>
                <img className="w-[150px] h-[150px]" src={x.img} alt="" />
                <h2>{x.name}</h2>
            </div>
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