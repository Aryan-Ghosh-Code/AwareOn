import Header from '@/components/Header';
import ProjectCard from '@/components/repository/ProjectCard';
import ProjectSearchBar from '@/components/repository/ProjectSearchBar';
import useGetProjects from '@/hooks/useGetProjects';
import { ProjectProps } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Project = () => {
  const [projects, setProjects] = useState<ProjectProps[] | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<ProjectProps[] | null>(null);
  const { loading, getProjects } = useGetProjects();
  const insets = useSafeAreaInsets();

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
    setFilteredProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔍 Search
  const handleSearch = (query: string) => {
    if (!projects) return;
    const results = projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(results);
  };

  // 🌍 Filter by SDG
  const handleFilterSDG = (sdg: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.SDG.includes(sdg));
    setFilteredProjects(results);
  };

  // 👤 Filter by Owner
  const handleFilterOwner = (owner: string) => {
    if (!projects) return;
    const results = projects.filter((project) => project.owner.name === owner);
    setFilteredProjects(results);
  };

  // 🔄 Reset
  const resetFilters = () => {
    setFilteredProjects(projects);
  };

  if (loading || !filteredProjects) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0f172a]">
        <ActivityIndicator size="large" color="#2298b9" />
      </View>
    );
  }

  // Unique dropdowns
  const sdgOptions = Array.from(new Set(projects?.flatMap((p) => p.SDG) || []));
  const ownerOptions = Array.from(new Set(projects?.map((p) => p.owner) || []));

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
            PROJECT REPOSITORY
          </Text>

          <View
            className="flex flex-row items-center justify-center gap-2
            bg-[#1B2432] border-2 border-[#2298b9]
            rounded-xl px-2 py-3 mx-auto shadow-lg mb-4 w-full"
          >
            <Icon name="lightbulb-on-outline" size={24} color="#2298b9" />
            <Text className="text-[#2298b9] text-lg font-bold">
              Projects That Need Your Funding
            </Text>
            <Icon name="cash-multiple" size={24} color="#2298b9" />
          </View>

          <ProjectSearchBar
            onSearch={handleSearch}
            resetFilters={resetFilters}
            sdgOptions={sdgOptions}
            ownerOptions={ownerOptions}
            onFilterSDG={handleFilterSDG}
            onFilterOwner={handleFilterOwner}
          />
        </View>

        <View className="flex-1 px-4">
          <FlatList
            data={filteredProjects}
            keyExtractor={(item) => item._id.toString()}
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: Math.max(insets.bottom, 100)
            }}
            ItemSeparatorComponent={() => <View className="h-4" />}
            ListEmptyComponent={
              <Text className="text-gray-400 text-center">No projects found.</Text>
            }
            renderItem={({ item }) => <ProjectCard project={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Project