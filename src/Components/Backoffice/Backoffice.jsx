import React from "react";
import ActivitiesLogo from "images/actividades-icono.jpg";
import CategoriesLogo from "images/categorias-icono.png";
import MembersLogo from "images/miembros-icono.png";
import NewsLogo from "images/novedades-icono.png";
import OrganizationLogo from "images/organizacion-icono.jpg";
import SlidesLogo from "images/slides-icono.png";
import TestimoniesLogo from "images/testimonios-icono.png";
import UsersLogo from "images/usuarios-icono.png";

import Card from "./Card/Card";

const Backoffice = () => {
	return (
		<div className="w-screen h-screen bg-slate-100">
			<h1 className="text-center text-3xl py-10 font-bold">
				Bienvenido al Backoffice
			</h1>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-y-4">
				<Card
					title="Novedades"
					image={NewsLogo}
					redirectTo="/backoffice/news"
				/>
				<Card
					title="Actividades"
					image={ActivitiesLogo}
					redirectTo="/backoffice/activity"
				/>
				<Card
					title="Categorias"
					image={CategoriesLogo}
					redirectTo="/backoffice/category"
				/>
				<Card
					title="Testimonios"
					image={TestimoniesLogo}
					redirectTo="/backoffice/testimonials"
				/>
				<Card
					title="Organización"
					image={OrganizationLogo}
					redirectTo="/backoffice/organization"
				/>
				<Card
					title="Slides"
					image={SlidesLogo}
					redirectTo="/backoffice/slide"
				/>
				<Card
					title="Usuarios"
					image={UsersLogo}
					redirectTo="/backoffice/user"
				/>
				<Card
					title="Miembros"
					image={MembersLogo}
					redirectTo="/backoffice/member"
				/>
			</div>
		</div>
	);
};

export default Backoffice;