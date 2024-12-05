import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import dumbles from "../../assets/icons/image.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; // Assuming this is your firebase configuration file
import CustomAlert from "../../components/CustomAlert";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
  });
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      setAlert({
        visible: true,
        title: "Failed",
        message: "Fill all fields",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        form.email,
        form.password
      );
      const user = userCredential.user;
      setUser(user);
      setIsLogged(true);
      setAlert({
        visible: true,
        title: "Success",
        message: "User signed in successfully",
      });
      router.replace("/home"); // Redirect to home page
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        message: "Invalid Credentials, please try again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={dumbles}
            resizeMode="contain"
            className="w-[110px] h-[50px]"
          />
          <Text className="text-white text-2xl font-semibold mt-10 font-psemibold">
            Log in to Wefit
          </Text>
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
            otherStyles="mt-7 "
            placeholder={"Enter your password"}
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 p-4 rounded-2xl text-black"
            textStyles={"text-black font-psemibold"}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 font-pregular text-lg">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-secondary font-psemibold text-lg"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>

      {/* CustomAlert component */}
      <CustomAlert
        isVisible={alert.visible}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
      />
    </SafeAreaView>
  );
};

export default SignIn;
