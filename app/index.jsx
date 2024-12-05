import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import frontImage from "../assets/images/frontImage.png";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <View className="flex-1 bg-white">
      {/* Top Image */}
      <Image
        source={frontImage} // Replace with your actual image URI
        className="w-full h-[65%] object-cover"
        resizeMode="cover"
      />

      {/* Gradient Overlay */}
      <View className="absolute top-0 w-full h-[fit]  bg-white/20" />

      {/* Text Content */}
      <View className="px-5 items-center mt-10">
        <Text className="text-2xl font-bold text-center text-black mb-3">
          Wherever You Are <Text className="text-[#BBF246]">Health</Text>
        </Text>
        <Text className="text-2xl font-bold text-center text-black mb-3">
          Number One
        </Text>
        <Text className="text-sm text-center text-gray-500 mb-6">
          There is no instant way to a healthy life
        </Text>

        {/* Progress Bar */}
        <View className="w-1/2 h-1.5 bg-gray-200 rounded-full mb-6">
          <View className="w-[20%] h-full bg-[#BBF246] rounded-full" />
        </View>

        {/* Button */}
        <TouchableOpacity
          className="w-11/12 py-4 bg-[#161622] rounded-full items-center"
          onPress={() => router.push("/sign-in")}
        >
          <Text className="text-lg font-bold text-white">Get Started!</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
