import { Tabs } from 'expo-router';
import { TabIconProps } from '@/interfaces/interfaces';
import { Image, View } from 'react-native';
import { icons } from '@/constants/icons';

const TabIcon = ({ focused, icon }: TabIconProps) => {
	if (focused) {
		return (
			<View className='w-full h-full justify-center items-center mt-4'>
				<View className='size-[90px] bg-[#0f0D23] rounded-lg justify-center items-center'>
					<Image source={icon} tintColor="#ffffff" className='size-6' />
				</View>
			</View>
		)
	} else {
		return (
			<View className='w-full h-full justify-center items-center mt-4'>
				<Image source={icon} tintColor="#A8B5DB" className='size-5' />
			</View>
		)
	}
}

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				},
				tabBarStyle: {
					backgroundColor: "#242038",
					borderRadius: 0,
					marginHorizontal: 0,
					marginBottom: 40,
					height: 52,
					position: 'absolute',
					overflow: 'hidden',
					borderWidth: 0.5,
					borderColor: '#0f0D23'
				}
			}}
		>
			<Tabs.Screen
				name="Home"
				options={{
					title: 'Home',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.home}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="repository/Project"
				options={{
					title: 'Project',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.project_repository}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="repository/Problem"
				options={{
					title: 'Problem',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.problem_repository}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="onboarding/Onboarding"
				options={{
					title: 'Onboarding',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.onboarding}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="profile/Profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.profile}
						/>
					),
					headerShown: false,
				}}
			/>

			{/* Hidden Tabs */}
			<Tabs.Screen
				name="repository/project/Upload"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="repository/problem/Upload"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="repository/project/[id]"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="repository/problem/[id]"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="dashboard/Dashboard"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="progress-tracker/ProgressTracker"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="game/Game"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="community/Community"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="report/[id]"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="report/submit/project/[id]"
				options={{
					href: null,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="report/submit/problem/[id]"
				options={{
					href: null,
					headerShown: false,
				}}
			/>
		</Tabs>
	)
}

export default _layout;