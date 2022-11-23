import React, {useState} from 'react'
import { useParams, Link } from 'react-router-dom';
const Navbar = () => {
    const id = { useParams }
    const [mobile, setMobile] = useState(false)

    const menuArr = [
        {
            name: "Inicio",
            link: "/",
            id: 0
        },
        {
            name: "Nosotros",
            link: "",
            id: 1
        },
        {
            name: "Novedades",
            link: "",
            id: 2
        },
        {
            name: "Testimonios",
            link: "",
            id: 3
        },
        {
            name: "Contacto",
            link: "/contacto",
            id: 4
        },
        {
            name: "Contribuye",
            link: "",
            id: 5
        }
    ]


    return (
        <div>
            <nav className="hidden lg:w-full bg-white sticky top-0 z-50 h-[80px] md:flex justify-between pl-5 pr-5 align-middle shadow-lg shadow-slate-200">
                <img src="images/assets/LOGO-SOMOSMAS.png" className="w-full md:w-1/4 object-contain " onError={
                    (e) => {
                        e.currentTarget.src = "images/assets/404.png"
                    }
                } />
                <ul className="md:flex justify-around text-sm hidden align-middle w-full md:text-sm lg:w-3/4 xl:w-1/2">
                    {
                        menuArr.map(x => (
                            <li key={x.id} className="grid place-content-center hover:text-red-700">
                                <Link to={x.link}>
                                    {x.name}
                                </Link>
                            </li>

                        ))
                    }
                    {id === "" || id === null ? <li>Bienvenido</li>
                        :
                        <div className='flex'>
                            <li className="grid place-content-center">
                                <Link to="/login-user" className="bg-slate-200 hover:bg-slate-300 text-black px-4 py-2 hover:scale-95 transition mr-4 rounded">Inicia sesión</Link>
                            </li>
                            <li className="grid place-content-center">
                                <Link to="/register-user" className="bg-red-600 hover:bg-red-700 px-4 py-2 hover:scale-95 transition  text-white rounded">
                                    Registrarse
                                </Link>
                            </li>
                        </div>
                    }
                </ul>
            </nav>

            <nav className=''>
                <img onClick={(e) => setMobile(!mobile)} className="hover:cursor-pointer hover:scale-95 md:hidden" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAdRJREFUSEuNVomRAyEMkzu5TrKlpJNsOrvOuAMbkM23mckkAS+WbMlEwC8RICW3BAFAS+Enxa538hl5t7zqF04jEKScZZaM1sZnbbN9CDIHBczRZXGDMGZmtKEgkYhlsigqYWElSdHMchvAGuJyMusj7l2A66+VxpXUSo8Ml3q0YE1UYlb/W49Lruq6Enuk5bkk4dX6VrMvmPFyCPlGwl7OwA3gwyJx9Z8mbPps7LOie4XyvpNd2XoD8nbmaVB6lpnlAuIrso2Mmq9czwYme4NWz3Q5+NGgBEutYqPXCh+QBjPno6h0MXxlmuq17vSKOmCm6pO8aRDdQPr0hyYJrUEHizXr6OCJ40ZwI5HqbDx15ameJHUeLqH9qKqreyVrQPYDIL+3pMpEpmQTRf0ufTSWgrtq37fDtsOO0pbRah7boQ9qhXyN5c82e8frha6kpqYLCa9opsVAGHxNcTqCTBJOGcaljKB9g7ixEUI9stS4MZ4letsY6nf4Ax1PrqvLi2F3iGk0DYPtwfhpXtN+KaMjYrtlc+zh2hh0131leZyzzv98OrY1yijx4DXd5rxK4onQJ7a1Z7sYxpPt6KpPM0mwe3nsaGL6X1cBP8a9CJxOl38n/wEcUMUpNbvs8gAAAABJRU5ErkJggg==" />
            </nav>



        </div>
    )
}

export default Navbar