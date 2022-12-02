import React from 'react'

const Comment = (comment) => {
    return (
        <div>
            {comment.lenght ?
                comment.map((x)=>(
                    <p key={x.id}>{x.text}</p>
                ))
                :
                <h2>No hay comentarios</h2>
            }
        </div>
    )
}

export default Comment