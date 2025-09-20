import { useState } from "react";
import { Link } from "react-router-dom"

const About = () => {
	const [open, setOpen] = useState(false);
	return (
		<div id="about" className="mt-8 w-full items-center justify-center p-4">
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] text-secondary">About</h1>
				<p className="text-subhead">What is Aab-o-Hawa? Know about Us!</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-10 items-center justify-center">
				<img src="/about.jpg" alt="about" className="w-[30%] lg:w-[30%] z-20" />

				<div className="flex flex-col items-center justify-center lg:items-start gap-2 mt-5 lg:mt-0">
					<h1 className="text-tertiary text-4xl lg:text-5xl">Welcome to <span className="!text-blue-400">Aab-o-Hawa</span></h1>
					<p className="para lg:!text-left">
						Aab-o-Hawa is a technology-driven platform focused on environmental monitoring and protection. We leverage advanced Machine Learning and Deep Learning models to analyze images, videos, and satellite data for identifying deforestation, forest fires, water pollution, waste management issues, and other ecological concerns. Our goal is to provide accurate, real-time insights that support researchers, policymakers, and communities in making informed decisions. By combining innovation with sustainability, Aab-o-Hawa bridges the gap between data and action—empowering society to safeguard natural resources and build a cleaner, healthier future for generations to come.

					</p>

					<div className="w-full flex justify-center mt-2 relative">
						<button className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition cursor-pointer"
							onClick={() => setOpen((prev) => !prev)}
						>
							Get Started
						</button>
						{open && (
							<div className="absolute top-full mt-2 bg-[#28384e] shadow-lg rounded z-30 min-w-[180px] flex flex-col">
								<Link
									to="/user/signup"
									className="px-4 py-2 hover:bg-gray-100 text-left text-[#ffffff] hover:text-black"
									onClick={() => setOpen(false)}
								>
									User Signup
								</Link>
								<Link
									to="/ngo/signup"
									className="px-4 py-2 hover:bg-gray-100 text-left text-[#ffffff] hover:text-black"
									onClick={() => setOpen(false)}
								>
									NGO Signup
								</Link>
								<Link
									to="/gov/signup"
									className="px-4 py-2 hover:bg-gray-100 text-left text-[#ffffff] hover:text-black"
									onClick={() => setOpen(false)}
								>
									Government Signup
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default About