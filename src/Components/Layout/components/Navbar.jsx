import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import logoSomosMas from "Assets/images/LOGO-SOMOSMAS.png";
import logo404 from "Assets/images/404.png";
import homeLogo from "Assets/images/homeLogo.png";
import aboutLogo from "Assets/images/aboutLogo.png";
import contactLogo from "Assets/images/contactLogo.png";
import donationLogo from "Assets/images/donationLogo.png";
import newsLogo from "Assets/images/newsLogo.png";
import hamburguer from "Assets/images/hamburger.jpg";
import activitieLogo from "Assets/images/logo-activities.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "store/Slices/authSlice";

const Navbar = ({ name, log }) => {
	const [open, setOpen] = useState(false);

	const { isLoggedIn, user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(userLogout());
	};

	const menuArr = [
		{
			name: "Inicio",
			link: "/",
			id: 0,
			img: <img className="max-w-[20px]" src={homeLogo} />,
		},
		{
			name: "Nosotros",
			link: "/nosotros",
			id: 1,
			img: <img className="max-w-[20px]" src={aboutLogo} />,
		},
		{
			name: "Novedades",
			link: "/novedades",
			id: 2,
			img: <img className="max-w-[20px]" src={newsLogo} />,
		},
		{
			name: "Actividades",
			link: "/actividades",
			id: 3,
			img: <img className="max-w-[20px]" src={activitieLogo} />,
		},
		{
			name: "Contacto",
			link: "/contacto",
			id: 4,
			img: <img className="max-w-[20px]" src={contactLogo} />,
		},
		{
			name: "Contribuye",
			link: "/donaciones",
			id: 5,
			img: <img className="max-w-[20px]" src={donationLogo} />,
		},
	];

	return (
		<header>
			<nav className="hidden lg:w-full bg-white sticky top-0 z-50 h-[80px] md:flex justify-between pl-5 pr-5 align-middle shadow-md shadow-gray-400">
				<img
					src={logoSomosMas}
					className="w-full md:w-1/4 object-contain"
					onError={e => {
						e.currentTarget.src = logo404;
					}}
				/>
				<ul className="md:flex justify-around text-sm hidden align-middle w-full md:text-sm lg:w-3/4 xl:w-1/2">
					{menuArr.map(x => (
						<li key={x.id} className="grid place-content-center hover:text-red-700">
							<Link to={x.link}>{x.name}</Link>
						</li>
					))}
					{isLoggedIn === true ? (
						<div className=" flex justify-center items-center gap-5">
							{user.role_id ===1&&(
									<Link to="/backoffice" className=" text-blue-800">
										BackOffice
									</Link>
								)}
							<button
								onClick={() => handleLogout()}
								className="flex justify-center items-center py-4 text-red-600 col-span-3"
							>
								{" "}
								<BiLogOut />
								Cerrar sesión
							</button>
						</div>
					) : (
						<div className="flex">
							<li className="grid place-content-center">
								<Link
									to="/login"
									className="bg-slate-200 hover:bg-slate-300 text-black px-4 py-2 hover:scale-95 transition mr-4 rounded"
								>
									Ingresar
								</Link>
							</li>
							<li className="grid place-content-center">
								<Link
									to="/registro"
									className="bg-red-600 hover:bg-red-700 px-4 py-2 hover:scale-95 transition  text-white rounded"
								>
									Registrarse
								</Link>
							</li>
						</div>
					)}
				</ul>
			</nav>

			<nav className="">
				<div className="md:hidden bg-white flex justify-between pl-4 pr-4 pt-4 shadow-sm py-2 shadow-gray-200">
					{isLoggedIn === true ? (
						<h3> Bienvenido, {user.name} </h3>
					) : (
						<div className="flex">
							<li className="grid place-content-center">
								<Link to="/login" className="bg-slate-100 hover:bg-slate-300 text-black px-1 py-1 mr-3 rounded">
									Ingresar
								</Link>
							</li>
							<li className="grid place-content-center">
								<Link to="/registro" className="bg-red-600 hover:bg-red-700 px-1 py-1 text-white rounded">
									Registrarse
								</Link>
							</li>
						</div>
					)}

					{open ? (
						<img onClick={e => setOpen(!open)} src={close} />
					) : (
						<img
							onClick={e => setOpen(!open)}
							className="hover:cursor-pointer hover:scale-95 md:hidden"
							src={hamburguer}
						/>
					)}
				</div>

				{open && (
					<div className="md:hidden grid grid-cols-3 shadow-md shadow-gray-400">
						{menuArr.map(x => (
							<li key={x.id} className="grid place-content-center hover:text-red-700 p-4">
								<Link className="grid place-content-center" to={x.link}>
									<div className=" grid place-content-center">{x.img}</div>
									<p className="items-place-center font-light text-sm">{x.name}</p>
								</Link>
							</li>
						))}
						{isLoggedIn && (
							<button
								onClick={() => handleLogout()}
								className="flex w-full justify-center items-center py-4 text-red-600 col-span-3"
							>
								{" "}
								<BiLogOut />
								Cerrar sesión
							</button>
						)}
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
