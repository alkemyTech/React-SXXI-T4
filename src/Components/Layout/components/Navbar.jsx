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
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "store/Slices/authSlice";

const Navbar = ({ name, log }) => {
	const { isLoggedIn, user } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

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
						<li key={x.id} className="grid place-content-center hover:text-red-700 font-poppins font-medium text-base">
							<Link to={x.link}>{x.name}</Link>
						</li>
					))}
					{isLoggedIn === true ? (
						<div className=" flex justify-center items-center gap-5">
							<Link to="/backoffice" className=" text-blue-800">
								BackOffice
							</Link>
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
						<h3> Bienvenido, {user?.name} </h3>
					) : (
						<div className="flex">
							<li className="grid place-content-center">
								<Link to="/login-user" className="bg-slate-100 hover:bg-slate-300 text-black px-1 py-1 mr-3 rounded">
									Ingresar
								</Link>
							</li>
							<li className="grid place-content-center">
								<Link to="/register-user" className="bg-red-600 hover:bg-red-700 px-1 py-1 text-white rounded">
									Registrarse
								</Link>
							</li>
						</div>
					)}

					{open ? (
						<img
							onClick={e => setOpen(!open)}
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAlxJREFUSEuFloFtGzEMRR8n8AhNN3BH8ARBJ3Buoo5Qj5ARPIJHyAjOBCwoUTqK0rkBHB1wEj/5+T91gv8JAijqK321J0HLvvq/7hyfWpxp9c22DEfX5/fQAWWPGYL1REVAazoVoWwadg6xpuwFRK1CD5lyWNXdSgmojZJITyaxEjxVXhLYz+f3Tl06V8o+ym0nwzaFgiDRFaMWoIbWGjy2PrS3Rc1r6EOvNqnCCu4aWja6BfEiCz1DGUs5jTCOcqhM4CzwR4XfKM+s/CCUG+gduI3EjsJcK7ru+QJ+gDwQvRSwmSYLfnXQn+XM2IvSukEM0ZouhTPCHeUk8FC4QAMroQuIn9usot05zZ41hRGoSbRzUmbCGbgrcgJ9INTKpNB0reqUDdGbPQ++E+2SH8Ww6lY9WcCAE/Dw34crdtMXvYk9SyOoTjZLNA4NE0YAa+c3RG5x1MRcO2lWWVeCN2Wh3F0swifKu/PzBLkYnaOt1hF6j0ZTx80tF7VGXz3jb4GTijxF9aKVzoWzF/J+pXH3RwPZEB5o65k8QS+uyvkm6HaYEHY5+kgyMzafFAm7K85uUhOI+cuknyr7b0Wdum5GYFPEQCNHLpAifQP7VU0uiCgaZlUybBagfKD610CKbwaMjtfU+AkUyS9dcqSyoP83raOou3EwZUV/E/jqeRwM3fQV0FwUIh8b+SD9eiGM2p3Qj2s8fOPXe7l7l5dfAZ2PLwO+4Pg1/WmoTomEwRqnb52hMzXZrrYnfATlinJuqy+O3Ls8RdJ3RDfsvK++OuA6X2pBnfsg7rnswf8Bx1AHLrYq160AAAAASUVORK5CYII="
						/>
					) : (
						<img
							onClick={e => setOpen(!open)}
							className="hover:cursor-pointer hover:scale-95 md:hidden"
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAdRJREFUSEuNVomRAyEMkzu5TrKlpJNsOrvOuAMbkM23mckkAS+WbMlEwC8RICW3BAFAS+Enxa538hl5t7zqF04jEKScZZaM1sZnbbN9CDIHBczRZXGDMGZmtKEgkYhlsigqYWElSdHMchvAGuJyMusj7l2A66+VxpXUSo8Ml3q0YE1UYlb/W49Lruq6Enuk5bkk4dX6VrMvmPFyCPlGwl7OwA3gwyJx9Z8mbPps7LOie4XyvpNd2XoD8nbmaVB6lpnlAuIrso2Mmq9czwYme4NWz3Q5+NGgBEutYqPXCh+QBjPno6h0MXxlmuq17vSKOmCm6pO8aRDdQPr0hyYJrUEHizXr6OCJ40ZwI5HqbDx15ameJHUeLqH9qKqreyVrQPYDIL+3pMpEpmQTRf0ufTSWgrtq37fDtsOO0pbRah7boQ9qhXyN5c82e8frha6kpqYLCa9opsVAGHxNcTqCTBJOGcaljKB9g7ixEUI9stS4MZ4letsY6nf4Ax1PrqvLi2F3iGk0DYPtwfhpXtN+KaMjYrtlc+zh2hh0131leZyzzv98OrY1yijx4DXd5rxK4onQJ7a1Z7sYxpPt6KpPM0mwe3nsaGL6X1cBP8a9CJxOl38n/wEcUMUpNbvs8gAAAABJRU5ErkJggg=="
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
