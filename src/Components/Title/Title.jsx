import React from 'react'
import "./Title.css"
const Title = (props) => {

  const divStyle = {
    backgroundImage: 'url('+props.background+')'
  };


  return (
    <div className="divTitle" style={divStyle}>
      <h1>{props.text}</h1>       
    </div>
  )
}

export default Title
