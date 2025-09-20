import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const Contact = () => {
	return (
		<View id="contact" className="mt-8 w-full items-center justify-center p-4 mb-10">
			<View className="w-full flex flex-col gap-1 items-center justify-center">
				<Text className="text-[39px] font-medium text-blue-200 z-10">Contact</Text>
				<Text className="text-gray-400 italic">Get in touch with us and resolve all your queries!</Text>
			</View>

			<View className="mt-8 flex flex-col w-full items-center justify-center">
				<View className="flex flex-col justify-center items-center p-4 bg-white/5 backdrop-blur-lg shadow-md border border-white/30 rounded-lg">
					<Text className="text-xl font-semibold mb-[3px] text-gray-300">Send us an Email</Text>
					<View className="h-[3.3px] bg-blue-300 w-10 rounded-lg mb-4" />
					<View className="flex items-start flex-col gap-3 w-[260px]">
						<View className="flex flex-col gap-1 w-full">
							<Text className="text-base font-medium text-gray-300">Email</Text>
							<TextInput
								placeholder="Enter your email"
								className="input-primary"
							/>
						</View>

						<View className="flex flex-col gap-1 w-full">
							<Text className="text-base font-medium text-gray-300">Message</Text>
							<TextInput
								placeholder="Enter your message"
								multiline
								className="input-primary h-40 align-text-top"
							/>
						</View>
					</View>

						<TouchableOpacity className="btn-primary items-center w-full py-2 px-10 mt-4">
							<Text className='text-gray-200 font-medium'>Submit</Text>
						</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default Contact;