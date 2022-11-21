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
import Contact from "./Components/Contact";
import OrganizationForm from "./Components/Organization/OrganizationForm";
import ContactForm from "./Components/Contact/ContactForm";
import NewsDetails from "./Components/News/Details/NewsDetails";
import Backoffice from "./Components/Backoffice/Backoffice";
import { Home } from "Components/Home";
import RegisterForm from "Components/Auth/RegisterForm";
import LoginForm from "Components/Auth/LoginForm";
import Layout from "Components/Layout/Layout";
import News from "Components/News/News";

function App() {

	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create-activity" element={<ActivitiesForm />} />
						<Route path="/create-category" element={<CategoriesForm />} />
						<Route path="/backoffice/news" element={<News />} />
						<Route path="/backoffice/update-news/:id" element={<NewsForm />} />
						<Route path="/backoffice/create-news" element={<NewsForm />} />
						<Route
							path="/backoffice/create-category"
							element={<CategoriesForm />}
						/>
						<Route path="/contacto" element={<Contact />} />
						<Route
							path="/backoffice/update-category/:id"
							element={<CategoriesForm />}
						/>
						<Route
							path="/backoffice/organization/edit"
							element={<OrganizationForm />}
						/>
						<Route path="/backoffice/members/edit" element={<MembersForm />} />
						<Route path="/backoffice/user/:id" element={<UserForm />} />
						<Route path="/backoffice/user" element={<UserForm />} />
						<Route path="/backoffice/user/:id" element={<UserForm />} />
						<Route path="/register-user" element={<RegisterForm />} />
						<Route path="/create-contact" element={<ContactForm />} />
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
