import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0); // State to keep track of clicks
  useEffect(() => {
    const fetchExercises = async () => {
      const options = {
        method: "GET",
        url: "https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/level/expert",
        headers: {
          "x-rapidapi-key":
            "3593b9ae80mshfcded227008d056p1a0412jsn04dc24de29f1",
          "x-rapidapi-host": "exercise-db-fitness-workout-gym.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        // Limit the response data to the first 7 items
        setExercises(response.data.slice(0, 7));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const popularWorkouts = [
    {
      id: 1,
      title: "Lower Body Training",
      calories: "500 Kcal",
      time: "50 Min",
      image:
        "https://media.istockphoto.com/id/1317391043/photo/fit-sports-man-warming-up-with-spider-lunge-exercise-outdoors-on-building-rooftop-floor.jpg?s=1024x1024&w=is&k=20&c=besxUo_oiPd9aI5skpe_j-_3GhRJviYzHo3zISobdkY=",
    },
    {
      id: 2,
      title: "Hand Strength Training",
      calories: "600 Kcal",
      time: "40 Min",
      image:
        "https://media.istockphoto.com/id/1448736448/photo/hand-of-asian-chinese-man-gripping-hand-exercise-gripper.jpg?s=1024x1024&w=is&k=20&c=7vwQIVQe5RgWYMe5hYXTk3ZnmOKVqEVlFRutdt-WPrY=",
    },
    {
      id: 3,
      title: "Full Body Training",
      calories: "800 Kcal",
      time: "60 Min",
      image:
        "https://img.freepik.com/free-photo/sporty-woman-practicing-squat-exercises-studio-african-woman-sportswear-working-out-pink-background_273443-757.jpg?t=st=1733391252~exp=1733394852~hmac=90ea69709e81cc200ceaa559c34b95eae2022a83b52d876afbe0d8f7be6e12b8&w=1800",
    },
  ];

  const todayPlan = [
    {
      id: 1,
      title: "Push Up",
      description: "100 Push up a day",
      progress: "45%",
      difficulty: "Intermediate",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKxa0ec7Af9YOZjyq78wlT8xwVssa_WQX3Rg&s",
    },
    {
      id: 2,
      title: "Sit Up",
      description: "20 Sit up a day",
      progress: "75%",
      difficulty: "Beginner",
      image:
        "https://media.istockphoto.com/id/1269883929/photo/sporty-man-doing-sit-ups-exercise-during-home-workout.jpg?s=1024x1024&w=is&k=20&c=yzA6Is1MJ4pEayxebCEjfpiAnuVptRBs1yAHhNdaEtM=",
    },
    {
      id: 3,
      title: "Knee Push Up",
      description: "20 reps",
      progress: "60%",
      difficulty: "Beginner",
      image:
        "https://media.istockphoto.com/id/1026694846/photo/woman-doing-knee-push-ups-exercise-in-the-park.jpg?s=1024x1024&w=is&k=20&c=qAKlB7iDiGpQSukWjob4tkYS7YRGURVXap_ceKxn3UU=",
    },
    {
      id: 4,
      title: "Push Up",
      description: "100 Push up a day",
      progress: "45%",
      difficulty: "Intermediate",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Sit Up",
      description: "20 Sit up a day",
      progress: "75%",
      difficulty: "Beginner",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Knee Push Up",
      description: "20 reps",
      progress: "60%",
      difficulty: "Beginner",
      image: "https://via.placeholder.com/150",
    },
  ];

  // morning or afternoon or night greeting
  const date = new Date();
  const hours = date.getHours();
  let greeting = "";
  if (hours < 12) {
    greeting = "Good Morning";
  } else if (hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // Function to handle item click and increment the count
  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      {/* Header Section */}
      <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
          {greeting} 🔥
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#000" }}>
          {user.displayName}
        </Text>
      </View>

      {/* Search Input */}
      <View className="flex-row items-center bg-[#EFEFEF] rounded-2xl px-4 py-2">
        {/* SVG Icon */}
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=7695&format=png&color=000000",
          }}
          style={{ width: 24, height: 24 }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            fontSize: 18,
            marginLeft: 10,
          }}
          placeholder="Search"
        />
      </View>

      {/* Popular Workouts Section */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
          paddingHorizontal: 16,
          marginBottom: 8,
        }}
      >
        Popular Workouts
      </Text>
      <FlatList
        horizontal
        data={popularWorkouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginHorizontal: 8,
              backgroundColor: "white",
              borderRadius: 16,
              overflow: "hidden",
              width: 250,
            }}
            onPress={handleItemClick} // Increment click count on item click
          >
            <Image
              className="w-full h-[55%] object-cover"
              source={{ uri: item.image }}
            />
            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ color: "#888" }}>{item.calories}</Text>
                <Text style={{ color: "#888" }}>{item.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Today Plan Section */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#333",
          paddingHorizontal: 16,
          marginTop: 16,
        }}
      >
        Today Plan
      </Text>
      <FlatList
        data={todayPlan}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 16,
              marginBottom: 12,
              backgroundColor: "white",
              borderRadius: 16,
              flexDirection: "row",
              padding: 12,
              alignItems: "center",
            }}
            onPress={handleItemClick} // Increment click count on item click
          >
            <Image
              className="w-24 h-24 rounded-2xl"
              source={{ uri: item.image }}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#888", marginVertical: 8 }}>
                {item.description}
              </Text>
              <View
                style={{
                  height: 6,
                  backgroundColor: "#EEE",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    backgroundColor: "#BBF246",
                    width: item.progress,
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#888",
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: "#EEE",
                borderRadius: 16,
              }}
            >
              {item.difficulty}
            </Text>
          </View>
        )}
      />

      {/* Floating Button to Show Click Count */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => alert(`You have clicked ${clickCount} items!`)}
      >
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 40,
    right: 16,
    backgroundColor: "#192126",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;

// {
//   loading ? (
//     <Text>Loading...</Text>
//   ) : error ? (
//     <Text>Error loading data</Text>
//   ) : (
//     <FlatList
//       data={exercises}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View
//           style={{
//             marginHorizontal: 16,
//             marginBottom: 12,
//             backgroundColor: "white",
//             borderRadius: 16,
//             flexDirection: "row",
//             padding: 12,
//             alignItems: "center",
//           }}
//         >
//           <Image
//             source={{ uri: item.images[0] }}
//             style={{ width: 96, height: 96, borderRadius: 16 }}
//           />
//           <View style={{ marginLeft: 12, flex: 1 }}>
//             <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
//               {item.name}
//             </Text>
//             <Text style={{ fontSize: 14, color: "#888", marginVertical: 8 }}>
//               {item.instructions[0]}
//             </Text>
//             <Text style={{ fontSize: 14, color: "#888" }}>
//               Primary Muscles: {item.primaryMuscles.join(", ")}
//             </Text>
//             <Text style={{ fontSize: 14, color: "#888" }}>
//               Secondary Muscles: {item.secondaryMuscles.join(", ")}
//             </Text>
//           </View>
//         </View>
//       )}
//     />
//   );
// }
