import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import "../../Card/Card.css"
const SkeletonCard = () => {
    return (
        <div className="w-[200px] h-[350px] bg-gray-100 py-2 rounded flex-col flex justify-between items-center">
            <Skeleton variant="circular" width={140} height={140} />
            <Skeleton variant="rounded" width={180} height={30} />
            <Skeleton variant="rounded" width={180} height={140} />
        </div>
    )
}

export default SkeletonCard