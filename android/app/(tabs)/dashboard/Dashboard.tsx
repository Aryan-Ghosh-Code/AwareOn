import CriticalAlert from '@/components/dashboard/CriticalAlert';
import DashboardHotspots from '@/components/dashboard/DashboardHotspots';
import DashboardStats from '@/components/dashboard/DashboardStats';
import LossDistribution from '@/components/dashboard/LossDistribution';
import StatesForestLoss from '@/components/dashboard/StatesForestLoss';
import Header from '@/components/Header';
import { dataset } from '@/constants/GFWDataset';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState<"heatmap" | "markers">("heatmap");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateData = dataset
    .reduce((acc, row) => {
      const existing = acc.find((item) => item.state === row.state);
      if (existing) {
        existing.loss_ha += row.loss_ha;
      } else {
        acc.push({ state: row.state, loss_ha: row.loss_ha, abbreviation: row.abbreviation });
      }
      return acc;
    }, [] as { state: string; loss_ha: number, abbreviation: string }[])
    .sort((a, b) => b.loss_ha - a.loss_ha)
    .slice(0, 10);

  const totalLoss = dataset.reduce((sum, row) => sum + row.loss_ha, 0);
  const avgLoss = totalLoss / dataset.length;
  const maxLoss = Math.max(...dataset.map((row) => row.loss_ha));

  return (
    <SafeAreaView className="flex-1 bg-[#010b13]">
      <LinearGradient
        colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <Header />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            alignItems: "center",
            paddingVertical: 16,
            paddingBottom: 60
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View className="flex flex-col items-center justify-center gap-2 mb-6">
            <Text className="text-2xl font-bold text-gray-100 text-center">
              Global Forest Watch - India Deforestation Dashboard
            </Text>
            <Text className="text-gray-300 text-base italic text-center">
              Real-time monitoring of forest loss hotspots across Indian states
            </Text>
          </View>

          {/* Stats Overview */}
          <DashboardStats totalLoss={totalLoss} avgLoss={avgLoss} maxLoss={maxLoss} />

          {/* Grid Section */}
          <View className="flex flex-col gap-6 py-6 px-3">
            {/* Map Section */}
            <DashboardHotspots
              maxLoss={maxLoss}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              setSelectedState={setSelectedState}
            />

            {/* Charts Section */}
            <View className="mb-6">
              {selectedState && (
                <View className="bg-[#242038] rounded-lg p-4 border-l-4 border-blue-500">
                  <Text className="text-gray-200 text-base font-bold mb-2">
                    📍 Selected State
                  </Text>
                  <Text className="text-blue-400 font-medium text-lg">{selectedState}</Text>
                  <Text className="text-sm text-gray-400 mt-1">
                    Total Loss:{" "}
                    {dataset
                      .filter((item) => item.state === selectedState)
                      .reduce((sum, item) => sum + item.loss_ha, 0)
                      .toFixed(1)}{" "}
                    ha
                  </Text>
                </View>
              )}

              <View className="flex flex-col gap-4 mt-4 w-full p-2">
                <StatesForestLoss stateData={stateData} />
                <LossDistribution stateData={stateData} />
                <CriticalAlert stateData={stateData} />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="bg-slate-900 p-4 rounded-lg mt-6 flex absolute bottom-16">
            <Text className="text-center text-gray-400 text-xs">
              Data Source: Global Forest Watch | Last Updated: 2024
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default Dashboard;