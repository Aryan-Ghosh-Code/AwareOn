import { useEffect, useRef, useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import Spinner from "../../components/Spinner";
import { FaPen } from "react-icons/fa";

const Profile = () => {
	const { authUser } = useAuthContext();
	const [profilePic, setProfilePic] = useState(authUser?.profilePic || "");
	const [uploading, setUploading] = useState(false);
	const fileInputRef = useRef(null);

	const getProfilePic = () => {
		if (!authUser?.profilePic) {
			const ProfilePic =
				authUser?.gender === "M"
					? `https://avatar.iran.liara.run/public/boy?username=${authUser?.name}`
					: `https://avatar.iran.liara.run/public/girl?username=${authUser?.name}`;

			setProfilePic(ProfilePic);
		}
	}

	const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploading(true);
		const file = e.target.files?.[0];
		if (file) {
			// Upload to a cloud storage
			console.log(file);
			const previewUrl = URL.createObjectURL(file);
			setProfilePic(previewUrl);
		}
		setUploading(false);
	}

	useEffect(() => {
		getProfilePic();
	}, []);

	if (profilePic == "") return (
		<div className="flex w-full min-h-screen items-center justify-center z-0">
			<Spinner size="large" />
		</div>
	)

	return (
		<>
			<AppNavbar />

			<div className="flex w-full min-h-screen items-center justify-center z-0">
				<div className="glassmorphic-2 flex flex-col gap-2 items-center justify-center p-6 rounded-lg shadow-xl backdrop-blur-lg backdrop-filter mb-10 z-0">
					<div className="flex items-center justify-center relative">
						<img
							src={profilePic}
							alt={authUser?.name}
							className="w-[220px] rounded-full object-cover border-2 border-gray-300"
						/>

						<label
							htmlFor="profile-pic-upload"
							className="absolute bottom-0 right-6 bg-gray-700 p-2.5 rounded-full cursor-pointer hover:bg-gray-800 transition"
						>
							{uploading ? <Spinner size="medium" /> : (
								<div>
									<FaPen className="size-5.5 text-white" />
									<input
										type="file"
										id="profile-pic-upload"
										className="hidden"
										accept="image/*"
										ref={fileInputRef}
										onChange={handleProfilePicChange}
									/>
								</div>
							)}
						</label>
					</div>

					{/* <span className="font-bold text-xl text-gray-100">{authUser?.username}</span> */}

					<div className="flex flex-col items-start justify-center">
						<p className="text-gray-200">
							<b className="text-blue-400">Name: </b>
							{authUser?.name}
						</p>
						<p className="text-gray-200">
							<b className="text-blue-400">Email: </b>
							{authUser?.email}
						</p>
						<p className="text-gray-200">
							<b className="text-blue-400">Mobile no.: </b>
							{authUser?.mobileNo}
						</p>
						<p className="text-gray-200">
							<b className="text-blue-400">Gender: </b>
							{authUser?.gender === "M" ? "Male" : "Female"}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile