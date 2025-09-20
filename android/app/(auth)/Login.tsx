import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '@/constants/images';
import Icon from "react-native-vector-icons/FontAwesome";
import useLogin from '@/hooks/useLogin';

const Login = () => {
	const [inputs, setInputs] = useState({
		role: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const { loading, login } = useLogin();

	const togglePasswordVisibility = () => {
		setShowPassword((prevState) => !prevState);
	};

	const handleInputChange = (key: keyof typeof inputs, value: string) => {
		setInputs(prev => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		await login(inputs);
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
								<Text className="text-light-100 text-lg">Role</Text>
							</View>
							<View className="flex flex-row px-2 py-2 justify-between">
								{["user", "ngo", "govt"].map((r) => (
									<TouchableOpacity
										key={r}
										className="flex flex-row items-center gap-2"
										onPress={() => handleInputChange("role", r)}
									>
										<View
											className={`w-5 h-5 rounded-full border-2 border-gray-400 items-center justify-center`}
										>
											{inputs.role === r && <View className="w-3 h-3 rounded-full bg-gray-300" />}
										</View>
										<Text className="text-light-100">{r.toUpperCase()}</Text>
									</TouchableOpacity>
								))}
							</View>
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
									<Text className="text-lg font-semibold text-gray-300">Login</Text>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	)
}

export default Login;