import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getdMembersBySearch } from "store/Slices/membersSlice";

import Title from "Components/Title/Title";
import Spinner from "Components/common/Loader/Spinner/Spiner";
import Card from "Components/Card/Card";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Staff = ({ details }) => {
	const dispatch = useDispatch();
	const staff = useSelector(state => state.members.list);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			await dispatch(getdMembersBySearch());
			setIsLoading(false);
		};
		getData();
	}, []);

	return (
		<div className="mt-3">
			{details && (
				<div className="mx-auto w-8/12 flex justify-between items-center">
					<h2 className="font-semibold text-slate 700 text-xl font-poppins">Nuestro Staff</h2>
					<Link to="/nosotros" className="flex justify-center items-center">
						Ver mas <MdOutlineKeyboardArrowRight />
					</Link>
				</div>
			)}
			{isLoading && (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner />
				</div>
			)}
			{!isLoading && (
				<div
					className={`${
						!details && !isLoading && "bg-slate-100 shadow-xl rounded"
					} w-full sm:w-full md:w-4/5 lg:w-9/12 mx-auto`}
				>
					{!details && !isLoading && <Title text="Staff" />}
					<ul className="p-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
						{staff.map(member => (
							<li key={"member" + member.id}>
								<Card
									title={member.name}
									image={member.image}
									description={member.description}
									color={"#FFAE42"}
									facebook={member.facebookUrl}
									linkedin={member.linkedinUrl}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Staff;
