import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';

const About = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	return (
		<View id="about" className="mt-8 w-full items-center justify-center p-4">
			<View className="w-full flex flex-col gap-1 items-center justify-center">
				<Text className="text-[39px] font-medium text-blue-200">About</Text>
				<Text className="text-gray-400 italic">What is Aab-o-Hawa? Know about Us!</Text>
			</View>

			<View className="flex flex-col gap-4 mt-10 items-center justify-center">
				<Image
					source={images.about}
					alt="about"
					className="w-[200px] h-[200px] z-20 rounded-lg"
				/>
				<View className="flex flex-col items-center justify-center lg:items-start gap-2 mt-5">
					<Text className='text-3xl text-blue-100'>
						Welcome to <Text className="!text-blue-400">Aab-o-Hawa</Text>
					</Text>
					<Text className="text-gray-300 text-sm text-center">
						Aab-o-Hawa is a technology-driven platform focused on environmental monitoring and protection. We leverage advanced Machine Learning and Deep Learning models to analyze images, videos, and satellite data for identifying deforestation, forest fires, water pollution, waste management issues, and other ecological concerns. Our goal is to provide accurate, real-time insights that support researchers, policymakers, and communities in making informed decisions. By combining innovation with sustainability, Aab-o-Hawa bridges the gap between data and action—empowering society to safeguard natural resources and build a cleaner, healthier future for generations to come.
					</Text>

					<View className="w-full items-center mt-2 relative">
						<TouchableOpacity
							className="py-2 px-6 bg-blue-500 rounded-lg shadow-md active:bg-blue-600"
							onPress={() => setOpen((prev) => !prev)}
						>
							<Text className="text-gray-200 font-medium">Get Started</Text>
						</TouchableOpacity>

						{open && (
							<View className="absolute bottom-full mt-2 bg-[#28384e] shadow-lg rounded z-30 min-w-[180px]">
								<Pressable
									className="px-4 py-2 hover:bg-gray-100"
									onPress={() => {
										setOpen(false);
										router.push("/(auth)/user/Signup");
									}}
								>
									<Text className="text-white">User Signup</Text>
								</Pressable>

								<Pressable
									className="px-4 py-2 hover:bg-gray-100"
									onPress={() => {
										setOpen(false);
										router.push("/(auth)/ngo/Signup");
									}}
								>
									<Text className="text-white">NGO Signup</Text>
								</Pressable>

								<Pressable
									className="px-4 py-2 hover:bg-gray-100"
									onPress={() => {
										setOpen(false);
										router.push("/(auth)/gov/Signup");
									}}
								>
									<Text className="text-white">Government Signup</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			</View>
		</View>
	)
}

export default About;