import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '@/constants/images';
import Icon from "react-native-vector-icons/FontAwesome";
import useUserSignup from '@/hooks/useUserSignup';

const Signup = () => {
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		city: "",
		state: "",
		pincode: "",
		mobileNo: "",
		password: "",
		gender: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, signup } = useUserSignup();

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleInputChange = (key: keyof typeof inputs, value: string) => {
		setInputs(prev => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		await signup(inputs);
	}

	return (
		<SafeAreaView className="flex-1 bg-[#010b13]">
			<LinearGradient
				colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="flex-1"
			>
				<ScrollView
					className="flex-1 p-5"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						minHeight: "100%",
						alignItems: "center",
						justifyContent: "center",
						paddingBottom: 30
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View className='flex flex-col glassmorphic p-5 gap-6 rounded-lg w-full items-center'>
						<View className="flex flex-row gap-3 items-center justify-center">
							<Image source={images.Logo} className="size-16 mx-auto" />
							<View className="flex flex-row gap-0.5 items-center">
								<Text className="text-light-200 text-2xl font-medium">Aab-o-Hawa</Text>
							</View>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="user" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Name</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your username"
								placeholderTextColor="#6B7280"
								value={inputs.name}
								onChangeText={text => handleInputChange('name', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="envelope" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Email</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your email"
								placeholderTextColor="#6B7280"
								keyboardType="email-address"
								value={inputs.email}
								onChangeText={text => handleInputChange('email', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="building" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">City</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your city"
								placeholderTextColor="#6B7280"
								value={inputs.city}
								onChangeText={text => handleInputChange('city', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="map" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">State</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your state"
								placeholderTextColor="#6B7280"
								value={inputs.state}
								onChangeText={text => handleInputChange('state', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="map-pin" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Pincode</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your pincode"
								placeholderTextColor="#6B7280"
								keyboardType="numeric"
								value={inputs.pincode}
								onChangeText={text => handleInputChange('pincode', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="phone" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Mobile Number</Text>
							</View>
							<TextInput
								className="input-primary px-6 py-4"
								placeholder="Enter your mobile number"
								placeholderTextColor="#6B7280"
								keyboardType="phone-pad"
								value={inputs.mobileNo}
								onChangeText={text => handleInputChange('mobileNo', text)}
							/>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="lock" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Password</Text>
							</View>
							<View className="flex flex-row items-center">
								<TextInput
									className="input-primary flex-1 px-6 py-4"
									placeholder="Enter your password"
									placeholderTextColor="#6B7280"
									secureTextEntry={!showPassword}
									value={inputs.password}
									onChangeText={text => handleInputChange('password', text)}
								/>
								<TouchableOpacity onPress={togglePasswordVisibility} className="absolute right-4">
									<Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#D1D5DB" />
								</TouchableOpacity>
							</View>
						</View>

						<View className="gap-2 w-full">
							<View className="flex flex-row items-center gap-2">
								<Icon name="venus-mars" size={20} color="#D1D5DB" />
								<Text className="text-light-100 text-lg">Gender</Text>
							</View>
							<View className="flex flex-row px-2 py-2 justify-between">
								{["Male", "Female", "Other"].map((g) => (
									<TouchableOpacity
										key={g}
										className="flex flex-row items-center gap-2"
										onPress={() => handleInputChange("gender", g[0])}
									>
										<View
											className={`w-5 h-5 rounded-full border-2 border-gray-400 items-center justify-center`}
										>
											{inputs.gender === g[0] && <View className="w-3 h-3 rounded-full bg-gray-300" />}
										</View>
										<Text className="text-light-100">{g}</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View className='w-full flex items-center gap-3 flex-col'>
							<TouchableOpacity
								className="btn-primary items-center w-full"
								style={{
									paddingVertical: 10,
									marginTop: 10
								}}
								onPress={handleSubmit}
								disabled={loading}
							>
								{loading ? (
									<ActivityIndicator
										size="small"
										color="#D1D5DB"
									/>
								) : (
									<Text className="text-lg font-semibold text-gray-300">Signup</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}

export default Signup;