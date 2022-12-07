import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivitiesForm from "Components/Activities/ActivitiesForm";
import CategoriesForm from "Components/Categories/CategoriesForm";
import NewsForm from "Components/News/NewsForm";
import SlidesForm from "Components/Slides/SlidesForm";
import TestimonialForm from "Components/Testimonials/TestimonialsForm";
import UserForm from "Components/Users/UsersForm";
import UsersList from "Components/Users/UsersList";
import SchoolCampaign from "Campaigns/School/SchoolCampaign";
import ToysCampaign from "Campaigns/Toys/ToysCampaign";
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

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="staff" element={<Staff />} />
						<Route path="contacto" element={<Contact />} />
						<Route path="register-user" element={<RegisterForm />} />
						<Route path="create-contact" element={<ContactForm />} />
						<Route path="login-user" element={<LoginForm />} />
						<Route path="school-campaign" element={<SchoolCampaign />} />
						<Route path="toys-campaign" element={<ToysCampaign />} />
						<Route path="novedades" element={<News />} />
						<Route path="novedades/:id" element={<NewsDetails />} />
						<Route path="actividades/:id" element={<ActivityDetails />} />
						<Route path="actividades" element={<ActivitiesList />} />
						<Route path="about" element={<About />} />
					</Route>
					<Route path="/backoffice" element={<LayoutForm />}>
						<Route index element={<Backoffice />} />
						<Route path="activities" element={<ActivitiesList />} />
						<Route path="activity" element={<ActivitiesForm />} />
						<Route path="activity/:id" element={<ActivitiesForm />} />
						<Route path="create-project" element={<ProjectsForm />} />
						<Route path="activity/create" element={<ActivitiesForm />} />
						<Route path="testimonial" element={<TestimonialForm />} />
						<Route path="testimonial/:id" element={<TestimonialForm />} />
						<Route path="categories" element={<Categories />} />
						<Route path="update-category/:id" element={<CategoriesForm />} />
						<Route path="create-category" element={<CategoriesForm />} />
						<Route path="organization/edit" element={<OrganizationForm />} />
						<Route path="news" element={<NewsList />} />
						<Route path="create-news" element={<NewsForm />} />
						<Route path="update-news/:id" element={<NewsForm />} />
						<Route path="members" element={<Members />} />
						<Route path="members/create" element={<MembersForm />} />
						<Route path="members/edit/:id" element={<MembersForm />} />
						<Route path="slides" element={<SlidesList />} />
						<Route path="slide" element={<SlidesForm />} />
						<Route path="slide/:id" element={<SlidesForm />} />
						<Route path="users" element={<UsersList />} />
						<Route path="user" element={<UserForm />} />
						<Route path="user/:id" element={<UserForm />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
