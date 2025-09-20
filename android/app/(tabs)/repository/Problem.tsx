import Header from '@/components/Header';
import ProblemCard from '@/components/repository/ProblemCard';
import ProblemSearchBar from '@/components/repository/ProblemSearchBar';
import useGetProblems from '@/hooks/useGetProblems';
import { ProblemProps } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Problem = () => {
  const [problems, setProblems] = useState<ProblemProps[] | null>(null);
  const [filteredProblems, setFilteredProblems] = useState<ProblemProps[] | null>(null);
  const { loading, getProblems } = useGetProblems();
  const insets = useSafeAreaInsets();

  const fetchProblems = async () => {
    const fetchedProblems = await getProblems();
    setProblems(fetchedProblems);
    setFilteredProblems(fetchedProblems);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSearch = (query: string) => {
    if (!problems) return;
    const results = problems.filter((problem) =>
      problem.problem.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProblems(results);
  };

  const handleFilterSDG = (sdg: string) => {
    if (!problems) return;
    const results = problems.filter((problem) => problem.SDG.includes(sdg));
    setFilteredProblems(results);
  };

  const handleFilterLocation = (location: string) => {
    if (!problems) return;
    const results = problems.filter(
      (problem) =>
        problem.location.address.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredProblems(results);
  };

  const resetFilters = () => {
    setFilteredProblems(problems);
  };

  if (loading || !filteredProblems) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0f172a]">
        <ActivityIndicator size="large" color="#2298b9" />
      </View>
    );
  }

  const sdgOptions = Array.from(new Set(problems?.flatMap((p) => p.SDG) || []));
  const locationOptions = Array.from(
    new Set(problems?.map((p) => p.location.address) || [])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#010b13]">
      <LinearGradient
        colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <Header />

        <View className="px-4 pt-6">
          <Text className="text-2xl font-bold text-gray-100 text-center mb-2">
            PROBLEM REPOSITORY
          </Text>

          <View
            className="flex flex-row items-center justify-center gap-2
            bg-[#1B2432] border-2 border-[#2298b9]
            rounded-xl px-2 py-3 mx-auto shadow-lg mb-4 w-full"
          >
            <Icon name="earth" size={24} color="#2298b9" />
            <Text className="text-[#2298b9] text-lg font-bold">
              Problems Reported Across Regions
            </Text>
            <Icon name="alert" size={24} color="#2298b9" />
          </View>

          <ProblemSearchBar
            onSearch={handleSearch}
            resetFilters={resetFilters}
            sdgOptions={sdgOptions}
            locationOptions={locationOptions}
            onFilterSDG={handleFilterSDG}
            onFilterLocation={handleFilterLocation}
          />
        </View>

        <View className="flex-1 px-4 z-10">
          <FlatList
            data={filteredProblems}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: Math.max(insets.bottom, 100)
            }}
            ItemSeparatorComponent={() => <View className="h-4" />}
            ListEmptyComponent={
              <Text className="text-gray-400 text-center">No problems found.</Text>
            }
            renderItem={({ item }) => <ProblemCard problem={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Problem;