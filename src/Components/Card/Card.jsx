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
                    <img src={`${data.image}`} onError={
                        (e) => {
                            e.currentTarget.src = "https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png?width=490&height=490"
                        }
                    } />
                </div>

                <div className="cardText">
                    <div className="cardTitle">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="cardDescription">
                        <p>{data.description}</p>
                    </div>
                </div>
                {((data.facebook === "" || data.facebook === undefined || data.facebook === null || data.linkedin === "" || data.linkedin === null || data.linkedin === undefined)) ?

                    <div style={divStyle} className="cardMedia">
                    </div>
                    :
                    <div style={divStyle} className="cardMedia">
                        {data.iconMode === "dark"

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

                }
            </div>


        </div>
    )
}

export default Card