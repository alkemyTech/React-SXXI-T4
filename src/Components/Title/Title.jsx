import "./Title.css"
const Title = (props) => {

  const color = props.color

  const divStyle = {
    backgroundImage: 'url('+props.background+')',
    color: color
  };

  return (
    <div className="divTitle" style={divStyle}>
      <h1>{props.text}</h1>       
    </div>
  )
}

export default Title
