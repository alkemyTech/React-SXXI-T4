import React from 'react'
import './Card.css'

const Card = (data) => {

    const divStyle = {
        backgroundColor: `${data.color}`
    };

    return (
        <div>

            <div className="cardContainer">
                <div className="cardImage">
                    <img src={`${data.image}`} alt="img no disponible" />
                </div>

                <div className="cardText">
                    <div className="cardTitle">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="cardDescription">
                        <p>{data.description}</p>
                    </div>
                </div>
                {data.mode === "dark"

                    ?
                    <div style={divStyle} className="cardMedia">
                        <a href={`${data.facebook}`} target="_blank" rel='noreferrer'>
                            <img src="images/facebookBlack.png" />
                        </a>
                        <a href={`${data.linkedin}`} target="_blank" rel='noreferrer'>
                            <img src="images/linkedinBlack.png" />
                        </a>
                    </div>
                    :
                    <div style={divStyle} className="cardMedia">
                        <a href={`${data.facebook}`} target="_blank" rel='noreferrer'>
                            <img src="images/facebookWhite.png" />
                        </a>
                        <a href={`${data.linkedin}`} target="_blank" rel='noreferrer'>
                            <img src="images/linkedinWhite.png" />
                        </a>
                    </div>
                }



            </div>


        </div>
    )
}

export default Card