import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const Footer = () => {
	return (
		<View className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-md py-4 z-10">
			<View className="px-6">
				{/* Icons */}
				<View className="flex flex-row justify-center mb-4">
					<TouchableOpacity
						onPress={() => Linking.openURL("mailto:tamojitdas.dev007@gmail.com")}
						accessibilityLabel="Email"
						className="mx-3"
					>
						<Icon name="envelope" size={24} color="#d1d5db" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => Linking.openURL("https://www.facebook.com/in/")}
						accessibilityLabel="Facebook"
						className="mx-3"
					>
						<Icon name="facebook-square" size={24} color="#d1d5db" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => Linking.openURL("https://www.instagram.com/in/")}
						accessibilityLabel="Instagram"
						className="mx-3"
					>
						<Entypo name="instagram" size={24} color="#d1d5db" />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => Linking.openURL("https://whatsapp.com/")}
						accessibilityLabel="WhatsApp"
						className="mx-3"
					>
						<Ionicons name="logo-whatsapp" size={24} color="#d1d5db" />
					</TouchableOpacity>
				</View>

				{/* Footer text */}
				<Text className="text-sm text-gray-400 text-center">
					© 2025, aabOhawa@gmail.com
				</Text>
			</View>
		</View>
	);
};

export default Footer;