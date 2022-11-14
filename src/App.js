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
import EditHome from "./Components/Home/EditHome";
import Layout from "./Components/Layout/Layout";
import NewsDetails from "./Components/News/Details/NewsDetails";
import RegisterForm from "./Components/Auth/RegisterForm";
import LoginForm from "./Components/Auth/LoginForm";
import Backoffice from "./Components/Backoffice/Backoffice";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/create-activity" element={<ActivitiesForm />} />
					<Route path="/create-category" element={<CategoriesForm />} />
					<Route path="/create-news" element={<NewsForm />} />
					<Route path="/backoffice/home" element={<EditHome />} />
					<Route path="/backoffice/create-slide" element={<SlidesForm />} />
					<Route path="/create-testimonials" element={<TestimonialForm />} />
					<Route path="/create-user" element={<UserForm />} />
					<Route path="/create-member" element={<MembersForm />} />
					<Route path="/create-project" element={<ProjectsForm />} />
					<Route path="/school-campaign" element={<SchoolCampaign />} />
					<Route path="/toys-campaign" element={<ToysCampaign />} />
				</Routes>
				<Layout>
					<Routes>
						<Route path="/create-activity" element={<ActivitiesForm />} />
						<Route path="/create-category" element={<CategoriesForm />} />
						<Route path="/create-news" element={<NewsForm />} />
						<Route path="/backoffice/user/:id" element={<UserForm />} />
						<Route path="/backoffice/user" element={<UserForm />} />
						<Route path="/register-user" element={<RegisterForm />} />
						<Route path="/login-user" element={<LoginForm />} />
						<Route path="/backoffice/create-slide" element={<SlidesForm />} />
						<Route path="/create-testimonials" element={<TestimonialForm />} />
						<Route path="/create-member" element={<MembersForm />} />
						<Route path="/create-project" element={<ProjectsForm />} />
						<Route path="/school-campaign" element={<SchoolCampaign />} />
						<Route path="/toys-campaign" element={<ToysCampaign />} />
						<Route path="/Novedades/:id" element={<NewsDetails />} />
						<Route path="/backoffice" element={<Backoffice />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	);
}

export default App;
