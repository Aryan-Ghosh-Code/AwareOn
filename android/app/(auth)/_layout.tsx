import { Stack } from 'expo-router';

const _layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'fade',
			}}
		/>
	)
}

export default _layout;