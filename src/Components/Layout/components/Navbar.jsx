import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Navbar = () => {
    const id = { useParams }

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
        <div className="w-full sticky top-0 z-50 h-[80px] flex align-middle ">
            <nav className="w-full  flex justify-between pl-5 pr-5 align-middle shadow-lg shadow-slate-200">
                <img src="images/assets/LOGO-SOMOSMAS.png" onError={
                    (e) => {
                        e.currentTarget.src = "images/assets/404.png"
                    }
                } />

                <ul className="flex justify-around text-sm invisible  align-middle w-full md:visible md:text-sm lg:w-3/4 xl:w-1/2">
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
                        <div>
                            <li className="grid place-content-center">
                                <Link to="/login-user" className="bg-slate-200 hover:bg-slate-300 text-black px-4 py-2 hover:scale-95 transition  text-white rounded">Inicia sesión</Link>
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
        </div>
    )
}

export default Navbar