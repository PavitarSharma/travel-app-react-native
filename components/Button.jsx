import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Button = ({ title, onSubmit, isSubmitting }) => {
  return (
    <TouchableOpacity
      className="bg-[#0e4a86] h-12 rounded-md items-center justify-center"
      onPress={isSubmitting ? null : onSubmit}
    >
      {isSubmitting ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-white font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
