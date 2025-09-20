import {FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className="glassmorphic !rounded-none py-4 z-10">
			<div className="max-w-screen-lg mx-auto px-6 text-center">
				<div className="flex justify-center space-x-6 mb-4">
					<a
						href="mailto:yourmail@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-300 hover:text-blue-600 transition-colors"
						aria-label="Email"
					>
						<FaEnvelope size={24} />
					</a>
					<a
						href="https://www.facebook.com/in/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-300 hover:text-blue-600 transition-colors"
						aria-label="Facebook"
					>
						< FaSquareFacebook size={24} />
					</a>
					<a
						href="https://www.instagram.com/in/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-300 hover:text-blue-600 transition-colors"
						aria-label="Instagram"
					>
						<GrInstagram size={24} />
					</a>
					<a
						href="https://whatsapp.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-300 hover:text-blue-500 transition-colors"
						aria-label="WhatsApp"
					>
						< IoLogoWhatsapp size={24} />
					</a>
				</div>
				<p className="text-sm text-gray-400">
					&copy; 2025, aabOhawa@gmail.com
				</p>
			</div>
		</footer>
	);
};

export default Footer;