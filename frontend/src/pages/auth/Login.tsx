import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [inputs, setInputs] = useState({
		role: "",
		email: "",
		password: "",
	});
	const { login, loading } = useLogin();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await login(inputs);
	}

	return (
		<div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full">
			<h1 className="text-[30px] md:text-[35px] lg:text-[40px] text-secondary">Login</h1>
			<div className="h-[3.3px] -mt-1 bg-blue-400 w-10 rounded-lg" />

			<div className="flex w-full items-center justify-center">
				<div className="flex overflow-hidden">
					<div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic p-4 rounded-lg lg:!rounded-none lg:!rounded-l-lg">
						<img src="/Logo.png" alt="logo" className="object-cover  h-[400px]" />
					</div>

					<form className="flex flex-col gap-7 items-start justify-center glassmorphic p-4 w-[320px] md:w-[380px] lg:w-[450px] rounded-lg lg:!rounded-none lg:!rounded-r-lg" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">Your Role</label>
							<div className="flex justify-around w-full text-gray-300">
								<label className="flex items-center">
									<input
										type="radio"
										name="login"
										className="mr-2"
										value="user"
										required
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									USER
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="login"
										className="mr-2"
										value="ngo"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									NGO
								</label>
								<label className="flex items-center">
									<input
										type="radio"
										name="login"
										className="mr-2"
										value="govt"
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
									/>
									GOVT
								</label>
							</div>
						</div>

						<div className="flex flex-col gap-1 w-full">
							<label className="text-lg font-medium text-gray-300">Email</label>
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
							<label className="text-lg font-medium text-gray-300">Password</label>
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

						<div className="flex items-start justify-center p-2 w-full">
							<button className="btn-submit w-full lg:w-[90%]" type="submit" disabled={loading}>
								{loading ? <Spinner size="small" /> : "Login"}
							</button>
						</div>

						<div className="flex -mt-7 w-full items-center justify-center">
							<Link to="/signup" className="text-gray-400 hover:text-blue-600">Don't have an Account? Signup</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login;