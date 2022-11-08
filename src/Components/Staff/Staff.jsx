import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from "../Card/Card"
import "./Staff.css"
const Staff = () => {

    const [staff, setStaff] = useState([])

    useEffect(() => {
        axios.get('https://ongapi.alkemy.org/api/members')
            .then(res => setStaff(res.data.data))
            .then(res => console.log(res.data.data))
            .catch(err => console.log(err))
    })


    return (
        <div>
            <ul id="ulStaff">
                {staff.map(member =>
                    <li key={member.id}>
                        <Card 
                            name={member.name} 
                            image={member.image} 
                            description={member.description} 
                            color={"yellow"}
                            socialMedia={true}
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