/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { getOrganization } from "Services/Organization/ApiService";

export default function Contact() {
	const [contact, setContact] = useState({});

	useEffect(() => {
		getOrganization(setContact)
	}, []);

	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-3/5 lg:w-1/2 shadow-xl rounded ">
				<Title text="Contacto" />
				<div className="p-4">
					<h1 className="font-semibold">Datos de contacto</h1>
					<div className="py-2">
						<h3 className="font-medium">
							Direccion: <span className="font-normal">{contact?.address}</span>
						</h3>
						<h3 className="font-medium">
							Telefono: <span className="font-normal">{contact?.cellphone}</span>
						</h3>
					</div>

					<h3 className="font-semibold py-2">Nuestras redes</h3>
					<div className="flex justify-center items-center gap-4 ">
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={contact?.facebook_url}>
								<FaFacebook className="text-blue-500" size={30} />
							</a>
						</div>
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={contact?.linkedin_url}>
								<FaLinkedin className="text-blue-700" size={30} />
							</a>
						</div>
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={contact.twitter_url}>
								<FaTwitter className="text-blue-600" size={30} />
							</a>
						</div>
						<div className="flex justify-center items-center w-1/2 h-12 rounded-xl shadow bg-white">
							<a className="flex items-center" href={contact?.instagram_url}>
								<img src="/images/logoig.png" width={30} height={30} alt="logo" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
