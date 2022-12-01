import React from "react"
import "./Title.css"

const Title = (props) => {

  const color = props.color? props.color : 'black';

  const divStyle = {
    backgroundImage: 'url('+props.background+')',
    // eslint-disable-next-line
    color: color
  };

  return (
    <div className="divTitle" style={divStyle}>
      <h1>{props.text}</h1>       
    </div>
  )
}

export default Title