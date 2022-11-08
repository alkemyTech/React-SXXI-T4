import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import News from "./Components/News";
function App() {
	const data = [
		{
			id: 1,
			name: "Novedad 1",
			fecha: "7/11/2022",
			content:
				"Es una descripcion de la novedad numero 1 donde se muestra informacion actualizada de lo ultimo de las novedades",
			image: "Foto6.jpg",
		},
		{
			id: 2,
			name: "Novedad 2",
			fecha: "6/11/2022",
			content:
				"Es una descripcion de la novedad numero 2 donde se muestra informacion actualizada de lo ultimo de las novedades",
			image: "Foto10.jpg",
		},
		{
			id: 3,
			name: "Novedad 3",
			fecha: "5/11/2022",
			content:
				"Es una descripcion de la novedad numero 3 donde se muestra informacion actualizada de lo ultimo de las novedades",
			image: "Foto11.jpg",
		},
		{
			id: 4,
			name: "Novedad 4",
			fecha: "4/11/2022",
			content:
				"Es una descripcion de la novedad numero 4 donde se muestra informacion actualizada de lo ultimo de las novedades",
			image: "Manos10.jpg",
		},
	];

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/create-activity" element={<ActivitiesForm />} />
					<Route path="/create-category" element={<CategoriesForm />} />
					<Route path="/novedades" element={<News data={data} />} />
					<Route path="/create-news" element={<NewsForm />} />
					<Route path="/backoffice/create-slide" element={<SlidesForm />} />
					<Route path="/create-testimonials" element={<TestimonialForm />} />
					<Route path="/create-user" element={<UserForm />} />
					<Route path="/create-member" element={<MembersForm />} />
					<Route path="/create-project" element={<ProjectsForm />} />
					<Route path="/school-campaign" element={<SchoolCampaign />} />
					<Route path="/toys-campaign" element={<ToysCampaign />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
