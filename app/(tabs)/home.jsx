import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";
import useClickStore from "../../context/clickStore"; // Import the Zustand store

const Home = () => {
  const { user } = useGlobalContext();

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { clickCount, incrementClickCount } = useClickStore(); // Use Zustand state

  // Fetch Teams and Players Data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "https://api.sportmonks.com/v3/football/teams?api_token=f74xd8hLXoZ5sD6Mq92CLxUahYFbwjujj1qlBt1KPO6t2jh9UEGantJS32oy"
        );
        setTeams(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch teams");
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://api.sportmonks.com/v3/football/players?api_token=f74xd8hLXoZ5sD6Mq92CLxUahYFbwjujj1qlBt1KPO6t2jh9UEGantJS32oy"
        );
        setPlayers(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch players");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F7F6FA]">
        <Text className="text-lg text-gray-700">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F7F6FA]">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  const greeting = (() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F6FA] font-pbold">
      {/* Main FlatList to hold both sections */}
      <FlatList
        data={[{ type: "teams" }, { type: "players" }]} // Data for sections
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.type === "teams") {
            return (
              <View className="px-4 mt-6">
                <Text className="text-xl font-pbold text-gray-800">Teams</Text>
                <FlatList
                  data={teams}
                  keyExtractor={(team) => team.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={incrementClickCount}>
                      <View className="bg-white rounded-lg p-4 items-center mr-4 shadow-xl">
                        <Image
                          source={{ uri: item.image_path }}
                          className="w-24 h-24 rounded-lg"
                        />
                        <Text className="text-base font-pbold text-black mt-2">
                          {item.name}
                        </Text>
                        <Text className="text-sm font-pregular text-gray-500">
                          Founded: {item.founded}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          } else if (item.type === "players") {
            return (
              <View className="px-4 mt-6">
                <Text className="text-xl font-pbold text-gray-800">
                  Players
                </Text>
                <FlatList
                  data={players}
                  keyExtractor={(player) => player.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={incrementClickCount}>
                      <View className="bg-white rounded-lg p-4 flex-row items-center mb-4 shadow-md">
                        <Image
                          source={{ uri: item.image_path }}
                          className="w-16 h-16 rounded-full"
                        />
                        <View className="ml-4">
                          <Text className="text-lg font-psemibold text-black">
                            {item.name}
                          </Text>
                          <Text className="text-sm text-gray-500 font-pregular">
                            DOB:{" "}
                            {new Date(item.date_of_birth).toLocaleDateString()}
                          </Text>
                          <Text className="text-sm text-gray-400 mt-1 font-pregular">
                            Height: {item.height} cm | Weight: {item.weight} kg
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }
        }}
        ListHeaderComponent={() => (
          <View className="px-4 mt-6">
            <Text className="text-2xl font-pbold text-black">
              {greeting} 🔥
            </Text>
            <Text className="text-xl font-pbold text-black">
              {user.displayName}
            </Text>
          </View>
        )}
      />

      {/* Floating Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          className="bg-[#192126] rounded-full w-16 h-16 flex items-center justify-center shadow-md"
          onPress={() => alert(`You clicked ${clickCount} items!`)}
        >
          <Text className="text-white text-xl font-bold">{clickCount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
