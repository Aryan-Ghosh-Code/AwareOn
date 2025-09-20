import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { ProjectSearchBarProps } from "@/interfaces/interfaces";

const ProjectSearchBar = ({
	onSearch,
	resetFilters,
	sdgOptions,
	ownerOptions,
	onFilterSDG,
	onFilterOwner,
}: ProjectSearchBarProps) => {
	const [search, setSearch] = useState<string>("");

	const handleSearch = () => {
		onSearch(search);
	};

	return (
		<View className="w-full mt-6">
			<View className="w-full rounded-xl shadow-lg p-4 bg-[#2E2E3A]">
				<View className="flex-row items-center gap-3 bg-[#373F51] rounded-full border-2 border-[#373F51] focus:border-[#6EEB83] px-3 py-2">
					<Icon name="search" size={18} color="#d1d5db" />
					<TextInput
						className="flex-1 text-gray-200 px-2"
						placeholder="Search by Project Name"
						placeholderTextColor="#9ca3af"
						value={search}
						onChangeText={setSearch}
						onSubmitEditing={handleSearch}
					/>
					<TouchableOpacity
						className="bg-blue-600 rounded-full p-2"
						onPress={handleSearch}
					>
						<Icon name="search" size={16} color="#fff" />
					</TouchableOpacity>
				</View>

				<View className="flex-row flex-wrap gap-3 justify-center mt-4">
					<View className="flex-row items-center bg-[#373F51] rounded-full border-2 border-[#373F51] px-3">
						<Icon name="globe" size={18} color="#60a5fa" />
						<Picker
							style={{ color: "#e5e7eb", width: 100 }}
							dropdownIconColor="#6EEB83"
							selectedValue=""
							onValueChange={(value) => value && onFilterSDG(value)}
						>
							<Picker.Item label="SDG" value="" />
							{sdgOptions.map((sdg) => (
								<Picker.Item key={sdg} label={sdg} value={sdg} />
							))}
						</Picker>
					</View>

					<View className="flex-row items-center bg-[#373F51] rounded-full border-2 border-[#373F51] px-3">
						<Icon2 name="user-tie" size={18} color="#34d399" />
						<Picker
							style={{ color: "#e5e7eb", width: 100 }}
							dropdownIconColor="#6EEB83"
							selectedValue=""
							onValueChange={(value) => value && onFilterOwner(value)}
						>
							<Picker.Item label="Owner" value="" />
							{ownerOptions.map((owner) => (
								<Picker.Item
									key={owner._id}
									label={owner.name}
									value={owner.name}
								/>
							))}
						</Picker>
					</View>

					<TouchableOpacity
						className="flex-row items-center bg-[#373F51] rounded-full border-2 border-[#373F51] p-3"
						onPress={resetFilters}
					>
						<MaterialIcon name="delete" size={18} color="#f87171" />
						<Text className="ml-2 text-gray-200">Reset Filters</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ProjectSearchBar;