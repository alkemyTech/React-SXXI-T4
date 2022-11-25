import React, { useState, useEffect } from "react";
import FormNewsletter from "./FormNewsletter";
import { getOrganization } from "Services/Organization/ApiService"
import { Link } from "react-router-dom";
const Footer = () => {

	const [dataOrg, setDataOrg] = useState({})

	useEffect(() => {
		getOrganization(setDataOrg)
	}, [])

	return (
		<div className="mt-auto bg-gray-100 shadow-lg">
			<div className="flex-col flex w-full justify-around">
				<div className="w-full flex justify-center flex-col align-middle items-center">
					<div className="flex w-full items-center before:flex-1 
						before:border-t before:border-gray-400 
						before:mt-0.5 after:flex-1 after:border-t 
						after:border-gray-400 after:mt-0.5"
					>
						<img className="max-w-[120px] mx-10" src={dataOrg.logo} alt="" />
					</div>
					<h1 className="text-center mb-8 font-poppins sm:text-xl md:text-2xl">{dataOrg.name}</h1>
				</div>
				<div className="">
					<ul className="md:flex mb-10 grid grid-cols-3 gap-3 justify-center">
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="" >Inicio</Link>
						</li>
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="" >Nosotros</Link>
						</li>
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="" >Novedades</Link>
						</li>
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="" >Testimonios</Link>
						</li>
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="" >Contacto</Link>
						</li>
						<li className="md:mx-3 text-center hover:text-red-700 font-light md:font-normal sm:text-lg md:text-xl">
							<Link to="">Contribuye</Link>
						</li>
					</ul>
				</div>
				<FormNewsletter />
				<div className="flex flex-col md:flex-row items-center justify-around w-full p-4">
					<h2>
						{(!!dataOrg.cellphone) && "Celular: " + dataOrg.cellphone}
					</h2>
					<h2>
						{(!!dataOrg.cellphone) && "Dirección: " + dataOrg.address}
					</h2>
					<ul className="flex justify-around flex-col md:flex-row" >
						<h2 className="mr-2 text-center">Nuestras redes: </h2>
						<ul className="flex justify-around">
							<li className="mx-2">
								<a rel="noreferrer" target="_blank" href={dataOrg.linkedin_url}>
									<img src="images/assets/LinkedinLogo.png" alt="" />
								</a>
							</li>
							<li className="mx-2">
								<a rel="noreferrer" target="_blank" href={dataOrg.instagram_url}>
									<img src="images/assets/InstagramLogo.png" alt="" />
								</a>
							</li>
							<li className="mx-2">
								<a rel="noreferrer" target="_blank" href={dataOrg.facebook_url}>
									<img src="images/assets/FacebookLogo.png" alt="" />
								</a>
							</li>
						</ul>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
