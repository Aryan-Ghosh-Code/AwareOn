import Header from '@/components/Header';
import Activities from '@/components/home/Activities';
import NoticeBoard from '@/components/home/NoticeBoard';
import { images } from '@/constants/images';
import { useAuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
	const { authUser } = useAuthContext();

	const screenData = [
		{ id: 'header', type: 'header' },
		{ id: 'welcome', type: 'welcome' },
		{ id: 'notices', type: 'notices' },
		{ id: 'activities', type: 'activities' }
	];

	interface ItemProps {
		item: {
			id: string,
			type: string
		}
	}

	const renderItem = ({ item }: ItemProps) => {
		switch (item.type) {
			case 'header':
				return <Header />;

			case 'welcome':
				return (
					<View className="flex flex-col items-center justify-center">
						<Image
							source={images.Logo}
							alt="Logo"
							className="size-80"
						/>

						<View className="flex flex-col items-center gap-1 px-3">
							<Text className="text-[#87BFFF] text-4xl font-semibold text-center">
								Welcome
							</Text>
							<Text className="text-[#6EEB83] text-5xl font-bold text-center h-36">
								{authUser?.name}
							</Text>
						</View>
					</View>
				);

			case 'notices':
				return (
					<View className='w-full'>
						<NoticeBoard />
					</View>
				);

			case 'activities':
				return (
					<View className='w-full'>
						<Activities />
					</View>
				);

			default:
				return null;
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-[#010b13]">
			<LinearGradient
				colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="flex-1"
			>
				<FlatList
					data={screenData}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: "center",
						paddingBottom: 20,
					}}
					style={{ width: "100%" }}
				/>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default Home;