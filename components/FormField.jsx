import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import eye from "../assets/icons/eye.png";
import eyeHide from "../assets/icons/eye-hide.png";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  textInputStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium my-2 ">
        {title}
      </Text>
      <View className="border-2 border-black-200 w-full h-16  px-4 bg-black-100   rounded-2xl  focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base "
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              source={!showPassword ? eye : eyeHide}
              style={{ width: 30, height: 30 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
