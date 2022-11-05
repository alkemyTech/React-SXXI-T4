import React from 'react'

const ContentActivities = ({content}) => {
  return (
    <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default ContentActivities