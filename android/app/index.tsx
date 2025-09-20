import { ScrollView, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientText from "@/components/GradientText";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/Footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { images } from "@/constants/images";

const { width, height } = Dimensions.get("window");

const bgImages = [
  images.bg1,
  images.bg2,
  images.bg3,
  images.bg4,
  images.bg5
];

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#010b13]">
      <LinearGradient
        colors={["#1e3a2f", "#0f2c3f", "#0a1625"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Carousel
            loop
            autoPlay
            autoPlayInterval={3500}
            width={width}
            height={(90 / 100) * height}
            data={bgImages}
            scrollAnimationDuration={1200}
            renderItem={({ item }) => (
              <ImageBackground
                source={item}
                className="w-full h-full"
                resizeMode="cover"
              >
                {/* Overlay */}
                <View className="absolute inset-0 bg-black/65" />
              </ImageBackground>
            )}
          />

          {/* Foreground content */}
          <View className="absolute h-[85vh] inset-0 z-10 flex items-center justify-center px-5">
            <Image
              source={require("../assets/images/Logo.png")}
              className="w-60 h-60"
              resizeMode="contain"
            />
            <GradientText text="Aab-O-Hawa" fontSize={48} width={400} />
            <Text className="text-gray-200 text-base text-center mt-3 mb-3">
              ✨Preserving Nature, Protecting Tomorrow✨
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/Login")}
              className="p-2"
            >
              <MaterialCommunityIcons name="login" size={28} color="#d1d5db" />
            </TouchableOpacity>
          </View>

          <About />
          <Contact />
          <View className="h-32" />
          <Footer />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}