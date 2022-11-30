import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from "Components/Card/Card"
import "./Staff.css"
const Staff = () => {

    const [staff, setStaff] = useState([])

    useEffect(() => {
        axios.get('https://ongapi.alkemy.org/api/members')
            .then(res => setStaff(res.data.data))
            .catch(err => console.log("Ocurrió un error: "+err))
    })


    return (
        <div className="staffContainer">
            
            <ul className="ulStaff grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                {staff.map(member =>
                    <li key={member.id}>
                        <Card 
                            title={member.name} 
                            image={member.image} 
                            description={member.description} 
                            color={"#FFAE42"}
                            facebook={member.facebookUrl}
                            linkedin={member.linkedinUrl}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Staff