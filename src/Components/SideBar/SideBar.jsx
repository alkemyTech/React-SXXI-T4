import React from "react";

export default function SideBar({ open }) {
	const Menus = [
		{ title: "Users", src: "Chart_fill" },
		{ title: "Activities", src: "Chat" },
		{ title: "Categories", src: "User", gap: true },
		{ title: "Organization ", src: "Calendar" },
		{ title: "News", src: "Search" },
		{ title: "Members", src: "Chart" },
		{ title: "Comments ", src: "Folder", gap: true },
		{ title: "Contacts", src: "Setting" },
	];

	return (
		<div className="bg-sky-800 h-auto">
			<div
				className={` ${
					open ? "w-72" : "w-20 "
				} bg-sky-800 h-screen p-5  pt-8 duration-300`}
			>
				<div className="flex gap-x-4 justify-center items-center mt-14">
					<img src="/images/logo-somosmas.png" alt="logo-somosmas" />
				</div>
				<ul className="pt-6">
					{Menus.map((Menu, index) => (
						<li
							key={index}
							className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2
                                 ${index === 0 && "bg-light-white"} `}
						>
							<img src={`/images/assets/${Menu.src}.png`} />
							<span className={`${!open && "hidden"} origin-left duration-200`}>
								{Menu.title}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
