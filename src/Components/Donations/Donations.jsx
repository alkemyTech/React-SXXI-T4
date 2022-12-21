import React from "react";
import Title from "../Title/Title";
import PhotoDonation from "Assets/images/PhotoDonation.jpg";
import LazyImage from "Components/common/LazyImage/LazyImage"; 
import Swal from "sweetalert2";
import BackgroundHearts from "Assets/images/backgroundHearts.jpg"

const Donation = () => {
	const title = "Contribuye a nuestra ONG";

	const donationModal = () => {
		Swal.fire({
			title: "¡Gracias!",
			text:"Su donacion cambiara la vida de muchos chicos! De parte de nuestra organizacion le agradecemos de todo corazon!❤️",
			width: 600,
			padding: "3em",
			color: "#290038",
			background: "#fff url("+BackgroundHearts+")",
			backdrop: `
			  rgba(0,0,123,0.4)
			  left top
			  no-repeat
			`,
			showConfirmButton: false
		});
	};
	return (
		<>
			<div className="w-screen h-screen flex flex-col gap-7 items-center">
				<Title text={title} />
				<div className="w-11/12 xl:w-3/5 flex flex-col md:flex-row gap-16">
					<div className="font-light text-justify md:w-1/2 text-lg">
						Puedes ayudar a nuestra ONG donando a travez de Mercado Pago, recuerda que tus donaciones ayudaran a
						financiar proyectos los cuales mejorar la calidad de vida de nuestros chicos. Tambien aceptamos donaciones
						de insumos no perecederos, debajo encontrara nuestra direccion para que pueda acercarse a nuestra
						organizacion o trambien puede contactarse a traves de nuestra pestaña de Contacto.
					</div>
					<LazyImage src={PhotoDonation} classToApply={"md:w-1/2 rounded shadow-lg"} />
				</div>
				<a
					className=" px-6 py-2 bg-sky-600   tracking-wide 
 rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
 transition-all duration-500 text-white text-lg font-medium"
					href={"https://mpago.la/1rRcarD"}
					target="_blank"
					rel="noreferrer"
					onClick={donationModal}
				>
					Mercado Pago
				</a>
			</div>
		</>
	);
};

export { Donation };
