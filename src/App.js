import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ActivitiesForm from "Components/Activities/ActivitiesForm";
import CategoriesForm from "Components/Categories/CategoriesForm";
import NewsForm from "Components/News/NewsForm";
import SlidesForm from "Components/Slides/SlidesForm";
import TestimonialForm from "Components/Testimonials/TestimonialsForm";
import UserForm from "Components/Users/UsersForm";
import UsersList from "Components/Users/UsersList";
import MembersForm from "Components/Members/MembersForm";
import ProjectsForm from "Components/Projects/ProjectsForm";
import NewsList from "Components/News/News";
import News from "Components/News/index";
import OrganizationForm from "Components/Organization/OrganizationForm";
import ContactForm from "Components/Contact/ContactForm";
import NewsDetails from "Components/News/Details/NewsDetails";
import Backoffice from "Components/Backoffice/Backoffice";
import { Home } from "Components/Home";
import RegisterForm from "Components/Auth/RegisterForm";
import LoginForm from "Components/Auth/LoginForm";
import ActivitiesList from "Components/Activities/ActivitiesList";
import Staff from "Components/Staff/Staff";
import Categories from "Components/Categories/index";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import Contact from "Components/Contact";
import Layout from "Components/Layout/Layout";
import Members from "Components/Members/Members";
import { ActivityDetails } from "Components/Activities";
import { About } from "Components/About";
import SlidesList from "Components/Slides/SlidesList";
import HomeForm from "Components/Home/HomeForm";
import ActivitiesListFront from "Components/Activities/ActivitiesListFront";
import Error404 from "Components/Error404/Error404";
import { Donation } from "Components/Donations";
import { useTransition,a } from "@react-spring/web";

const AnimatedDiv = ({ children }) => {
	const location = useLocation();
	const transitions = useTransition(location.pathname, {
		from: { opacity:0 },
		enter: { opacity:1 },
	});
	return (
		<>
			{transitions(styles => (
				<a.div style={styles}>
					<Routes location={location}>{children}</Routes>
				</a.div>
			))}
		</>
	);
};

function App() {
	return (
		<>
			<BrowserRouter>
				<AnimatedDiv>
					<Route path="registro" element={<RegisterForm />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="*" element={<Error404 />} />
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route
							path="nosotros"
							element={
								<>
									<About />
									<Staff />
								</>
							}
						/>
						<Route
							path="contacto"
							element={
								<div className="w-11/12 mx-auto flex flex-col md:flex-row md:items-center">
									<ContactForm /> <Contact />
								</div>
							}
						/>
						<Route path="donaciones" element={<Donation />} />
						<Route path="novedades" element={<News />} />
						<Route path="novedades/:id" element={<NewsDetails />} />
						<Route path="actividades/:id" element={<ActivityDetails />} />
						<Route path="actividades" element={<ActivitiesListFront />} />
						<Route path="about" element={<About />} />
					</Route>
					<Route path="/backoffice" element={<LayoutForm />}>
						<Route index element={<Backoffice />} />

						<Route path="actividades" element={<ActivitiesList />} />
						<Route path="actividades/crear" element={<ActivitiesForm />} />
						<Route path="actividades/editar/:id" element={<ActivitiesForm />} />

						<Route path="categorias" element={<Categories />} />
						<Route path="categorias/crear" element={<CategoriesForm />} />
						<Route path="categorias/editar/:id" element={<CategoriesForm />} />

						<Route path="home" element={<HomeForm />} />

						<Route path="novedades" element={<NewsList />} />
						<Route path="novedades/crear" element={<NewsForm />} />
						<Route path="novedades/editar/:id" element={<NewsForm />} />

						<Route path="miembros" element={<Members />} />
						<Route path="miembros/crear" element={<MembersForm />} />
						<Route path="miembros/editar/:id" element={<MembersForm />} />

						<Route path="organizacion" element={<OrganizationForm />} />

						<Route path="proyectos/crear" element={<ProjectsForm />} />

						<Route path="slides" element={<SlidesList />} />
						<Route path="slides/crear" element={<SlidesForm />} />
						<Route path="slides/editar/:id" element={<SlidesForm />} />

						<Route path="testimonios" element={<TestimonialForm />} />
						<Route path="testimonios/editar/:id" element={<TestimonialForm />} />

						<Route path="usuarios" element={<UsersList />} />
						<Route path="usuarios/crear" element={<UserForm />} />
						<Route path="usuarios/editar/:id" element={<UserForm />} />
					</Route>
				</AnimatedDiv>
			</BrowserRouter>
		</>
	);
}

export default App;
