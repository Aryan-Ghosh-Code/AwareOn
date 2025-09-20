import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const Report = () => {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>{id}</Text>
		</View>
	)
}

export default Report;