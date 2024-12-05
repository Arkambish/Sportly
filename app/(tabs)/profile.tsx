import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Assuming this is your firebase configuration file
import { useGlobalContext } from "../../context/GlobalProvider"; // Import your global context to update the state
import { router } from "expo-router";

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null); // Clear user data
      setIsLogged(false); // Set isLogged state to false
      Alert.alert("Success", "You have been signed out");
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign out");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Dark background for profile page
        padding: 20, // Add padding for better spacing
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
        Profile
      </Text>

      {/* Sign-out Button */}
      <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
        <Button title="Sign Out" onPress={handleSignOut} color="#BBF246" />
      </View>
    </View>
  );
};

export default Profile;
