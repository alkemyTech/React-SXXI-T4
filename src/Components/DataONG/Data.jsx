import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title/Title'
import './Data.css'

const Data = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        axios.get("https://ongapi.alkemy.org/api/organization/4")
            .then(data => setData(data.data.data))
            .catch(error => console.log(error))
    })
    return (
        <div className="dataOrganization">
            <Title 
                text={data.name}     
                background="/images/staff-picks.jpg"    
            />

            <div className="dataOrganizationContent">

                <div className='dataImg'>
                    <img src={data.logo} alt="" />
                </div>

                <div className="dataText">
                    <p>
                        {data.short_description}
                    </p>
                </div>
            </div>
            <div className="dataOrganizationEdit ">
                <h3>¿Deseas editar la información de tu ONG?</h3>
                <Link to="/backoffice/organization/edit" className="link">Haz click aquí</Link>
            </div>
        </div>
    )
}

export default Data