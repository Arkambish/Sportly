import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Ensure this is correct
import dumbles from "../../assets/images/football.png";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Set the user's display name
      await updateProfile(user, {
        displayName: form.username, // Set the display name to the username provided
      });

      setUser(user);
      setIsLogged(true);
      Alert.alert("Success", "Account created successfully");
      router.replace("/home"); // Redirect to home page
    } catch (error) {
      Alert.alert("An error occurred, please try again", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={dumbles}
            resizeMode="contain"
            className="w-[110px] h-[150px]"
          />
          <Text className="text-white text-2xl font-semibold mt-10 font-psemibold">
            Sign up to Sportly
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder={"Enter your username"}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={"Enter your email"}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder={"Enter your password"}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7 "
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 font-pregular text-lg">
              Have an account already?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-secondary font-psemibold text-lg"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
