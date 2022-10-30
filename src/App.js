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
import NewsDetails from "./Components/News/Details/NewsDetails";

function App() {
	const newsDetail = {
		name: "Prueba novedades (っ ◕‿◕ )っ",
		image: "https://images.unsplash.com/photo-1508779544523-dd1b27685be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&w=1000&q=80",
		content:
			"Shred all toilet paper and spread around the house scratch the postman wake up lick paw wake up owner meow meow and go into a room to decide you didn't want to be in there anyway cats go for world domination. Relentlessly pursues moth. When owners are asleep, cry for no apparent reason catch eat throw up catch eat throw up bad birds. Sleep nap iâ€™m so hungry iâ€™m so hungry but ew not for that plan your travel yet it's 3am, time to create some chaos thinking about you i'm joking it's food always food, whatever yet do not try to mix old food with new one to fool me!. Mew stare at wall turn and meow stare at wall some more meow again",
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
					<Route path="/create-activity" element={<ActivitiesForm />} />
					<Route path="/create-category" element={<CategoriesForm />} />
					<Route path="/create-news" element={<NewsForm />} />
					<Route path="/backoffice/create-slide" element={<SlidesForm />} />
					<Route path="/create-testimonials" element={<TestimonialForm />} />
					<Route path="/create-user" element={<UserForm />} />
					<Route path="/create-member" element={<MembersForm />} />
					<Route path="/create-project" element={<ProjectsForm />} />
					<Route path="/school-campaign" element={<SchoolCampaign />} />
					<Route path="/toys-campaign" element={<ToysCampaign />} />
					<Route
						path="/Novedades/:id"
						element={<NewsDetails details={newsDetail} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
