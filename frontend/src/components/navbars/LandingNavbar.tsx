import { useState } from "react";
import { FaListAlt, FaPhoneAlt } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineLogin } from "react-icons/md";

const LandingNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const items = [
		{
			name: "About",
			icon: <FaListAlt />,
			link: "#about",
		},
		{
			name: "Services",
			icon: <VscWorkspaceTrusted />,
			link: "#services",
		},
		{
			name: "Contact",
			icon: <FaPhoneAlt />,
			link: "#contact",
		},
		{
			name: "Login",
			icon: <MdOutlineLogin />,
			link: "/login",
		},
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="py-2 px-8 absolute left-0 top-0 w-full text-white flex items-center justify-between glassmorphic z-20">
			<div className="flex items-center gap-3">
				<img src="/Logo.png" alt="logo" className="w-[45px]" />
				<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Aab-O-Hawa</span>
			</div>

			{/* Hamburger Icon for Mobile */}
			<button
				className="lg:hidden flex items-center text-gray-300 focus:outline-none"
				onClick={toggleMenu}
			>
				<svg
					className="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{isMenuOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					)}
				</svg>
			</button>

			{/* Desktop Navigation */}
			<div className="hidden lg:flex gap-6 z-20">
				{items.map((item, _idx) => (
					<div className="flex items-center gap-2" key={_idx}>
						<span>{item.icon}</span>
						<a
							key={_idx}
							href={item.link}
							className="relative text-lg font-medium text-gray-300 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-blue-300 before:transition-all before:duration-300 hover:before:w-full"
						>
							{item.name}
						</a>
					</div>
				))}
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="absolute top-full right-0 w-full p-3 lg:hidden bg-white/5 backdrop-blur-2xl shadow-md border border-white/20 z-20">
					<ul className="flex flex-col items-center space-y-4 py-4 z-20">
						{items.map((item, _idx) => (
							<li key={_idx} className="flex items-center gap-2">
								<span>{item.icon}</span>
								<a
									href={item.link}
									className="relative text-lg font-medium text-gray-300 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-blue-300 before:transition-all before:duration-300 hover:before:w-full"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default LandingNavbar;