import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaPhoneAlt,FaCity,  FaTransgenderAlt, FaUser,FaGlobe ,FaMapPin} from "react-icons/fa";
import useSignup from "../../hooks/useSignupUser";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

const UserSignup = () => {
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		city:"",
		state: "",
		pincode:"",
		mobileNo: "",
		password: "",
		gender: ""
	});
	const { signup, loading } = useSignup();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await signup(inputs);
	}

	return (
		<div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full pb-6">
			<h1 className="text-[30px] md:text-[35px] lg:text-[40px] text-secondary">User Signup</h1>
			<div className="h-[3.3px] -mt-1 bg-blue-400 w-10 rounded-lg" />

			<div className="flex w-full items-center justify-center">
				<div className="flex overflow-hidden">
					<div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic p-4 rounded-lg lg:!rounded-none lg:!rounded-l-lg">
						<img src="/Logo.png" alt="signup" className="object-cover  h-[400px]" />
					</div>

					<form className="flex flex-col gap-4 items-start justify-center glassmorphic p-4 w-[320px] md:w-[380px] lg:w-[450px] rounded-lg lg:!rounded-none lg:!rounded-r-lg" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaUser />Full Name</label>
							<input
								type="text"
								placeholder="Enter your Name"
								required
								className="input-primary"
								value={inputs.name}
								onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><MdEmail />Email</label>
							<input
								type="email"
								placeholder="Enter your Email"
								required
								className="input-primary"
								value={inputs.email}
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaCity />City</label>
							<input
								type="text"
								placeholder="Enter your City"
								required
								className="input-primary"
								value={inputs.city}
								onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaGlobe />State</label>
							<input
								type="text"
								placeholder="Enter your State"
								required
								className="input-primary"
								value={inputs.state}
								onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaMapPin />PinCode Number</label>
							<input
								type="text"
								placeholder="Enter your PinCode Number"
								required
								className="input-primary"
								value={inputs.pincode}
								onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaPhoneAlt />Mobile Number</label>
							<input
								type="text"
								placeholder="Enter your Mobile Number"
								required
								maxLength={10}
								className="input-primary"
								value={inputs.mobileNo}
								onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
							/>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaLock />Password</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter your Password"
									required
									className="input-primary w-full pr-10"
									value={inputs.password}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
								/>
								<button
									type="button"
									className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
									onClick={togglePasswordVisibility}
								>
									{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
								</button>
							</div>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5"><FaTransgenderAlt />Gender</label>
							<div className="flex justify-around w-full text-gray-300">
								<label className="flex items-center">
									<input
										type="radio"
										name="gender"
										className="mr-2"
										value="M"
										required
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									/>
									MALE
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="gender"
										className="mr-2"
										value="F"
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									/>
									FEMALE
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="gender"
										className="mr-2"
										value="O"
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									/>
									OTHERS
								</label>
							</div>
						</div>

						<div className="flex items-start justify-center p-2 w-full">
							<button className="btn-submit w-full lg:w-[90%]" type="submit" disabled={loading}>
								{loading ? <Spinner size="small" /> : "Signup"}
							</button>
						</div>

						<div className="flex -mt-5 -mb-0.5 w-full items-center justify-center">
							<Link to="/login" className="text-gray-400 hover:text-blue-600">Already have an Account? Login</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default UserSignup;