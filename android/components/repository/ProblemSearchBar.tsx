import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ProblemSearchProps } from "@/interfaces/interfaces";

const ProblemSearchBar = ({
	onSearch,
	resetFilters,
	sdgOptions,
	locationOptions,
	onFilterSDG,
	onFilterLocation,
}: ProblemSearchProps) => {
	const [search, setSearch] = useState<string>("");

	const handleSearch = () => {
		onSearch(search);
	};

	return (
		<View className="w-full mt-6">
			<View className="w-full rounded-xl shadow-lg p-4 bg-[#2E2E3A]">
				<View className="w-full flex-row items-center gap-3 bg-[#373F51] rounded-full border-2 border-[#373F51] focus:border-[#6EEB83] px-3 py-2">
					<FontAwesome name="search" size={18} color="#d1d5db" />
					<TextInput
						className="flex-1 text-gray-200 px-2"
						placeholder="Search by Problem Name"
						placeholderTextColor="#9ca3af"
						value={search}
						onChangeText={setSearch}
						onSubmitEditing={handleSearch}
					/>
					<TouchableOpacity
						className="bg-blue-600 rounded-full p-2"
						onPress={handleSearch}
					>
						<FontAwesome name="search" size={16} color="#fff" />
					</TouchableOpacity>
				</View>

				<View className="flex-row flex-wrap gap-3 justify-center mt-4">
					<View className="flex-row items-center gap-2 bg-[#373F51] rounded-full border-2 border-[#373F51] px-3">
						<FontAwesome name="globe" size={18} color="#60a5fa" />
						<Picker
							style={{ color: "#e5e7eb", width: 100 }}
							dropdownIconColor="#6EEB83"
							selectedValue=""
							onValueChange={(value) => value && onFilterSDG(value)}
						>
							<Picker.Item label="Filter by SDG" value="" />
							{sdgOptions.map((sdg) => (
								<Picker.Item key={sdg} label={sdg} value={sdg} />
							))}
						</Picker>
					</View>

					<View className="flex-row items-center gap-2 bg-[#373F51] rounded-full border-2 border-[#373F51] px-3">
						<FontAwesome name="map-marker" size={18} color="#f87171" />
						<Picker
							style={{ color: "#e5e7eb", width: 100 }}
							dropdownIconColor="#6EEB83"
							selectedValue=""
							onValueChange={(value) => value && onFilterLocation(value)}
						>
							<Picker.Item label="Filter by Location" value="" />
							{locationOptions.map((location) => (
								<Picker.Item key={location} label={location} value={location} />
							))}
						</Picker>
					</View>

					<TouchableOpacity
						className="flex-row items-center bg-[#373F51] rounded-full border-2 border-[#373F51] p-3"
						onPress={resetFilters}
					>
						<MaterialIcons name="delete" size={18} color="#f87171" />
						<Text className="text-gray-200">Reset Filters</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ProblemSearchBar;