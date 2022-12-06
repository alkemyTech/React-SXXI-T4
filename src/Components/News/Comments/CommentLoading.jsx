import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CommentLoading = () => {
  return (
    <div className='flex justify-center items-center w-full'>
        <Skeleton  
            baseColor="#EC4C4C" 
            highlightColor="#FFF"
            height={10}
            width={10}
            duration={1.5}
            m={2}
            borderRadius={5}
        />
        <Skeleton  
            baseColor="#F8FC74" 
            highlightColor="#FFF"
            duration={2}
            height={10}
            width={10}
            borderRadius={5}
        />
        <Skeleton  
            baseColor="#8DCAFF" 
            highlightColor="#FFF"
            duration={3}
            height={10}
            width={10}
            borderRadius={5}
        />
    </div>
  )
}

export default CommentLoading