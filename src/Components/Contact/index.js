/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Title from "../Title/Title";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact({ data }) {
	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-3/5 lg:w-1/2 shadow-xl rounded ">
				<Title title="Contacto" />
				<div className="p-4">
					<h1 className="font-semibold">Datos de contacto</h1>
					<div className="py-2">
						<h3 className="font-medium">
							Direccion: <span className="font-normal">{data.address}</span>
						</h3>
						<h3 className="font-medium">
							Telefono: <span className="font-normal">{data.phone}</span>
						</h3>
					</div>

					<h3 className="font-semibold py-2">Nuestras redes</h3>
					<div className="flex justify-center items-center gap-4 ">
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={data.facebookUrl}>
								<FaFacebook className="text-blue-500" size={30} />
							</a>
						</div>
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={data.linkedinUrl}>
								<FaLinkedin className="text-blue-700" size={30} />
							</a>
						</div>
						<div className="flex items-center justify-center w-1/2 h-12 rounded-xl shadow text-center bg-white">
							<a href={data.twitterUrl}>
								<FaTwitter className="text-blue-600" size={30} />
							</a>
						</div>
						<div className="flex justify-center items-center w-1/2 h-12 rounded-xl shadow bg-white">
							<a className="flex items-center" href={data.instagramUrl}>
								<img
									src="/images/logoig.png"
									width={30}
									height={30}
									alt="logo"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
