import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";

const MyInputs = ({ icon, value, onChangeText, placeholder, errors,  }) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <View>
      <View className={`w-full bg-white  h-12 flex-row items-center pl-2 pr-4 rounded-md relative ${errors ? "mb-0": "mb-4"}`}>
        {icon === "user" ? (
          <FontAwesome name="user" size={24} color="#999999" />
        ) : icon === "email" ? (
          <MaterialIcons name="mail" size={24} color="#999999" />
        ) : (
          icon === "password" && (
            <FontAwesome name="lock" size={24} color="#999999" />
          )
        )}

        {icon === "password" ? (
          <TextInput
            placeholder={placeholder}
            onChangeText={(value) => onChangeText(value)}
            value={value}
            enablesReturnKeyAutomatically
            secureTextEntry={passwordVisibility}
            className="w-full h-full pl-3 text-lg font-medium"
          />
        ) : (
          <TextInput
            placeholder={placeholder}
            onChangeText={(value) => onChangeText(value)}
            value={value}
            enablesReturnKeyAutomatically
            autoComplete="off"
            className="w-full h-full pl-3 text-lg font-medium"
          />
        )}

        {icon === "password" && (
          <View className="absolute right-3">
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#666666"
              />
            </Pressable>
          </View>
        )}
      </View>
      {errors ? <Text className="text-red-700 mb-2 pl-2">{errors}</Text> : null}
    </View>
  );
};

export default MyInputs;
