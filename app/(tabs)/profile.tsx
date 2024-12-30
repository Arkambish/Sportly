import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null);
      setIsLogged(false);
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
        backgroundColor: "#121212",
        padding: 20,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
        Profile
      </Text>

      <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
        <Button title="Sign Out" onPress={handleSignOut} color="#BBF246" />
      </View>
    </View>
  );
};

export default Profile;
